import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkDirectiveSugar from 'remark-directive-sugar';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'PagerTree',
  tagline: 'OnCall. Simplified. Intelligent alert routing for the DevOps team.',
  favicon: 'img/favicon.ico',

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
        // gtag: {
        //   trackingID: 'G-XXXXXXXXXX',
        //   anonymizeIP: true,
        // },
        docs: {
          sidebarPath: './sidebars.ts',
          remarkPlugins: [remarkDirectiveSugar],
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          remarkPlugins: [],
        },
        sitemap: {
          filename: 'sitemap-docusaurus.xml',
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
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/',
            to: '/docs',
          },
          {
            from: '/learn/devops',
            to: '/learn/devops/what-is-devops',
          },
        ],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'learn',
        path: 'learn',
        routeBasePath: 'learn',
        sidebarPath: './sidebarsLearn.ts',
        remarkPlugins: [remarkDirectiveSugar],
        editUrl:
          'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
      },
    ],
    require.resolve('docusaurus-plugin-image-zoom'),
    
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      logo: {
        alt: 'PagerTree Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-inverted.svg'
      },
      items: [
        {to: '/docs', label: 'Docs', position: 'left', activeBaseRegex: '^/docs(?!/api/|/cli/|/integration-guides/)',},
        {to: '/docs/integration-guides/introduction', label: 'Integration Guides', position: 'left', activeBasePath: '/docs/integration-guides'},
        {to: '/docs/api/introduction', label: 'API', position: 'left', activeBasePath: '/docs/api'},
        {to: '/docs/cli/command-line-interface', label: 'CLI', position: 'left'},
        {to: '/learn', label: 'Learn', position: 'right'},
        {to: '/blog', label: 'Blog', position: 'right'},
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
            {label: 'Docs', to: '/docs'},
            {label: 'Blog', to: '/blog'},
            {label: 'Learn', to: '/learn/introduction'},
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
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