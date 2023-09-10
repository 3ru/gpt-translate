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
}
