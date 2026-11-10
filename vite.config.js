import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { sendDirectEmails } from './api/send-email.js';

function directEmailPlugin(env) {
  const handleRequest = async (req, res, next) => {
    if (req.url === '/api/send-email' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => { body += chunk; });
      req.on('end', async () => {
        try {
          const enquiry = JSON.parse(body || '{}');
          Object.assign(process.env, env);
          const result = await sendDirectEmails(enquiry);
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify(result));
        } catch (e) {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 500;
          res.end(JSON.stringify({ error: e.message }));
        }
      });
      return;
    }
    next();
  };

  return {
    name: 'direct-email-backend',
    configureServer(server) {
      server.middlewares.use(handleRequest);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleRequest);
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      tailwindcss(),
      directEmailPlugin(env),
    ],
    server: {
      port: 3000,
      host: true,
    },
  };
});

