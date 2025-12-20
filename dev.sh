#!/bin/env bash

./scripts/update-cache.sh

rm -rf .next/dev
npm run dev
