// Chuyển block Notion → HTML chuẩn SEO, và dựng các trang Blog.
import { SITE, ICONS, esc, head, header, footer, crumbs, breadcrumbLd, referralBlock } from './layout.js';
import { slugify, plain } from './notion.js';

// ---------- rich text ----------
function rich(rt = []) {
  return rt
    .map((t) => {
      let s = esc(t.plain_text).replace(/\n/g, '<br>');
      const a = t.annotations || {};
      if (a.code) s = `<code>${s}</code>`;
      if (a.bold) s = `<strong>${s}</strong>`;
      if (a.italic) s = `<em>${s}</em>`;
      if (a.strikethrough) s = `<s>${s}</s>`;
      if (a.underline) s = `<u>${s}</u>`;
      if (a.color && a.color.endsWith('_background')) s = `<mark>${s}</mark>`;
      const href = t.href || (t.text && t.text.link && t.text.link.url);
      if (href) {
        const internal = href.startsWith('/') || href.includes('phongthuydogia.com');
        s = `<a href="${esc(href)}"${internal ? '' : ' target="_blank" rel="noopener"'}>${s}</a>`;
      }
      return s;
    })
    .join('');
}

function youtubeId(url = '') {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return m ? m[1] : null;
}

function imgSrc(b) {
  const i = b.image;
  if (i.type === 'external') return i.external.url;
  return `/api/img?block=${b.id.replace(/-/g, '')}`;
}

// ---------- blocks ----------
export function renderBlocks(blocks = [], ctx) {
  let html = '';
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    // gom list liên tiếp
    if (b.type === 'bulleted_list_item' || b.type === 'numbered_list_item' || b.type === 'to_do') {
      const type = b.type;
      const items = [];
      while (i < blocks.length && blocks[i].type === type) items.push(blocks[i++]);
      i--;
      const tag = type === 'numbered_list_item' ? 'ol' : 'ul';
      html += `<${tag}${type === 'to_do' ? ' class="todo"' : ''}>${items
        .map((it) => {
          const d = it[type];
          const box = type === 'to_do' ? (d.checked ? '☑ ' : '☐ ') : '';
          return `<li>${box}${rich(d.rich_text)}${it.children ? renderBlocks(it.children, ctx) : ''}</li>`;
        })
        .join('')}</${tag}>`;
      continue;
    }
    html += renderBlock(b, ctx);
  }
  return html;
}

