import { availableFileExtensions } from './const'

export const COMMAND_USAGE = `usage:
\`\`\`
/gpt-translate [input file path] [output file path] [target language]
\`\`\`
`

const availableFileExtsString = availableFileExtensions
  .map((ext) => `\`${ext}\``)
  .join(', ')

export const INVALID_FILE_EXTENSION = `Unsupported file extension. Please use one of the following formats: ${availableFileExtsString}.`
