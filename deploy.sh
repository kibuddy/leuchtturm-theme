#!/bin/bash
# deploy.sh — Deploy Leuchtturm theme to Ghost DE or EN via docker cp + restart
# Usage: ./deploy.sh <de|en>
set -euo pipefail

TARGET="${1:-}"

case "$TARGET" in
  de)
    CONTAINER="de-ghost-1"
    ;;
  en)
    CONTAINER="en-ghost-1"
    ;;
  *)
    echo "Usage: ./deploy.sh <de|en>"
    exit 1
    ;;
esac

THEME_DIR="$(cd "$(dirname "$0")" && pwd)"
DEST="/var/lib/ghost/content/themes/leuchtturm"

echo "Deploying Leuchtturm theme to $CONTAINER..."

# Copy theme files
docker cp "$THEME_DIR/." "$CONTAINER:$DEST/"

# Fix ownership inside container
docker exec "$CONTAINER" chown -R node:node "$DEST"

# Restart Ghost to pick up theme changes
docker restart "$CONTAINER"

echo "Waiting for Ghost to start..."
sleep 10

echo "Leuchtturm theme deployed to $CONTAINER."
