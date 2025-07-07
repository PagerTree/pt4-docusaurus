import config from './docusaurus.config';
import { merge } from 'lodash';
import remarkDirectiveSugar from 'remark-directive-sugar';

export default {
  ...config,
  // Override or add any blog-specific configuration here
   baseUrl: '/docs/',

   plugins: [],
   presets: [
    [
      'classic',
      merge({}, config.presets[0][1], {
        blog: false,
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          remarkPlugins: [remarkDirectiveSugar],
          editUrl: 'https://github.com/pagertree/pt4-docusaurus/tree/main/',
        }
      })
    ],
  ],
};
