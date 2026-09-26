import { listPosts } from './_lib/notion.js';
import { SITE, esc } from './_lib/layout.js';
import { send } from './_lib/http.js';

export default async function handler(req, res) {
  let posts = [];
  try { posts = await listPosts(); } catch (e) { console.error(e); }
  const items = posts.slice(0, 30).map((p) => `
    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE.url}/blog/${p.slug}</link>
      <guid>${SITE.url}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Blog Phong Thủy Đỗ Gia</title>
    <link>${SITE.url}/blog</link>
    <description>Kiến thức Bát Tự ứng dụng từ Phong Thủy Đỗ Gia</description>
    <language>vi</language>${items}
  </channel>
</rss>`;
  send(res, 200, xml, 'application/rss+xml; charset=utf-8');
}
