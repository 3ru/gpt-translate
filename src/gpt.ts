import { error, getInput, info, notice } from '@actions/core'
import OpenAI from 'openai'
import { encode } from 'gpt-3-encoder'
import { modelTokens, minimumTokens } from './const'
import { getInputAsNumber } from './utils'

const API_KEY = getInput('apikey', { required: true })
const BASE_PATH = getInput('basePath') || 'https://api.openai.com/v1'
const MODEL = getInput('model') || Object.keys(modelTokens)[0]
const PROMPT =
  getInput('prompt') ||
  'Please translate the given text into naturalistic {targetLanguage}.'

const configuration = {
  apiKey: API_KEY,
  basePath: BASE_PATH,
}
const openAIApi = new OpenAI(configuration)

export const askGPT = async (text: string, prompt: string): Promise<string> => {
  const {
    choices: [{ message: { content: content } = { content: '' } }],
  } = await openAIApi.chat.completions
    .create({
      model: MODEL,
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: text },
      ],
      top_p: getInputAsNumber('top_p'),
      temperature: getInputAsNumber('temperature'),
      n: getInputAsNumber('n'),
      max_tokens: getInputAsNumber('max_tokens'),
      presence_penalty: getInputAsNumber('presence_penalty'),
      frequency_penalty: getInputAsNumber('frequency_penalty'),
      seed: getInputAsNumber('seed'),
    })
    .catch((err) => {
      error(err)

      const notifications = [
        'If the status code is 400, the file exceeds token limit without line breaks. \nPlease open one line as appropriate.',
        'If the status code is 404, you do not have right access to the model.',
      ]
      notifications.forEach((msg) => notice(msg))

      process.exit(1)
    })

  if (!content || content === '') {
    info('Possible Error: Translation result is empty')
    return ''
  }

  return content
}

export const gptTranslate = async (
  text: string,
  targetLanguage: string,
  targetFileExt: string, // filename extension. Must be within availableFileExtensions.
  splitter = `\n\n`,
): Promise<string> => {
  const maxToken = modelTokens[MODEL] || minimumTokens
  const prompt = PROMPT.replaceAll(
    '{targetLanguage}',
    targetLanguage,
  ).replaceAll('{targetFileExt}', targetFileExt)

  let translated = ''
  let chunk = ''

  info(`${new Date().toLocaleString()} Start translating with ${MODEL}...`)
  const contentChunks = text.split(splitter)
  for (let i = 0; i < contentChunks.length; i++) {
    if (encode(chunk + contentChunks[i]).length > maxToken) {
      const translatedContent = await askGPT(chunk, prompt)
      translated += translatedContent + splitter
      chunk = ''
    }
    chunk += contentChunks[i] + (i < contentChunks.length - 1 ? splitter : '')
  }
  translated += await askGPT(chunk, prompt)
  info('Translation completed!')

  return translated
}
