# Deploy reference

Snapshots of the production server config for this site, kept in git so the repo
stays in sync with what's actually running (the server files are not otherwise
version-controlled).

- `nginx/skylanex.com.conf` — the live nginx vhost on the prod box at
  `/etc/nginx/conf.d/skylanex.com.conf`. Forces **https + www**, serves the static
  build from `/var/www/skylanex` (clean directory-index URLs), keeps the Let's
  Encrypt ACME challenge path for renewals, and proxies **`/api/contact` →
  `127.0.0.1:8000/contact`** (phansora-api) so the contact form posts same-origin
  (no CORS).

If you change the server config, update this copy too (and vice-versa).

## Deploy the static site
```
npm run deploy          # build + rsync dist/ -> root@phansora.com:/var/www/skylanex/
```
SSL is via certbot (auto-renew); the contact email is delivered by the phansora-api
`/contact` endpoint.
