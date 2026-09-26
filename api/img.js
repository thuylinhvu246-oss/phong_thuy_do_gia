// Ảnh tải lên Notion có link tạm (hết hạn sau 1 giờ).
// /api/img?block=<id> hoặc /api/img?page=<id> luôn chuyển hướng tới link còn hiệu lực.
import { freshImageUrl } from './_lib/notion.js';

export default async function handler(req, res) {
  const clean = (v) => String(v || '').replace(/[^0-9a-f]/gi, '').slice(0, 32);
  const block = clean(req.query && req.query.block);
  const page = clean(req.query && req.query.page);
  try {
    const url = (block || page) && (await freshImageUrl({ block, page }));
    if (!url) { res.statusCode = 404; return res.end('Not found'); }
    res.statusCode = 302;
    res.setHeader('Location', url);
    res.setHeader('Cache-Control', 'public, s-maxage=1800, max-age=600');
    res.end();
  } catch (e) {
    console.error(e);
    res.statusCode = 404;
    res.end('Not found');
  }
}
