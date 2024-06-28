import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { isLocal } from '@/configs/env';
import { setupI18n } from '@/app/i18n';
import { Providers } from '@/app/app-providers';
import App from '@/app/app';

import '@/app/index.css';

setupI18n();

if (!isLocal) {
  console.log = () => {};
  console.error = () => {};
}

(async function init() {
  try {
    // if (isEnableMock) {
    //   const { worker } = await import('@/mocks/browser');
    //   await worker.start({
    //     onUnhandledRequest: 'bypass',
    //   });
    // }
  } catch (e) {
    console.error(e);
  } finally {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      // TODO: 後續改為正確的 fallback 元件
      <Suspense fallback="Loading">
        <Providers>
          <App />
        </Providers>
      </Suspense>
    );
  }
})();
