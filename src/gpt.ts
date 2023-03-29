import { getInput, info, setFailed } from '@actions/core'
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from 'openai'
import { encode } from 'gpt-3-encoder'

const API_KEY = getInput('apikey')
if (!API_KEY) {
  setFailed('Error: API_KEY could not be retrieved.')
}

const configuration = new Configuration({ apiKey: API_KEY })
const openAIApi = new OpenAIApi(configuration)

export const askGPT = async (text: string, prompt: string): Promise<string> => {
  const {
    data: {
      choices: [{ message: { content: content } = { content: '' } }],
    },
  } = await openAIApi.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: prompt,
      },
      { role: ChatCompletionRequestMessageRoleEnum.User, content: text },
    ],
    top_p: 0.5,
  })

  if (content === '') {
    info('Possible Error: Translation result is empty')
  }

  return content
}

export const translate = async (
  text: string,
  targetLanguage: string,
  maxToken = 2000,
  splitter = `\n\n`,
): Promise<string> => {
  // TODO: Improve prompt (trusting user input currently)
  const prompt = `Please translate the given text into ${targetLanguage} and output it in markdown format.`

  let translated = ''
  let chunk = ''

  info('Start translating...')
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
