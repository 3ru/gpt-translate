import { getInput } from '@actions/core'

export const extractor = () => {
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

  return {
    inputFiles,
    outputFiles,
    languages,
  }
}