function renderBlock(b, ctx) {
  const d = b[b.type] || {};
  const kidsFn = () => (b.children ? renderBlocks(b.children, ctx) : '');
  switch (b.type) {
    case 'paragraph': {
      const t = rich(d.rich_text);
      return t ? `<p>${t}</p>${kidsFn()}` : kidsFn();
    }
    // Tiêu đề bài = <h1>, nên Heading 1 của Notion → <h2>, Heading 2 → <h3>, Heading 3 → <h4>
    case 'heading_1':
    case 'heading_2':
    case 'heading_3': {
      const level = { heading_1: 2, heading_2: 3, heading_3: 4 }[b.type];
      const text = plain(d.rich_text);
      let id = slugify(text) || 'muc';
      while (ctx.ids.has(id)) id += '-2';
      ctx.ids.add(id);
      if (level <= 3) ctx.toc.push({ level, id, text });
      const h = `<h${level} id="${id}">${rich(d.rich_text)}</h${level}>`;
      return d.is_toggleable ? `<details><summary>${h}</summary>${kidsFn()}</details>` : h + kidsFn();
    }
    case 'quote':
      return `<blockquote>${rich(d.rich_text)}${kidsFn()}</blockquote>`;
    case 'callout': {
      const icon = d.icon && d.icon.type === 'emoji' ? d.icon.emoji : '💡';
      return `<div class="callout"><span class="ce" aria-hidden="true">${icon}</span><div>${rich(d.rich_text)}${kidsFn()}</div></div>`;
    }
    case 'divider':
      return '<hr>';
    case 'image': {
      const cap = plain(d.caption || []);
      const alt = cap || ctx.title;
      return `<figure><img src="${esc(imgSrc(b))}" alt="${esc(alt)}" loading="lazy" decoding="async">${cap ? `<figcaption>${rich(d.caption)}</figcaption>` : ''}</figure>`;
    }
    case 'video':
    case 'embed': {
      const url = d.type === 'external' ? d.external.url : d.url || (d.file && d.file.url) || '';
      const yt = youtubeId(url);
      if (yt) return `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${yt}" title="Video" loading="lazy" allowfullscreen></iframe></div>`;
      return url ? `<p><a class="bookmark" href="${esc(url)}" target="_blank" rel="noopener">${esc(url)}</a></p>` : '';
    }
    case 'bookmark':
    case 'link_preview':
      return d.url ? `<p><a class="bookmark" href="${esc(d.url)}" target="_blank" rel="noopener">${plain(d.caption || []) ? esc(plain(d.caption)) : esc(d.url)}</a></p>` : '';
    case 'toggle':
      return `<details><summary>${rich(d.rich_text)}</summary>${kidsFn()}</details>`;
    case 'code':
      return `<pre><code>${esc(plain(d.rich_text))}</code></pre>`;
    case 'table': {
      const rows = b.children || [];
      const body = rows
        .map((r, ri) => {
          const cells = (r.table_row && r.table_row.cells) || [];
          const tag = (d.has_column_header && ri === 0) ? 'th' : 'td';
          return `<tr>${cells.map((c, ci) => {
            const t = d.has_row_header && ci === 0 && tag === 'td' ? 'th' : tag;
            return `<${t}>${rich(c)}</${t}>`;
          }).join('')}</tr>`;
        })
        .join('');
      return `<div class="tbl"><table>${body}</table></div>`;
    }
    case 'column_list':
      return `<div class="cols">${(b.children || []).map((c) => `<div>${c.children ? renderBlocks(c.children, ctx) : ''}</div>`).join('')}</div>`;
    case 'synced_block':
      return kidsFn();
    case 'equation':
      return `<p><code>${esc(d.expression)}</code></p>`;
    default:
      return kidsFn(); // block không hỗ trợ: bỏ qua nhưng vẫn giữ nội dung con
  }
}

// ---------- định dạng ----------
export function fmtDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.slice(0, 10).split('-');
  return `${d}/${m}/${y}`;
}

