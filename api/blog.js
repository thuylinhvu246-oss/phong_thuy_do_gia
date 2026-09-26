import { listPosts, isConfigured } from './_lib/notion.js';
import { blogIndexPage } from './_lib/render.js';
import { send } from './_lib/http.js';

export default async function handler(req, res) {
  const tag = (req.query && (req.query['chu-de'] || req.query.tag)) || '';
  try {
    const posts = await listPosts();
    send(res, 200, blogIndexPage(posts, { tag: String(tag), configured: isConfigured() }));
  } catch (e) {
    console.error(e);
    send(res, 200, blogIndexPage([], { configured: false }), undefined, 'public, s-maxage=30');
  }
}
