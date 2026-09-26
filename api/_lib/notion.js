// Đọc bài viết từ Notion database (Notion API, không cần thư viện ngoài).
// Biến môi trường cần có trên Vercel:
//   NOTION_TOKEN        — Internal Integration Secret (bắt đầu bằng "ntn_" hoặc "secret_")
//   NOTION_DATABASE_ID  — ID của database Blog (dán cả link database cũng được)

const API = 'https://api.notion.com/v1';
const VERSION = '2022-06-28';

export const isConfigured = () => !!(process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID);

function dbId() {
  const raw = process.env.NOTION_DATABASE_ID || '';
  const m = raw.replace(/-/g, '').match(/[0-9a-f]{32}/i);
  return m ? m[0] : raw;
}

async function notion(path, { method = 'GET', body } = {}) {
  const res = await fetch(API + path, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      'Notion-Version': VERSION,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Notion ${res.status}: ${t.slice(0, 300)}`);
  }
  return res.json();
}

// ---------- tiện ích ----------
export function slugify(s = '') {
  return s
    .toLowerCase()
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);
}

const norm = (s) => slugify(s).replace(/-/g, '');
export const plain = (rt = []) => rt.map((t) => t.plain_text).join('');

// tìm thuộc tính theo tên (không phân biệt hoa thường / dấu), nếu không có thì theo kiểu
function prop(page, names, types) {
  const props = page.properties || {};
  const wanted = names.map(norm);
  for (const [k, v] of Object.entries(props)) {
    if (wanted.includes(norm(k)) && (!types || types.includes(v.type))) return v;
  }
  return null;
}

function fileUrl(f) {
  if (!f) return null;
  if (f.type === 'external') return f.external.url;
  if (f.type === 'file') return f.file.url;
  return null;
}

function isPublished(page) {
  const p = prop(page, ['Xuất bản', 'Xuat ban', 'Published', 'Đăng', 'Công khai'], ['checkbox', 'status', 'select']);
  if (!p) return true; // không có cột trạng thái → coi như đã đăng
  if (p.type === 'checkbox') return p.checkbox === true;
  const name = (p[p.type] && p[p.type].name) || '';
  return ['da dang', 'published', 'xuat ban', 'cong khai', 'done', 'hoan thanh'].includes(slugify(name).replace(/-/g, ' '));
}

export function toPost(page) {
  const titleProp = Object.values(page.properties || {}).find((v) => v.type === 'title');
  const title = plain(titleProp ? titleProp.title : []) || 'Bài viết';
  const slugP = prop(page, ['Slug', 'Đường dẫn', 'URL'], ['rich_text', 'formula']);
  let slug = slugP ? (slugP.type === 'formula' ? slugP.formula.string : plain(slugP.rich_text)) : '';
  slug = slugify(slug || title);
  const descP = prop(page, ['Mô tả', 'Mo ta', 'Description', 'Meta description', 'Tóm tắt'], ['rich_text']);
  const seoP = prop(page, ['Tiêu đề SEO', 'SEO title'], ['rich_text']);
  const dateP = prop(page, ['Ngày đăng', 'Ngay dang', 'Date', 'Ngày'], ['date']);
  const tagsP = prop(page, ['Chủ đề', 'Chu de', 'Tags', 'Tag', 'Danh mục'], ['multi_select', 'select']);
  const coverP = prop(page, ['Ảnh bìa', 'Anh bia', 'Cover'], ['files']);
  const authorP = prop(page, ['Tác giả', 'Tac gia', 'Author'], ['rich_text', 'people', 'select']);

  let tags = [];
  if (tagsP) tags = tagsP.type === 'multi_select' ? tagsP.multi_select.map((t) => t.name) : tagsP.select ? [tagsP.select.name] : [];

  let hasCover = false;
  let coverExternal = null;
  const pc = coverP && coverP.files && coverP.files[0];
  if (pc) { hasCover = true; if (pc.type === 'external') coverExternal = pc.external.url; }
  else if (page.cover) { hasCover = true; if (page.cover.type === 'external') coverExternal = page.cover.external.url; }

  let author = 'Phong Thủy Đỗ Gia';
  if (authorP) {
    if (authorP.type === 'rich_text' && plain(authorP.rich_text)) author = plain(authorP.rich_text);
    if (authorP.type === 'select' && authorP.select) author = authorP.select.name;
    if (authorP.type === 'people' && authorP.people[0] && authorP.people[0].name) author = authorP.people[0].name;
  }

  return {
    id: page.id,
    title,
    seoTitle: seoP ? plain(seoP.rich_text) : '',
    slug,
    description: descP ? plain(descP.rich_text) : '',
    date: (dateP && dateP.date && dateP.date.start) || page.created_time,
    updated: page.last_edited_time,
    tags,
    author,
    // ảnh Notion hết hạn sau 1 giờ → luôn đi qua /api/img để lấy link mới
    cover: hasCover ? coverExternal || `/api/img?page=${page.id.replace(/-/g, '')}` : null,
    published: isPublished(page),
  };
}

// ---------- cache trong bộ nhớ (mỗi instance serverless) ----------
const mem = new Map();
async function cached(key, ttlMs, fn) {
  const hit = mem.get(key);
  if (hit && Date.now() - hit.t < ttlMs) return hit.v;
  const v = await fn();
  mem.set(key, { t: Date.now(), v });
  return v;
}

export async function listPosts() {
  if (!isConfigured()) return [];
  return cached('posts', 60_000, async () => {
    const pages = [];
    let cursor;
    do {
      const r = await notion(`/databases/${dbId()}/query`, {
        method: 'POST',
        body: { page_size: 100, ...(cursor ? { start_cursor: cursor } : {}) },
      });
      pages.push(...r.results);
      cursor = r.has_more ? r.next_cursor : null;
    } while (cursor);
    return pages
      .filter((p) => !p.archived && !p.in_trash)
      .map(toPost)
      .filter((p) => p.published)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  });
}

export async function getPostBySlug(slug) {
  const posts = await listPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export async function getBlocks(blockId, depth = 0) {
  return cached('blocks:' + blockId, 60_000, async () => {
    const out = [];
    let cursor;
    do {
      const r = await notion(`/blocks/${blockId}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ''}`);
      out.push(...r.results);
      cursor = r.has_more ? r.next_cursor : null;
    } while (cursor);
    if (depth < 3) {
      await Promise.all(
        out.filter((b) => b.has_children && b.type !== 'child_page' && b.type !== 'child_database').map(async (b) => {
          b.children = await getBlocks(b.id, depth + 1);
        })
      );
    }
    return out;
  });
}

// link ảnh mới (cho /api/img)
export async function freshImageUrl({ block, page }) {
  if (block) {
    const b = await notion(`/blocks/${block}`);
    if (b.type === 'image') return fileUrl(b.image);
    return null;
  }
  if (page) {
    const p = await notion(`/pages/${page}`);
    const coverP = prop(p, ['Ảnh bìa', 'Anh bia', 'Cover'], ['files']);
    if (coverP && coverP.files && coverP.files[0]) return fileUrl(coverP.files[0]);
    return fileUrl(p.cover);
  }
  return null;
}
