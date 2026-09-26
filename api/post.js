import { listPosts, getBlocks, slugify } from './_lib/notion.js';
import { postPage, notFoundPage } from './_lib/render.js';
import { send } from './_lib/http.js';

export default async function handler(req, res) {
  const raw = String((req.query && req.query.slug) || '');
  const slug = slugify(decodeURIComponent(raw));
  try {
    const posts = await listPosts();
    const post = posts.find((p) => p.slug === slug);
    if (!post) return send(res, 404, notFoundPage());
    // đường dẫn có dấu / viết hoa → chuyển về slug chuẩn (tránh trùng lặp nội dung)
    if (raw !== slug) {
      res.statusCode = 301;
      res.setHeader('Location', `/blog/${slug}`);
      return res.end();
    }
    const blocks = await getBlocks(post.id);
    const related = posts
      .filter((p) => p.id !== post.id)
      .map((p) => ({ p, score: p.tags.filter((t) => post.tags.includes(t)).length }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((x) => x.p);
    send(res, 200, postPage(post, blocks, related));
  } catch (e) {
    console.error(e);
    send(res, 500, notFoundPage());
  }
}
