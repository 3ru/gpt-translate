import { CoreMessage, generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createMistral } from '@ai-sdk/mistral'
import { createAzure } from '@ai-sdk/azure'
import { createCohere } from '@ai-sdk/cohere'
import { minimumTokens, modelTokens } from './models'
import { error, getInput, info } from '@actions/core'
import { getInputAsNumber } from './utils'
import { encode } from 'gpt-3-encoder'

const apiKey = getInput('apikey', { required: true })
const provider = getInput('provider', { required: true })
const basePath = getInput('basePath')

class AI {
  private readonly provider: any
  private readonly model: string
  private prompt: string
  private readonly systemPrompt?: string

  constructor(providerName: string, apiKey: string, basePath?: string) {
    this.provider = this.createProvider(providerName, apiKey, basePath)
    this.model = getInput('model', { required: true })
    this.prompt = getInput('prompt', { required: true })
    this.systemPrompt = getInput('systemPrompt')
  }

  private createProvider(
    providerName: string,
    apiKey: string,
    basePath?: string,
  ) {
    const providerInitializers = {
      openai: createOpenAI,
      azure: createAzure,
      anthropic: createAnthropic,
      google: createGoogleGenerativeAI,
      mistral: createMistral,
      cohere: createCohere,
    }

    const initializer = providerInitializers[providerName]
    if (!initializer) {
      throw new Error(`Provider ${providerName} is not supported.`)
    }

    const baseOptions = { apiKey }
    if (basePath) {
      baseOptions['baseURL'] = basePath
    }
    return initializer(baseOptions)
  }

  private async generateTextRequest(text: string): Promise<string> {
    const messages: CoreMessage[] = [
      { role: 'user', content: `${this.prompt}\n${text}` },
    ]
    if (this.systemPrompt) {
      messages.unshift({ role: 'system', content: this.systemPrompt })
    }

    const response = await generateText({
      model: this.provider(this.model),
      messages: messages,
      ...this.getProps(),
    }).catch((err) => {
      error(err)
      process.exit(1)
    })
    if (!response.text) {
      throw new Error('Error: Could not retrieve content from AI.')
    }

    return response.text
  }

  /**
   * Retrieve the parameters for generating text.
   * https://sdk.vercel.ai/docs/reference/ai-sdk-core/generate-text#parameters
   */
  private getProps() {
    return {
      topP: getInputAsNumber('top_p'),
      temperature: getInputAsNumber('temperature'),
      maxTokens: getInputAsNumber('max_tokens'),
      presencePenalty: getInputAsNumber('presence_penalty'),
      frequencyPenalty: getInputAsNumber('frequency_penalty'),
      seed: getInputAsNumber('seed'),
    }
  }

  public async translate(
    text: string,
    targetLanguage: string,
    targetFileExt: string,
    splitter = '\n\n',
  ): Promise<string> {
    const maxToken =
      (this.getProps().maxTokens || modelTokens[this.model] || minimumTokens) /
      2
    this.prompt = this.prompt
      .replaceAll('{targetLanguage}', targetLanguage)
      .replaceAll('{targetFileExt}', targetFileExt)

    let translated = ''
    let chunk = ''

    info(
      `${new Date().toLocaleString()} Start translating with ${this.model}...`,
    )
    const contentChunks = text.split(splitter)

    for (let i = 0; i < contentChunks.length; i++) {
      if (encode(chunk + contentChunks[i]).length > maxToken) {
        const translatedContent = await this.generateTextRequest(chunk)
        translated += translatedContent + splitter
        chunk = ''
      }
      chunk += contentChunks[i] + (i < contentChunks.length - 1 ? splitter : '')
    }

    translated += await this.generateTextRequest(chunk)
    info('Translation completed!')

    return translated
  }
}

const translator = new AI(provider, apiKey, basePath)
export default translator
