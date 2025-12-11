#!/usr/bin/env bash
# Start PHP built-in server for backend with env loaded from .env
set -a
[ -f .env ] && source .env
set +a
HOST=${SERVER_HOST:-127.0.0.1}
PORT=${SERVER_PORT:-8000}
echo "Starting PHP built-in server on http://$HOST:$PORT (Backend)"
php -S ${HOST}:${PORT} -t "$(pwd)"
