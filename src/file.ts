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
function replaceWildcard(inputArray: string[], outputArray: string[]) {
  const output = [...outputArray]
  const indexOfAsteriskAsterisk = outputArray.indexOf('**')

  if (indexOfAsteriskAsterisk !== -1) {
    output.splice(
      indexOfAsteriskAsterisk,
      1,
      ...inputArray.slice(indexOfAsteriskAsterisk),
    )
  }

  return output
}

/**
 * Extracts the extension from a filename string
 */
function extractFileExtension(filename: string): string | null {
  const match = filename.match(/\.\w+(\.\w+)?$/)
  return match ? match[0] : null
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
  const outputSegments = outputFilePath.replace('./', '').split('/')
  const outputFilePattern = outputSegments.pop()!
  const outputFileExt = extractFileExtension(outputFilePattern) || ''
  const outputFilenameWithoutExt = outputFilePattern.replace(outputFileExt, '')

  return inputFilePaths.map((inputFilePath) => {
    const inputSegments = inputFilePath.split('/')
    const inputFile = inputSegments.pop()!
    const inputFileExt = extractFileExtension(inputFile) || ''
    const inputFilenameWithoutExt = inputFile.replace(inputFileExt, '')

    const resolvedPathSegments = replaceWildcard(inputSegments, outputSegments) // Resolve path segments

    // If output file pattern contains '*', replace it with the input filename
    if (outputFilenameWithoutExt.includes('*')) {
      const finalExt = outputFileExt || inputFileExt // If output extension isn't specified, use input file extension
      const finalFilename = `${inputFilenameWithoutExt}${finalExt}` // Concatenate filename and extension
      resolvedPathSegments.push(finalFilename)
    } else {
      // Otherwise, use the specified output filename
      resolvedPathSegments.push(outputFilePattern)
    }

    return resolvedPathSegments.join('/')
  })
}
