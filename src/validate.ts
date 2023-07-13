import { availableFileTypes, COMMAND_USAGE } from './const'
import path from 'path'
import { postError, removeSymbols } from './utils'

export const isValidFileType = (filename: string): boolean => {
  // Allow input file extension inheritance by asterisk in addition to normal file formats
  const fileTypes = [...availableFileTypes, '*']
  return fileTypes.some((type) => filename.endsWith(type))
}

export const commandValidator = async (
  userCommand: string | undefined,
  match: RegExpExecArray | null,
): Promise<{
  inputFilePath: string
  outputFilePath: string
  targetLang: string
}> => {
  if (!match || match.length < 4) {
    await postError(`Invalid command: \`${userCommand}\`\n${COMMAND_USAGE}`)
  }

  const [, inputFilePath, outputFilePath, targetLang] = match!

  // const isValidFileType = (filename: string) =>
  //   availableFileTypes.some((type) => filename.endsWith(type))

  if (!isValidFileType(inputFilePath) || !isValidFileType(outputFilePath)) {
    const availableFileTypesString = availableFileTypes.join(', ')
    await postError(
      `Error: File must be a valid file type.\n${availableFileTypesString}`,
    )
  }

  const inputFileName = path.basename(inputFilePath)
  const outputFileName = path.basename(outputFilePath)

  // If multiple files are specified, input and output must be specified in the same way.
  if (
    (inputFileName.includes('*') && !outputFileName.includes('*')) ||
    (!inputFileName.includes('*') && outputFileName.includes('*'))
  ) {
    await postError(
      `Error: Multiple file specification mismatch.\n${inputFileName} and ${outputFileName}`,
    )
  }

  return {
    inputFilePath,
    outputFilePath,
    targetLang: removeSymbols(targetLang),
  }
}
