import { getInput, setFailed } from '@actions/core'
import { gitPostComment } from './git'
import { context } from '@actions/github'

export const postError = async (message: string) => {
  await gitPostComment(`❌${message}`)
  setFailed(message)
  process.exit(1)
}

export const isPR = () => {
  const { payload } = context
  return !!payload.issue?.pull_request
}

export const removeSymbols = (input: string): string => {
  return input.replace(/[^\w\s]/gi, '')
}

export const delay = (s: number) =>
  new Promise((resolve) => setTimeout(resolve, 1000 * s))

export const generatePRBody = (
  sourceFilePaths: string[],
  translatedFilePaths: string[] | string[][],
  targetLanguages: string | string[],
  issueNumber?: number,
) => {
  // Convert targetLanguages to array if it's a single string
  const languages = Array.isArray(targetLanguages) ? targetLanguages : [targetLanguages];

  // Create an appropriate title based on the number of languages
  let title;
  if (languages.length > 1) {
    // For multiple languages, show a summary with limited language names to avoid title length issues
    if (languages.length <= 3) {
      // Show all languages when there are 3 or fewer
      const languageSummary = languages.join(", ");
      title = `## ✅ Translated to ${languages.length} languages (${languageSummary})`;
    } else {
      // For 4+ languages, show first two with a count of remaining ones
      const visibleLanguages = languages.slice(0, 2).join(", ");
      const hiddenCount = languages.length - 2;
      title = `## ✅ Translated to ${languages.length} languages (${visibleLanguages}, +${hiddenCount} more)`;
    }
  } else {
    // For a single language, simply name it
    title = `## ✅ Translated to ${languages[0]}`;
  }

  // Add file count info to the title
  const fileCount = sourceFilePaths.length;
  const fileCountText = `${fileCount} file${fileCount !== 1 ? 's' : ''}`;

  // Combine title components
  let prBody = `${title} - ${fileCountText}\n\n`;

  // Create the table header with proper column alignment
  prBody += `| **Source** | **Output** | **Language** |\n`;
  prBody += `| :--- | :--- | :--- |\n`;

  // Generate table rows - now with separate rows for each translation
  for (let sourceIndex = 0; sourceIndex < sourceFilePaths.length; sourceIndex++) {
    const sourcePath = sourceFilePaths[sourceIndex];

    // Handle different output file structures
    if (Array.isArray(translatedFilePaths[0])) {
      // Multi-language case: create a separate row for each language
      for (let langIndex = 0; langIndex < translatedFilePaths.length; langIndex++) {
        const translationsForLanguage = translatedFilePaths[langIndex];
        const translatedFile = translationsForLanguage[sourceIndex] || '';
        const language = languages[langIndex] || '';

        // For the first language of this source file, include the source
        if (langIndex === 0) {
          prBody += `| \`${sourcePath}\` | \`${translatedFile}\` | ${language} |\n`;
        } else {
          // For subsequent languages, leave the Source cell empty
          prBody += `|  | \`${translatedFile}\` | ${language} |\n`;
        }
      }

      // Add a separator row if this isn't the last source file
      if (sourceIndex < sourceFilePaths.length - 1) {
        prBody += `| | | |\n`;
      }
    } else {
      // Single-language case: just one row per source file
      prBody += `| \`${sourcePath}\` | \`${translatedFilePaths[sourceIndex] || ''}\` | ${languages[0] || ''} |\n`;
    }
  }

  // Add related issue reference below the table if provided
  if (issueNumber) {
    prBody += `\n**Related Issue**: #${issueNumber}\n`;
  }

  return prBody;
}

/**
 * Get the @actions getInput value as a number.
 */
export const getInputAsNumber = (name: string): number | undefined => {
  const input = getInput(name)
  if (!input) {
    return undefined // if the input is empty
  }
  const parsed = Number(input)
  if (isNaN(parsed)) {
    return undefined // if the input is not a number
  }
  return parsed
}
