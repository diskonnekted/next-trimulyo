#!/bin/bash

# Script to update LAST_MODIFIED in .env file
# Usage: ./scripts/update-cache.sh

set -e

ENV_FILE=".env"
TIMESTAMP=$(date +%s)

echo "🔄 Updating LAST_MODIFIED in $ENV_FILE..."

# Check if .env file exists
if [ ! -f "$ENV_FILE" ]; then
    echo "❌ Error: $ENV_FILE not found!"
    echo "💡 Copy .env.example to .env first: cp .env.example .env"
    exit 1
fi

# Check if LAST_MODIFIED already exists in .env
if grep -q "LAST_MODIFIED=" "$ENV_FILE"; then
    # Update existing LAST_MODIFIED
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/LAST_MODIFIED=.*/LAST_MODIFIED=$TIMESTAMP/" "$ENV_FILE"
    else
        # Linux
        sed -i "s/LAST_MODIFIED=.*/LAST_MODIFIED=$TIMESTAMP/" "$ENV_FILE"
    fi
    echo "✅ Updated LAST_MODIFIED to $TIMESTAMP ($(date -d @$TIMESTAMP))"
else
    # Add LAST_MODIFIED to .env
    echo "" >> "$ENV_FILE"
    echo "# Cache Invalidation - Updated: $(date)" >> "$ENV_FILE"
    echo "LAST_MODIFIED=$TIMESTAMP" >> "$ENV_FILE"
    echo "✅ Added LAST_MODIFIED=$TIMESTAMP ($(date -d @$TIMESTAMP))"
fi

echo ""
echo "💡 You can now deploy your changes. All clients will automatically clear their cache."
echo ""
echo "🔍 To verify, check the current value:"
echo "   grep LAST_MODIFIED $ENV_FILE"
