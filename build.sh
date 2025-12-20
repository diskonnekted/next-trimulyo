#!/bin/env bash

./scripts/update-cache.sh

pm2 stop all
rm -rf .next
npm run build
pm2 restart all
