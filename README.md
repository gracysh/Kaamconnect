# KAAMCONNECT

Find the Right Worker, Right When You Need One.

A demo marketplace that connects customers with local electricians, plumbers, AC technicians and carpenters. Data lives in `localStorage` — no database or API keys required.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Customer | priya@kaamconnect.in | customer123 |
| Worker | ravi.electrician@kaamconnect.in | worker123 |
| Admin | admin@kaamconnect.in | admin123 |

Other seeded workers use password `worker123`. Try PIN codes `110016`, `110092`, `122001`, `201301`, `110001`.

## Connect a real AI later

Replace the keyword matcher in `src/lib/aiChat.ts` with a call to your preferred chat API. The chatbot UI already streams messages through that function.
