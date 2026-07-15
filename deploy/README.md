# Deploy reference

Snapshots of the production server config for this site, kept in git so the repo
stays in sync with what's actually running (the server files are not otherwise
version-controlled).

- `nginx/skylanex.com.conf` — the live nginx vhost on the prod box at
  `/etc/nginx/conf.d/skylanex.com.conf`. Forces **https + www**, serves the static
  build from `/var/www/skylanex/dist` (clean directory-index URLs), keeps the Let's
  Encrypt ACME challenge path for renewals, and proxies **`/api/contact` →
  `127.0.0.1:8000/contact`** (phansora-api) so the contact form posts same-origin
  (no CORS).

If you change the server config, update this copy too (and vice-versa).

## Deploy (git-based)
Prod **is** a checkout of this repo at `/var/www/skylanex`, and nginx serves the
committed build from `/var/www/skylanex/dist`.

- **Dev:** edit source, `npm run build` (commits `dist/`), `git push`.
- **Prod:** `bash /var/www/skylanex/deploy/prod-deploy.sh` (a fast-forward `git pull`)
  — no build needed on the server; `dist/` is committed and served directly.

SSL is via certbot (auto-renew); the contact email is delivered by the phansora-api
`/contact` endpoint (`/api/contact` is proxied to it — see `nginx/skylanex.com.conf`).
