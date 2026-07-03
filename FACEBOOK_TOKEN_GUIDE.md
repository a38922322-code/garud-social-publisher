# Facebook Token Fix - Step-by-Step Guide

## Problem
Current token lacks these permissions:
- `pages_manage_posts` 
- `pages_read_engagement`

## Solution - Get New Token with Correct Permissions

### Step 1: Go to Meta App Dashboard
```
https://developers.facebook.com/apps/
```

### Step 2: Select Your App
- Click on your Garud app (or create one if needed)

### Step 3: Navigate to "Graph API Explorer"
- Left sidebar → Tools → Graph API Explorer

### Step 4: Set Permissions
1. In the explorer, look for "Permissions" dropdown
2. Select these permissions:
   - ✅ pages_manage_posts
   - ✅ pages_read_engagement
   - ✅ pages_read_user_content
   
3. Click "Get Token" or "Generate Access Token"

### Step 5: Copy the New Token
- Copy the long token string (starts with "EAA...")

### Step 6: Update .env File
In `server/.env`, replace:
```
META_ACCESS_TOKEN=<old-token>
```
with:
```
META_ACCESS_TOKEN=<new-token-with-permissions>
```

### Step 7: Restart Backend
```
npm start
```

### Step 8: Test
Create a new post and it should automatically publish to Facebook!

---

## Alternative: Use Page Token Instead
If you're having permission issues with user token:
1. Go to your Page Settings
2. Copy the Page Access Token
3. Use that in META_ACCESS_TOKEN instead

---

## Verify Token Permissions
Once you have the token, test it:
```
curl "https://graph.facebook.com/v23.0/me/permissions?access_token=YOUR_TOKEN"
```

Should show:
- pages_manage_posts ✅
- pages_read_engagement ✅
