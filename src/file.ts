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

/*
 * Get all file paths in a directory with a specific extension.
 * @param directoryPath The path to the directory to search.
 * @param extension The extension to filter by.
 */
export const getFilePathsWithExtension = async (
  directoryPath: string,
  extension: string,
): Promise<string[]> => {
  const files = await fs.readdir(directoryPath)

  const filteredFiles: string[] = []
  for (const file of files) {
    const filePath = path.join(directoryPath, file)
    const stat = await fs.stat(filePath)

    if (stat.isFile() && path.extname(file) === extension) {
      filteredFiles.push(filePath)
    }
  }

  return filteredFiles
}

/**
 * Generates an array of output file paths based on the provided array of input file paths
 *
 * @param {string[]} inputFilePaths - The array of input file paths
 * @param {string} outputFilePath - The format of the output file path. The '*' character in the output file path is replaced by the filename of each input file path
 * @returns {string[]} An array of output file paths.
 *
 * @example
 * // returns ['a/c/c.ja.md', 'a/c/d.ja.md']
 * generateOutputFilePaths(['a/b/c.md', 'a/b/d.md'], 'a/c/*.ja.md');
 */
export const generateOutputFilePaths = (
  inputFilePaths: string[],
  outputFilePath: string,
): string[] => {
  const outputDirectory = path.dirname(outputFilePath)
  const outputPathFormat = path
    .basename(outputFilePath)
    .replace('*', '{filename}')

  return inputFilePaths.map((inputFilePath) => {
    const filenameWithoutExtension = path.basename(
      inputFilePath,
      path.extname(inputFilePath),
    )
    const newFilename = outputPathFormat.replace(
      '{filename}',
      filenameWithoutExtension,
    )
    return path.join(outputDirectory, newFilename)
  })
}
