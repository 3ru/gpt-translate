import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  defaultShowCopyCode: true,
  flexsearch: {
    codeblocks: true,
  },
  codeHighlight: true,
})

export default withNextra({
  async redirects() {
    return [
      {
        source: '/(docs|docs/getting-started)',
        destination: '/docs/overview/getting-started',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: [
      'en',
      // 'ja'
    ],
    defaultLocale: 'en',
    localeDetection: false,
  },
})
