/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect } from 'react';
import type { Preview } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';

import { Providers } from '@/app/app-providers';
import i18n, { setupI18n } from '@/app/i18n';
// import { mswHandlers } from '../src/mocks/handlers';

// 能夠在 storybook 上切換語系
// reference: https://storybook.js.org/blog/internationalize-components-with-storybook/
export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'cimode', title: '關閉 i18n' },
        { value: 'en', title: 'English' },
        { value: 'zh-TW', title: '繁體中文' },
      ],
      showName: true,
    },
  },
};

setupI18n({ isTestingMode: true });

// 個別的 story 需要取用的 decorators 在 @storybook/react 的 preview 中設定
const preview: Preview = {
  // Global 的 decorators, 所有層級都會最先套用
  decorators: [
    (Story, context) => {
      const { locale = 'zh-TW' } = context.globals;
      const { isTestingMode } = context.parameters;

      if (isTestingMode && i18n.language !== 'cimode') {
        // parameter 的 isTestingMode 為 true 時, 強制切換語系為 cimode
        i18n.changeLanguage('cimode');
      }

      useEffect(() => {
        if (isTestingMode) {
          return;
        }
        i18n.changeLanguage(locale);
      }, [locale, isTestingMode]);

      return (
        <Providers>
          <I18nextProvider i18n={i18n}>
            <Story />
          </I18nextProvider>
        </Providers>
      );
    },
  ],
  parameters: {
    docs: {
      autoplay: false,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
