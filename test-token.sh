#!/bin/bash
# Test script for new Facebook/Instagram token

TOKEN=$1
PAGE_ID="1226110080580360"
IG_BUSINESS_ID="17841446990145718"

if [ -z "$TOKEN" ]; then
  echo "Usage: ./test-token.sh YOUR_NEW_TOKEN"
  exit 1
fi

echo "Testing Facebook..."
curl -s "https://graph.facebook.com/v23.0/$PAGE_ID?access_token=$TOKEN" | head -20

echo -e "\n\nTesting Instagram..."
curl -s "https://graph.facebook.com/v23.0/$IG_BUSINESS_ID?access_token=$TOKEN" | head -20

echo -e "\n\nTesting Facebook posting capability..."
curl -s "https://graph.facebook.com/me/permissions?access_token=$TOKEN" | grep -E "pages_manage_posts|pages_read_engagement"

echo -e "\n\n✅ If you see 'pages_manage_posts' and 'pages_read_engagement' above, token is ready to use!"
