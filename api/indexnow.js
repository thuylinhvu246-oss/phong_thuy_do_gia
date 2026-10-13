// IndexNow: báo cho Bing (và Yandex, Naver, Seznam) biết trang nào vừa có/vừa sửa,
// để bài mới được đọc trong vài giờ thay vì chờ vài ngày.
//
// - Vercel Cron gọi tự động mỗi ngày (xem vercel.json): gửi các bài blog đăng/sửa trong 48 giờ qua.
// - Gửi lại toàn bộ website bằng tay: mở https://www.phongthuydogia.com/api/indexnow?all=1
import { listPosts } from './_lib/notion.js';
import { SITE, SERVICES } from './_lib/layout.js';

const HOST = new URL(SITE.url).host;

export default async function handler(req, res) {
  const all = req.query && req.query.all === '1';
  let posts = [];
  try { posts = await listPosts(); } catch (e) { console.error(e); }

  const since = Date.now() - 48 * 3600 * 1000;
  const fresh = posts.filter((p) => Date.parse(p.updated || p.date) >= since);
  const paths = all
    ? ['/', ...SERVICES.map((s) => '/' + s.slug), '/blog', ...posts.map((p) => '/blog/' + p.slug)]
    : fresh.length ? ['/blog', ...fresh.map((p) => '/blog/' + p.slug)] : [];

  const out = { submitted: paths.map((p) => SITE.url + p), status: null };
  if (paths.length) {
    const r = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: SITE.indexNowKey,
        keyLocation: `${SITE.url}/${SITE.indexNowKey}.txt`,
        urlList: out.submitted,
      }),
    }).catch((e) => ({ status: 'error: ' + e.message }));
    out.status = r.status;
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(out, null, 2));
}
