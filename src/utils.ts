import path from 'path'
import { setFailed } from '@actions/core'
import { gitPostComment } from './git'
import { context } from '@actions/github'
import { availableFileTypes, COMMAND_USAGE } from './const'

export const getCommandParams = async () => {
  const comment = context.payload.comment?.body
  if (!comment) setFailed('Error: Comment could not be retrieved correctly.')

  const regex = /\/(?:gpt-translate|gt)\s+(\S+)\s+(\S+)\s+(\S+)/
  const match = regex.exec(comment)

  return commandValidator(comment, match)
}

const commandValidator = async (
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

  const isValidFileType = (filename: string) =>
    availableFileTypes.some((type) => filename.endsWith(type))

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

export const postError = async (message: string) => {
  await gitPostComment(`❌${message}`)
  setFailed(message)
  process.exit(1)
}

export const isPR = () => {
  const { payload } = context
  return !!payload.issue?.pull_request
}

const removeSymbols = (input: string): string => {
  return input.replace(/[^\w\s]/gi, '')
}

export const generatePRBody = (
  inputFilePaths: string[],
  outputFilePaths: string[],
  targetLang: string,
  issueNumber: number,
) => {
  const generateRow = (label: string, filePaths: string[]) =>
    filePaths
      .map((filePath, i) => `${i > 0 ? '|' : `|**${label}**`}|\`${filePath}\`|`)
      .join('\n')

  return `## ✅ LLM Translation completed
  |**Name**|**Value**|
  |---|---|
  ${generateRow('Source', inputFilePaths)}
  ${generateRow('Output', outputFilePaths)}
  |**Language**|${targetLang}|
  |**Issue**|#${issueNumber}|
  `
}
