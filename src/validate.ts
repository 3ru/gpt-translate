import { glob } from 'glob'
import path from 'path'
import { availableFileExtensions } from './const'
import { postError, removeSymbols } from './utils'
import { COMMAND_USAGE, INVALID_FILE_EXTENSION } from './error'

export const isValidFileExt = (filename: string): boolean => {
  const availabilities = new Set([...availableFileExtensions, '*'])
  const fileExt = path.extname(filename)

  if (fileExt.includes('{')) {
    const fileExts = fileExt
      .replace(/[{}.]/g, '')
      .split(',')
      .map((ext) => `.${ext}`)
    return fileExts.every((ext) => availabilities.has(ext))
  }

  return availabilities.has(fileExt)
}

export const commandValidator = async (
  userCommand: string | undefined,
  match: RegExpExecArray | null,
): Promise<{
  inputFilePaths: string[]
  outputFilePaths: string[]
  targetLangs: string[]
}> => {
  if (!match || match.length < 4) {
    await postError(`Invalid command: \`${userCommand}\`\n${COMMAND_USAGE}`)
  }

  const [, inputFilePathStr, outputFilePathStr, targetLangStr] = match!

  const inputFilePaths: string[] = []
  const outputFilePaths: string[] = []

  for (const inputFilePath of inputFilePathStr.split(',')) {
    if (!isValidFileExt(inputFilePath)) {
      await postError(INVALID_FILE_EXTENSION)
    }
    // Expand input files by glob
    const expandedInputFilePaths = await glob(inputFilePath);
    inputFilePaths.push(...expandedInputFilePaths)
  }

  for (const outputFilePath of outputFilePathStr.split(',')) {
    if (!isValidFileExt(outputFilePath)) {
      await postError(INVALID_FILE_EXTENSION)
    }
    outputFilePaths.push(outputFilePath)
  }

  const targetLangs: string[] = targetLangStr.split(',').map(removeSymbols)

  return {
    inputFilePaths,
    outputFilePaths,
    targetLangs,
  }
}
