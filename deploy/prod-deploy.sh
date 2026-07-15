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
echo "Deployed $(git rev-parse --short HEAD) — nginx serves $REPO/dist"
