import config from '@dword-design/eslint-config';
import { globalIgnores } from 'eslint/config';

import withNuxt from './.nuxt/eslint.config.mjs';

export default await withNuxt(
  globalIgnores(['eslint.config.ts', 'eslint.lint-staged.config.ts', 'ecosystem.json']),
  config,
  {
    files: ['**/pages/**/*.{vue,ts}', 'server/api/**/*.ts'],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },
).toConfigs();
