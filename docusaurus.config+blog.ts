import config from './docusaurus.config';
import { merge } from 'lodash';
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkDirectiveSugar from 'remark-directive-sugar';

export default {
  ...config,
  // Override or add any blog-specific configuration here
   baseUrl: '/blog/',

   plugins: [],
   presets: [
    [
      'classic',
      merge({}, config.presets[0][1], {
        docs: false,
      })
    ],
  ],
};
