#!/usr/bin/env bash
#
# Prod deploy for the Skylanex static site.
#
# Prod holds a git checkout of this repo (default /var/www/skylanex-src). This
# pulls the latest commit and syncs the committed build (dist/) into the nginx
# webroot (/var/www/skylanex). The committed dist/ means no build step is needed
# on the server. Run on prod:  bash deploy/prod-deploy.sh
#
set -euo pipefail

REPO="${1:-/var/www/skylanex-src}"
WEBROOT="${2:-/var/www/skylanex}"

cd "$REPO"
git pull --ff-only
rsync -a --delete --exclude='.well-known' "$REPO/dist/" "$WEBROOT/"

echo "Deployed $(git rev-parse --short HEAD) -> $WEBROOT"
