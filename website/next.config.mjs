import nextra from 'nextra'


const withNextra = nextra({
  // theme: './src/index.tsx',
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
  // images: {
    // domains: ['images.unsplash.com'],
  // },
})
