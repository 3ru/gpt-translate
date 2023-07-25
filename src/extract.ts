import { getInput, setFailed } from '@actions/core'
import { context } from '@actions/github'
import { commandValidator, isValidFileExt } from './validate'

type CommandParams = {
  inputFilePath: string
  outputFilePath: string
  targetLang: string
}

type ManualParams = {
  inputFiles: string[]
  outputFiles: string[]
  languages: string[]
}

export const getCommandParams = async (): Promise<CommandParams> => {
  const comment = context.payload.comment?.body
  if (!comment) setFailed('Error: Comment could not be retrieved correctly.')

  const regex = /\/(?:gpt-translate|gt)\s+(\S+)\s+(\S+)\s+(\S+)/
  const match = regex.exec(comment)

  return commandValidator(comment, match)
}

export const extractInput = (): ManualParams => {
  const inputFilesRaw = getInput('inputFiles')
  const outputFilesRaw = getInput('outputFiles')
  const languagesRaw = getInput('languages')

  const inputFiles = inputFilesRaw
    ? inputFilesRaw.split(' ').filter((v) => v)
    : []
  const outputFiles = outputFilesRaw
    ? outputFilesRaw.split(' ').filter((v) => v)
    : []
  const languages = languagesRaw ? languagesRaw.split(' ').filter((v) => v) : []

  // validate input
  const isValidInput =
    inputFiles.every((v) => isValidFileExt(v)) &&
    outputFiles.every((v) => isValidFileExt(v))

  if (!isValidInput) {
    throw new Error(
      'Invalid input. Please check the inputFiles and outputFiles parameters',
    )
  }

  return {
    inputFiles,
    outputFiles,
    languages,
  }
}
