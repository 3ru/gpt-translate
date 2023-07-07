import fs from 'fs/promises'
import path from 'path'
import { translate } from './gpt'
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

export const publishTranslate = async (
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

  const processFiles = inputFilePaths.map(async (inputFile, i) => {
    const content = await fs.readFile(inputFile, 'utf-8')
    const translated = await translate(content, targetLang)

    // Check if the translation is same as the original
    if (await isFileExists(outputFilePaths[i])) {
      const fileContent = await fs.readFile(outputFilePaths[i], 'utf-8')
      if (fileContent === translated) {
        await gitPostComment(
          '⛔ The result of translation was same as the existed output file.',
        )
        return
      }
    }

    await createFile(translated, outputFilePaths[i])
  })

  await Promise.all(processFiles)

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
