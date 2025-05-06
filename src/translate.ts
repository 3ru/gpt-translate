import fs from 'fs/promises'
import path from 'path'
import { glob } from 'glob'
import { context } from '@actions/github'
import { info } from '@actions/core'
import { generatePRBody, isPR } from './utils'
import {
  gitCheckout,
  gitCommitPush,
  gitCreateBranch,
  gitCreatePullRequest,
  gitPostComment,
  gitSetConfig,
} from './git'
import { createFile, generateOutputFilePaths, isFileExists } from './file'
import translator from './ai'

export const translateByCommand = async (
  inputFiles: string[],
  outputFiles: string[],
  languages: string[],
) => {

  if (!inputFiles.length || !outputFiles.length || !languages.length) {
    throw new Error(
      'Error: For comment execution, all three parameters (inputFilePaths, outputFiles and languages) are required',
    )
  }

  if (outputFiles.length !== languages.length) {
    throw new Error('Error: outputFiles and languages must be same length.')
  }

  const outputFilePaths: string[][] = outputFiles.map((outputFile) => generateOutputFilePaths(
    inputFiles,
    outputFile,
  ))

  await Promise.all(
    languages.map(async (language, index) => {
      return createTranslatedFiles(inputFiles, outputFilePaths[index], language)
    }),
  )

  await gitSetConfig()
  const branch = isPR() ? await gitCheckout() : await gitCreateBranch()

  await gitCommitPush(branch, outputFilePaths.flat())
  if (isPR()) {
    await gitPostComment('🎉Translation completed!')
    return
  }

  const issueNumber = context.issue.number
  const title = '🌐 Add LLM Translations'
  const body = generatePRBody(
    inputFiles,
    outputFilePaths,
    languages,
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

  // TODO: Dealing with token limit
  await Promise.all(
    languages.map(async (language, index) => {
      return createTranslatedFiles(inputFiles, outputFilePaths[index], language)
    }),
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
    const ext = path.extname(inputFile)
    const translated = await translator.translate(content, targetLang, ext)

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
