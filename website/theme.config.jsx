export default {
  titleSuffix: ' – GT',
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
}
