import fs from 'fs/promises'
import path from 'path'

/**
 * Create files recursively if no directory.
 */
export const createFile = async (
  data: string,
  filePath: string,
): Promise<void> => {
  try {
    await fs.writeFile(filePath, data)
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      await fs.mkdir(path.dirname(filePath), { recursive: true })
      await createFile(data, filePath)
    } else {
      throw err
    }
  }
}

export const isFileExists = async (inputPath: string) => {
  try {
    await fs.stat(inputPath)
    return true
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return false
    }
    throw error
  }
}

/**
 * Replace the part with '**' with the rest
 */
const replaceWildcardPath = (
  inputArray: string[],
  outputArray: string[],
): string[] => {
  const indexOfAsteriskAsterisk = outputArray.indexOf('**')
  // Return copy with no references
  if (indexOfAsteriskAsterisk === -1) return [...outputArray]

  return [
    ...outputArray.slice(0, indexOfAsteriskAsterisk),
    ...inputArray.slice(indexOfAsteriskAsterisk),
  ]
}

/**
 * Replaces the wildcard '*' in the output filename with the corresponding segments from the input filename,
 * while preserving any modifiers after the wildcard in the output filename.
 */
const replaceWildcardFilename = (
  inputFilenameWithoutExt: string,
  outputFilenameWithoutExt: string,
): string => {
  if (!inputFilenameWithoutExt.includes('.')) {
    return outputFilenameWithoutExt.replace('*', inputFilenameWithoutExt)
  }

  // Split filenames into segments based on '.'
  const inputSegmentsReversed = inputFilenameWithoutExt.split('.').reverse()
  const outputSegmentsReversed = outputFilenameWithoutExt.split('.').reverse()

  const wildcardIndex = outputSegmentsReversed.indexOf('*')

  // Construct the new filename by replacing the wildcard with the corresponding segments from the input filename
  const mergedSegments = [
    ...outputSegmentsReversed.slice(0, wildcardIndex),
    ...inputSegmentsReversed.slice(wildcardIndex),
  ]
  return mergedSegments.reverse().join('.')
}

/**
 * Generates an array of output file paths based on the provided array of input file paths
 *
 * @param {string[]} inputFilePaths - The array of input file paths
 * @param {string} outputFilePath - The format of the output file path. The '*' character in the output file path is replaced by the filename of each input file path
 * @returns {string[]} An array of output file paths.
 * @throws {Error} Throws an error if the outputFilePath does not contain extensions(.md) or wildcards(*)
 *
 */
export const generateOutputFilePaths = (
  inputFilePaths: string[],
  outputFilePath: string,
): string[] => {
  const outputSegments = path.normalize(outputFilePath).split(path.sep)
  const outputFileName = outputSegments.pop()!

  const outputFilenameWithoutExt = path.basename(
    outputFileName,
    path.extname(outputFileName),
  )

  /**
   * Generates a single output path based on the provided input file path and output file extension.
   */
  const generateOutputPath = (inputFilePath: string): string => {
    const inputSegments = path.normalize(inputFilePath).split(path.sep)
    const inputFile = inputSegments.pop()!
    const inputFileExt = path.extname(inputFile)
    const inputFilenameWithoutExt = path.basename(inputFile, inputFileExt)

    const resolvedPathSegments = replaceWildcardPath(
      inputSegments,
      outputSegments,
    )

    if (outputFilenameWithoutExt.includes('*')) {
      // If the output file pattern contains a wildcard '*', replace it with the input file name
      const finalFilename = replaceWildcardFilename(
        inputFilenameWithoutExt,
        outputFilenameWithoutExt,
      )

      // Use the extension of the input file and not the extension specified for the output file.
      resolvedPathSegments.push(`${finalFilename}${inputFileExt}`)
    } else {
      // Otherwise, use the specified output file name
      resolvedPathSegments.push(outputFileName)
    }

    return path.join(...resolvedPathSegments)
  }

  return inputFilePaths.flatMap((inputFilePath) =>
    generateOutputPath(inputFilePath),
  )
}
