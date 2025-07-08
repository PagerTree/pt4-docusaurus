import config from './docusaurus.config';
import { merge } from 'lodash';

export default {
  ...config,
  // Override or add any blog-specific configuration here
   baseUrl: '/blog/',

   presets: [
    [
      'classic',
      merge({}, config.presets[0][1], {
        docs: false,
        blog: {
          routeBasePath: '/',
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
        href: "/blog/",
      }
    }
  }),
};
