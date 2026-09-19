# Deploy reference

## nginx
The vhost lives only on the prod box, at `/etc/nginx/conf.d/skylanex.com.conf`. This
repo does not keep a copy of it. It used to, and the copy drifted from the real file
until neither described the other, so edit the file on the server directly: back it up
beside itself (`skylanex.com.conf.bak.<timestamp>`), `nginx -t`, then
`systemctl reload nginx`. The box runs nginx **1.14.1**, so HTTP/2 is
`listen 443 ssl http2;`. The newer `http2 on;` form does not parse there.

What it does: forces **https + www**, serves the static build from
`/var/www/skylanex/dist` (clean directory-index URLs), keeps the Let's Encrypt ACME
challenge path for renewals, and proxies **`/api/contact` →
`127.0.0.1:8000/contact`** (phansora-api) so the contact form posts same-origin (no
CORS). It also proxies **`/api/shotmatrix/` → `127.0.0.1:4700`**, the Shot Matrix
service behind `/products/shot-matrix`, with its own rate limits. That service is a
separate repo and systemd unit (github.com/brandon95547/shotmatrix, see its
`deploy/README.md`).

## Deploy (git-based)
Prod **is** a checkout of this repo at `/var/www/skylanex`, and nginx serves the
committed build from `/var/www/skylanex/dist`.

- **Dev:** edit source, `npm run build` (commits `dist/`), `git push`.
- **Prod:** `bash /var/www/skylanex/deploy/prod-deploy.sh` (a fast-forward `git pull`)
  — no build needed on the server; `dist/` is committed and served directly.

SSL is via certbot (auto-renew); the contact email is delivered by the phansora-api
`/contact` endpoint (`/api/contact` is proxied to it by the vhost above).
