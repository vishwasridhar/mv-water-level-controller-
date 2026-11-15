# API endpoint map

The frontend uses one shared Axios client in `frontend/src/api.js`. Its default base URL is:

`https://mv-water-level-controller.onrender.com/api`

You can override it in Vercel with `VITE_API_URL`.

| Feature                 | HTTP method | Path                         | Backend route                      |
| ----------------------- | ----------: | ---------------------------- | ---------------------------------- |
| Login                   |        POST | `/api/auth/login`            | `backend/routes/auth.js`           |
| Register                |        POST | `/api/auth/register`         | `backend/routes/auth.js`           |
| List products           |         GET | `/api/products`              | `backend/routes/products.js`       |
| Create product          |        POST | `/api/products`              | `backend/routes/products.js`       |
| Delete product          |      DELETE | `/api/products/:id`          | `backend/routes/products.js`       |
| Send password-reset OTP |        POST | `/api/forgot/send-otp`       | `backend/routes/forgotPassword.js` |
| Verify OTP              |        POST | `/api/forgot/verify-otp`     | `backend/routes/forgotPassword.js` |
| Reset password          |        POST | `/api/forgot/reset-password` | `backend/routes/forgotPassword.js` |

The backend mounts these route files in `backend/server.js` under `/api/auth`, `/api/products`, and `/api/forgot`.

## Environment setup

- Backend: copy `backend/.env.example` to `backend/.env` and fill in your own secrets.
- Render: set the same backend variables in the service's Environment settings.
- Vercel: `VITE_API_URL` is optional because the shared client already defaults to the live Render backend URL. If you set it, use the backend URL only, without an API path suffix.

Never commit `.env`, database credentials, email app passwords, or JWT secrets.
