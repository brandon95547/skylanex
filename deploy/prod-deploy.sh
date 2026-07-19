#!/usr/bin/env bash
#
# Prod deploy for the Skylanex static site.
#
# Prod IS a git checkout of this repo at /var/www/skylanex, and nginx serves the
# committed build from /var/www/skylanex/dist. Deploying is just a fast-forward
# pull (dist/ is committed, so no build step is needed on the server). Run on prod:
#   bash /var/www/skylanex/deploy/prod-deploy.sh
#
set -euo pipefail

REPO="${1:-/var/www/skylanex}"

cd "$REPO"
git pull --ff-only

# dist/videos is gitignored (it would double ~76MB of media in the repo), so
# recreate it from the tracked assets/videos on each deploy.
if [ -d assets/videos ]; then
  mkdir -p dist/videos
  rsync -a --delete assets/videos/ dist/videos/
  echo "Synced $(ls -1 dist/videos | wc -l) video(s) → dist/videos"
fi

echo "Deployed $(git rev-parse --short HEAD) — nginx serves $REPO/dist"
