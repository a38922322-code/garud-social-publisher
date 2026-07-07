# Deployment Checklist

## Railway Service Settings

- Railway Root Directory: `server`
- Build Command: `npm install`
- Start Command: `node server.js`

## Required Environment Variables

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `FB_PAGE_ID`
- `FB_ACCESS_TOKEN`
- `IG_BUSINESS_ID`
- `BACKEND_URL`
- `FRONTEND_URL`
- `VITE_API_URL`

## Notes

- Railway must deploy the Express backend only.
- The React frontend should be deployed separately on Vercel.
- Uploads are served from `/uploads` by the backend.
- If you use a custom Vercel domain, set `FRONTEND_URL` to that exact origin so CORS allows the browser requests.
- On Vercel, set `VITE_API_URL` to the Railway backend URL so the React app can reach the API in production.