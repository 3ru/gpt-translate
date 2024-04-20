// File extensions for translation
export const availableFileExtensions = ['.md', '.mdx', '.json']

// Token limits for each model
// https://platform.openai.com/docs/models
export const minimumTokens = 4096
export const modelTokens = {
  'gpt-3.5-turbo-0125': 16385,
  'gpt-3.5-turbo': 16385,
  'gpt-3.5-turbo-1106': 16385,
  'gpt-3.5-turbo-instruct': 4096,
  'gpt-3.5-turbo-16k': 16385,
  'gpt-3.5-turbo-0613': 4096,
  'gpt-3.5-turbo-16k-0613': 16385,
  'gpt-4-turbo': 128000,
  'gpt-4-turbo-2024-04-09': 128000,
  'gpt-4-turbo-preview': 128000,
  'gpt-4-0125-preview': 128000,
  'gpt-4-1106-preview': 128000,
  'gpt-4-vision-preview': 128000,
  'gpt-4-1106-vision-preview': 128000,
  'gpt-4': 8192,
  'gpt-4-0613': 8192,
  'gpt-4-32k': 32768,
  'gpt-4-32k-0613': 32768,
}
