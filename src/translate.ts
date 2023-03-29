import fs from 'fs/promises'
import { translate } from './gpt'
import { isPR, createFile, isFileExists } from './utils'
import {
  gitCheckout,
  gitCommitPush,
  gitCreateBranch,
  gitCreatePullRequest,
  gitPostComment,
  gitSetConfig,
} from './git'
import { context } from '@actions/github'

export const publishTranslate = async (
  inputFilePath: string,
  outputFilePath: string,
  targetLang: string,
) => {
  await gitSetConfig()
  const branch = isPR() ? await gitCheckout() : await gitCreateBranch()

  const content = await fs.readFile(inputFilePath, 'utf-8')
  const translated = await translate(content, targetLang)

  // Check if the translation is same as the original
  if (await isFileExists(outputFilePath)) {
    const fileContent = await fs.readFile(outputFilePath, 'utf-8')
    if (fileContent === translated) {
      await gitPostComment(
        '⛔ The result of translation was same as the existed output file.',
      )
      return
    }
  }

  await createFile(translated, outputFilePath)

  await gitCommitPush(branch, outputFilePath)
  if (isPR()) {
    await gitPostComment('🎉Translation completed!')
    return
  }

  const issueNumber = context.issue.number
  const title = '🌐 Add LLM Translations'
  const body = `## ✅ LLM Translation completed
  |**Name**|**Value**|
  |---|---|
  |**Source**|\`${inputFilePath}\`|
  |**Output**|\`${outputFilePath}\`|
  |**Language**|${targetLang}|
  |**Issue**|#${issueNumber}|
  `

  await gitCreatePullRequest(branch, title, body)
  await gitPostComment('🎉Translation PR created!')
}
