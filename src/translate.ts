import fs from 'fs/promises'
import path from 'path'
import { gptTranslate } from './gpt'
import { generatePRBody, isPR } from './utils'
import {
  gitCheckout,
  gitCommitPush,
  gitCreateBranch,
  gitCreatePullRequest,
  gitPostComment,
  gitSetConfig,
} from './git'
import { context } from '@actions/github'
import {
  createFile,
  generateOutputFilePaths,
  getFilePathsWithExtension,
  isFileExists,
} from './file'
import { info } from '@actions/core'

export const translateByCommand = async (
  inputFilePath: string,
  outputFilePath: string,
  targetLang: string,
) => {
  await gitSetConfig()
  const branch = isPR() ? await gitCheckout() : await gitCreateBranch()

  const isMultipleFileSelected = path.basename(inputFilePath).includes('*')

  const inputFilePaths = isMultipleFileSelected
    ? await getFilePathsWithExtension(
        path.dirname(inputFilePath),
        path.extname(inputFilePath),
      )
    : [inputFilePath]

  const outputFilePaths = isMultipleFileSelected
    ? generateOutputFilePaths(inputFilePaths, outputFilePath)
    : [outputFilePath]

  await createTranslatedFiles(inputFilePaths, outputFilePaths, targetLang)

  await gitCommitPush(branch, outputFilePaths)
  if (isPR()) {
    await gitPostComment('🎉Translation completed!')
    return
  }

  const issueNumber = context.issue.number
  const title = '🌐 Add LLM Translations'
  const body = generatePRBody(
    inputFilePaths,
    outputFilePaths,
    targetLang,
    issueNumber,
  )

  await gitCreatePullRequest(branch, title, body)
  await gitPostComment('🎉Translation PR created!')
}

export const translateByManual = async (
  inputFiles: string[],
  outputFiles: string[],
  languages: string[],
) => {
  if (!inputFiles.length) {
    info('No input files specified. Skip translation.')
    return
  }

  if (!inputFiles.length || !outputFiles.length || !languages.length) {
    throw new Error(
      'Error: For push execution, all three parameters (inputFiles, outputFiles and language ) are required',
    )
  }
  if (outputFiles.length !== languages.length) {
    throw new Error('Error: outputFiles and language must be same length.')
  }

  const outputFilePaths: string[][] = outputFiles.map((outputFile) => {
    return generateOutputFilePaths(inputFiles, outputFile)
  })

  // TODO: Dealing with request limits (503 error)
  await Promise.all(
    languages.map((language, index) =>
      createTranslatedFiles(inputFiles, outputFilePaths[index], language),
    ),
  )

  await gitSetConfig()
  const branch = await gitCreateBranch()
  const title = '🌐 Add LLM Translations'
  await gitCommitPush(branch, outputFilePaths.flat())
  const body = generatePRBody(inputFiles, outputFilePaths, languages)
  await gitCreatePullRequest(branch, title, body)
}

/*
 * Parallel creation of translation files
 * inputFilePaths and outputFilePaths must be same length and same order
 */
export const createTranslatedFiles = async (
  inputFilePaths: string[],
  outputFilePaths: string[],
  targetLang: string,
) => {
  const processFiles = inputFilePaths.map(async (inputFile, i) => {
    const content = await fs.readFile(inputFile, 'utf-8')
    const translated = await gptTranslate(content, targetLang)

    // Check if the translation is same as the original
    if (await isFileExists(outputFilePaths[i])) {
      const fileContent = await fs.readFile(outputFilePaths[i], 'utf-8')
      if (fileContent === translated) {
        info(
          '⛔ The result of translation was same as the existed output file.',
        )
        return
      }
    }

    info(`Create Translated File ${outputFilePaths[i]}`)
    await createFile(translated, outputFilePaths[i])
  })

  await Promise.all(processFiles)
}