function readingTime(html) {
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

const absUrl = (u) => (u && u.startsWith('/') ? SITE.url + u : u);

function postCard(p, feature = false) {
  return `<article class="post-card${feature ? ' feature' : ''}">
    <a class="thumb" href="/blog/${p.slug}" tabindex="-1" aria-hidden="true">${
      p.cover ? `<img src="${esc(p.cover)}" alt="" loading="lazy" decoding="async">` : `<img class="ph" src="/assets/logo-mark-white.png" alt="">`
    }</a>
    <div class="pc-body">
      <div class="meta">${p.tags[0] ? `<span class="t">${esc(p.tags[0])}</span>` : ''}<time datetime="${p.date.slice(0, 10)}">${fmtDate(p.date)}</time></div>
      <h2><a href="/blog/${p.slug}">${esc(p.title)}</a></h2>
      ${p.description ? `<p>${esc(p.description)}</p>` : ''}
      <span class="more">Đọc bài →</span>
    </div>
  </article>`;
}

// ---------- trang danh sách ----------
export function blogIndexPage(posts, { tag = '', configured = true } = {}) {
  const allTags = [...new Set(posts.flatMap((p) => p.tags))];
  const shown = tag ? posts.filter((p) => p.tags.map(slugify).includes(slugify(tag))) : posts;
  const tagName = tag ? allTags.find((t) => slugify(t) === slugify(tag)) || tag : '';
  const bc = [{ name: 'Trang chủ', href: '/' }, { name: 'Blog', href: '/blog' }];
  const title = tagName ? `${tagName} — Blog Phong Thủy Đỗ Gia` : 'Blog Bát Tự — Kiến thức & kinh nghiệm | Phong Thủy Đỗ Gia';
  const description = 'Chia sẻ kiến thức Bát Tự ứng dụng: chọn ngày giờ sinh, đặt tên cho con, định hướng công danh sự nghiệp và luận giải lá số — từ Phong Thủy Đỗ Gia.';

  const ld = [
    breadcrumbLd(bc),
    {
      '@context': 'https://schema.org', '@type': 'Blog', name: 'Blog Phong Thủy Đỗ Gia', url: SITE.url + '/blog', inLanguage: 'vi',
      publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: SITE.url + '/assets/logo-square.png' } },
      blogPost: posts.slice(0, 20).map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE.url}/blog/${p.slug}`, datePublished: p.date })),
    },
  ];

  let list;
  if (!configured) {
    list = `<div class="empty"><h2>Blog đang được chuẩn bị</h2><p>Những bài viết đầu tiên sẽ sớm được đăng tại đây.</p></div>`;
  } else if (!shown.length) {
    list = `<div class="empty"><h2>Chưa có bài viết</h2><p>Hãy quay lại sau nhé — Đỗ Gia đang chuẩn bị nội dung mới.</p></div>`;
  } else {
    list = `<div class="posts">${shown.map((p, i) => postCard(p, i === 0 && !tag && shown.length > 2)).join('')}</div>`;
  }

  return `${head({ title, description, path: tag ? `/blog?chu-de=${slugify(tag)}` : '/blog', noindex: !!tag, jsonLd: ld })}
<body>
${header({ active: 'blog', ctaHref: '/#dang-ky' })}
<main>
  <div class="wrap">
    ${crumbs([{ name: 'Trang chủ', href: '/' }, { name: 'Blog' }])}
    <div class="blog-head">
      <span class="eyebrow">Blog</span>
      <h1>${tagName ? esc(tagName) : 'Kiến thức Bát\u00A0Tự ứng dụng'}</h1>
      <p>${tagName ? `Các bài viết thuộc chủ đề “${esc(tagName)}”.` : 'Góc chia sẻ của Phong Thủy Đỗ Gia về Bát Tự trong những lựa chọn quan trọng của gia đình — từ ngày giờ sinh, cái tên đầu đời đến định hướng công danh, sự nghiệp.'}</p>
      ${allTags.length ? `<div class="tag-bar"><a class="chip${tag ? '' : ' on'}" href="/blog">Tất cả</a>${allTags.map((t) => `<a class="chip${slugify(t) === slugify(tag) ? ' on' : ''}" href="/blog?chu-de=${slugify(t)}">${esc(t)}</a>`).join('')}</div>` : ''}
    </div>
  </div>
  <section style="padding-top:28px">
    <div class="wrap">${list}</div>
  </section>
  ${referralBlock()}
</main>
${footer()}`;
}

// ---------- trang bài viết ----------
export function postPage(post, blocks, related = []) {
  const ctx = { ids: new Set(), toc: [], title: post.title };
  const body = renderBlocks(blocks, ctx);
  const mins = readingTime(body);
  const path = `/blog/${post.slug}`;
  const bc = [{ name: 'Trang chủ', href: '/' }, { name: 'Blog', href: '/blog' }, { name: post.title, href: path }];
  const firstP = body.match(/<p>(.*?)<\/p>/);
  const description = (post.description || (firstP ? firstP[1].replace(/<[^>]+>/g, '') : '') || post.title).slice(0, 160);
  const img = absUrl(post.cover) || SITE.ogImage;

  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'BlogPosting',
      headline: post.title, description, image: [img], inLanguage: 'vi',
      datePublished: post.date, dateModified: post.updated || post.date,
      mainEntityOfPage: { '@type': 'WebPage', '@id': SITE.url + path },
      author: { '@type': post.author === SITE.name ? 'Organization' : 'Person', name: post.author, ...(post.author === SITE.name ? { url: SITE.url + '/' } : {}) },
      publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: SITE.url + '/assets/logo-square.png' } },
      ...(post.tags.length ? { keywords: post.tags.join(', ') } : {}),
    },
    breadcrumbLd(bc),
  ];

  const toc = ctx.toc.length >= 3
    ? `<nav class="toc" aria-label="Mục lục"><p>Mục lục</p><ul>${ctx.toc.map((t) => `<li class="l${t.level}"><a href="#${t.id}">${esc(t.text)}</a></li>`).join('')}</ul></nav>`
    : '';

  const extraHead = `<meta property="article:published_time" content="${esc(post.date)}">
<meta property="article:modified_time" content="${esc(post.updated || post.date)}">
${post.tags.map((t) => `<meta property="article:tag" content="${esc(t)}">`).join('\n')}`;

  return `${head({ title: `${post.seoTitle || post.title} | Phong Thủy Đỗ Gia`, description, path, ogType: 'article', ogImage: img, jsonLd: ld, extraHead })}
<body>
${header({ active: 'blog', ctaHref: '/#dang-ky' })}
<main>
  <div class="wrap">
    <div class="article-wrap">
      ${crumbs([{ name: 'Trang chủ', href: '/' }, { name: 'Blog', href: '/blog' }, { name: post.title }])}
      <article>
        <header class="article-head">
          ${post.tags.length ? `<div class="tags">${post.tags.map((t) => `<a class="chip" href="/blog?chu-de=${slugify(t)}">${esc(t)}</a>`).join('')}</div>` : ''}
          <h1>${esc(post.title)}</h1>
          ${post.description ? `<p class="lead">${esc(post.description)}</p>` : ''}
          <div class="byline">
            <span class="av"><img src="/assets/logo-mark-white.png" alt=""></span>
            <div><b>${esc(post.author)}</b><time datetime="${post.date.slice(0, 10)}">${fmtDate(post.date)}</time> · ${mins} phút đọc</div>
          </div>
        </header>
        ${post.cover ? `<figure class="article-cover"><img src="${esc(post.cover)}" alt="${esc(post.title)}" fetchpriority="high"></figure>` : ''}
        ${toc}
        <div class="prose">
          ${body}
        </div>
      </article>
    </div>
  </div>

  <section class="post-cta" aria-label="Đăng ký tư vấn">
    <div class="wrap">
      <div class="referral">
        <div class="r-copy">
          <span class="r-icon">${ICONS.calendar}</span>
          <div>
            <h2>Cần tư vấn Bát Tự cho gia đình bạn?</h2>
            <p>Chọn ngày giờ sinh, đặt tên, định hướng công danh sự nghiệp hay luận giải lá số — Đỗ Gia luôn sẵn sàng đồng hành.</p>
          </div>
        </div>
        <a class="btn" href="/#dang-ky">Đăng ký tư vấn ${ICONS.arrow}</a>
      </div>
    </div>
  </section>

  ${related.length ? `<section class="related" style="padding-top:10px">
    <div class="wrap">
      <h2>Bài viết liên quan</h2>
      <div class="posts">${related.map((p) => postCard(p)).join('')}</div>
    </div>
  </section>` : ''}
</main>
${footer()}`;
}

export function notFoundPage() {
  return `${head({ title: 'Không tìm thấy bài viết | Phong Thủy Đỗ Gia', description: 'Bài viết không tồn tại hoặc đã được gỡ.', path: '/blog', noindex: true })}
<body>
${header({ active: 'blog' })}
<main>
  <section>
    <div class="wrap">
      <div class="empty">
        <h2>Không tìm thấy bài viết</h2>
        <p>Bài viết có thể đã đổi đường dẫn hoặc chưa được xuất bản.</p>
        <p style="margin-top:16px"><a class="btn btn-primary" href="/blog">Về trang Blog</a></p>
      </div>
    </div>
  </section>
</main>
${footer()}`;
}
