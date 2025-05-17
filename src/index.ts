import { context } from '@actions/github'
import { setFailed } from '@actions/core'
import { postError } from './utils'
import { translateByCommand, translateByManual } from './translate'
import { authorizeUser, gitAddCommentReaction } from './git'
import { extractInput, getCommandParams } from './extract'

async function main() {
  switch (context.eventName) {
    case 'issue_comment':
      const isAuthorized = await authorizeUser()
      if (!isAuthorized) {
        await postError('You have no permission to use this bot.')
      }
      await gitAddCommentReaction('eyes')
      const { inputFilePaths, outputFilePaths, targetLangs } =
        await getCommandParams()
      await translateByCommand(inputFilePaths, outputFilePaths, targetLangs)

      break

    case 'push':
    case 'workflow_dispatch':
      // ⚠ Experimental Feature
      // Translate any file from the parameter specification.
      // Multiple output and target languages can be selected.
      // [IMPORTANT]
      // outputFiles must be specified using wildcards.

      const { inputFiles, outputFiles, languages } = extractInput()
      await translateByManual(inputFiles, outputFiles, languages)

      break

    default:
      throw new Error('This event is not supported.')
  }
}

main().catch((e) => setFailed(e))
