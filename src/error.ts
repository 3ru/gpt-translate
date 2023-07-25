import { availableFileExtensions } from './const'

export const COMMAND_USAGE = `usage:
\`\`\`
/gpt-translate [input file path] [output file path] [target language]
\`\`\`
`

const availableFileExtsString = availableFileExtensions.join(', ')

export const INVALID_FILE_EXTENSION = `Error: File must be a valid file type.\n${availableFileExtsString}`
