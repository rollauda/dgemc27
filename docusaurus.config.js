// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DGEMC',
  tagline: 'Rolland Auda, La Condamine, Quito, 2026-2027',
  favicon: 'img/droit.svg',

  // TODO bascule prod : remplacer par https://dgemc.profauda.fr quand dgemc27 prend la suite de dgemc25
  url: 'https://dgemc27.profauda.fr',
  baseUrl: '/',

  organizationName: 'rollauda', // Usually your GitHub org/user name.
  projectName: 'dgemc27', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false, // Désactive la documentation par défaut — plugins docs/activites dédiés
        blog: false, // Pas de blog sur le site DGEMC
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs',
        path: 'docs',
        routeBasePath: 'docs',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'activites',
        path: 'activites',
        routeBasePath: 'activites',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  // Active le support de Mermaid pour le Markdown
  markdown: {
    mermaid: true,
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      mermaid: {
        theme: {light: 'neutral', dark: 'forest'},
      },
      navbar: {
        title: 'dgemc-conda',
        logo: {
          alt: 'dgemc',
          src: 'img/justice.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Leçons',
            docsPluginId: 'docs',
          },
          {
            to: '/activites/intro',
            label: 'Activités',
            position: 'left',
            activeBaseRegex: `/activites/`,
          },
          {
            href: 'https://www.profauda.fr/',
            label: 'Accueil-Auda',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `©Rolland Auda, 2026-2027. Construit avec Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
