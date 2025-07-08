import config from './docusaurus.config';
import { merge } from 'lodash';
import remarkDirectiveSugar from 'remark-directive-sugar';

export default {
  ...config,
  // Override or add any blog-specific configuration here
   baseUrl: '/learn/',

   presets: [
    [
      'classic',
      merge({}, config.presets[0][1], {
        blog: false,
        docs: {
          path: 'learn',
          routeBasePath: '/',
          sidebarPath: './sidebarsLearn.ts',
          remarkPlugins: [remarkDirectiveSugar],
          editUrl: 'https://github.com/pagertree/pt4-docusaurus/tree/main/',
        }
      })
    ],
  ],

  plugins: [
    require.resolve('docusaurus-plugin-image-zoom'),
  ],

  themeConfig: merge({}, config.themeConfig, {
    navbar: {
      logo: {
        href: "/learn/incident-management/",
      }
    }
  }),
};
