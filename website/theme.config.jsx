export default {
  docsRepositoryBase:
    'https://github.com/3ru/gpt-translate/tree/master/website',
  logo: (
    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
      💬GPT Translate
    </span>
  ),
  sidebar: {
    toggleButton: true,
  },
  project: {
    link: 'https://github.com/3ru/gpt-translate',
  },
  head: (
    <>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta
        name='og:title'
        content='GPT-Translate: Automate translation workflow using AI'
      />
      <meta
        name='description'
        content='GPT-Translate: Automate translation workflow using AI'
      />
    </>
  ),
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href='https://github.com/3ru' target='_blank'>
          Ryuya
        </a>
        .
      </span>
    ),
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – GPT-Translate',
    }
  },
  i18n: [
    { locale: 'en', text: 'English' },
    { locale: 'zh-CN', text: '简体中文' },
    // { locale: 'zh-TW', text: '繁體中文' },
    // { locale: 'ja', text: '日本語' },
  ],
  search: {
    placeholder: 'Search documentation...',
  },
}
