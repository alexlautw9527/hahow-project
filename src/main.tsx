import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { isLocal } from '@/configs/env';
import { setupI18n } from '@/app/i18n';
import { Providers } from '@/app/app-providers';
import App from '@/app/app';

setupI18n();

if (!isLocal) {
  console.log = () => {};
  console.error = () => {};
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback="Loading">
    <Providers>
      <App />
    </Providers>
  </Suspense>
);
