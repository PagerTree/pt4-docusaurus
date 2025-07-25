import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'PagerTree',
  tagline: 'OnCall. Simplified. Intelligent alert routing for the DevOps team.',
  favicon: 'img/favicon.ico',
  trailingSlash: false,

  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://pagertree.com',
  baseUrl: '/',

  organizationName: 'pagertree',
  projectName: 'pt4-docusaurus',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        gtag: {
          trackingID: 'G-D5YD533NTH',
          anonymizeIP: true,
        },
        docs: {
          sidebarPath: './sidebars.ts',
          remarkPlugins: [],
          editUrl: 'https://github.com/pagertree/pt4-docusaurus/tree/main/',
        },
        blog: {
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/pagertree/pt4-docusaurus/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          remarkPlugins: [],
        },
        sitemap: {
          priority: 1,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'learn',
        path: 'learn',
        routeBasePath: 'learn',
        sidebarPath: './sidebarsLearn.ts',
        remarkPlugins: [],
        editUrl: 'https://github.com/pagertree/pt4-docusaurus/tree/main/',
      },
    ],
    require.resolve('docusaurus-plugin-image-zoom'),
  ],

  themeConfig: {
    image: 'img/logo.svg',
    navbar: {
      logo: {
        alt: 'PagerTree Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-inverted.svg',
        href: '/docs/'
      },
      items: [
        {to: 'https://pagertree.com/docs/', label: 'Docs', position: 'left', activeBaseRegex: '^/docs(?!/api/|/cli/|/integration-guides/)', target: '_self'},
        {to: 'https://pagertree.com/docs/integration-guides/introduction', label: 'Integration Guides', position: 'left', activeBasePath: '/docs/integration-guides', target: '_self'},
        {to: 'https://pagertree.com/docs/api/introduction', label: 'API', position: 'left', activeBasePath: '/docs/api', target: '_self'},
        {to: 'https://pagertree.com/docs/cli/command-line-interface', label: 'CLI', position: 'left', target: '_self'},
        {to: 'https://pagertree.com/learn/', label: 'Learn', position: 'right', activeBasePath: '/learn', target: '_self'},
        {to: 'https://pagertree.com/blog/', label: 'Blog', position: 'right', activePath: '/blog', target: '_self'},
        {
          href: 'https://pagertree.com',
          label: 'Website',
          position: 'right',
        },
        {
          href: 'https://app.pagertree.com/login',
          label: 'Login',
          position: 'right',
        },
        {
          href: 'https://app.pagertree.com/signup',
          label: 'Free Trial',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Resources',
          items: [
            {label: 'Docs', to: 'https://pagertree.com/docs/', target: '_self'},
            {label: 'Blog', to: 'https://pagertree.com/blog/', target: '_self'},
            {label: 'Learn', to: 'https://pagertree.com/learn/', target: '_self'},
          ],
        },
        {
          title: 'Contact',
          items: [
            {
              label: 'About',
              href: 'https://pagertree.com/about/',
            },
            {
              label: 'System Status',
              href: 'https://status.pagertree.com/',
            },
          ],
        },
      ],
      copyright: `Copyright © 2016-${new Date().getFullYear()} PagerTree, LLC.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'ruby', 'powershell']
    },
    zoom: {
      selector: '.markdown :not(em) > img',
      background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)'
      },
      config: {
        // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
      }
    }
  } satisfies Preset.ThemeConfig,
};

export default config;