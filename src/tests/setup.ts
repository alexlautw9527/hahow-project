import '@testing-library/jest-dom';
import { setupI18n } from '@/app/i18n';

/**
 * 這個程式會在每個測試檔案執行前執行
 */

setupI18n({ isTestingMode: true });
