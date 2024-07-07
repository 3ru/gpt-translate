// Output Token limits for each model
export const minimumTokens = 4096

/**
 * OpenAI
 * https://platform.openai.com/docs/models
 *
 * maxTokens = input + output https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/chatgpt?tabs=python-new#manage-conversations
 */
const openAIModels = {
  'gpt-3.5-turbo-0125': 16385 / 2,
  'gpt-3.5-turbo': 16385 / 2,
  'gpt-3.5-turbo-1106': 16385 / 2,
  'gpt-3.5-turbo-instruct': 4096 / 2,
  'gpt-3.5-turbo-16k': 16385 / 2,
  'gpt-3.5-turbo-0613': 4096 / 2,
  'gpt-3.5-turbo-16k-0613': 16385 / 2,
  'gpt-4o': 128000 / 2,
  'gpt-4-turbo': 128000 / 2,
  'gpt-4-turbo-2024-04-09': 128000 / 2,
  'gpt-4-turbo-preview': 128000 / 2,
  'gpt-4-0125-preview': 128000 / 2,
  'gpt-4-1106-preview': 128000 / 2,
  'gpt-4-vision-preview': 128000 / 2,
  'gpt-4-1106-vision-preview': 128000 / 2,
  'gpt-4': 8192 / 2,
  'gpt-4-0613': 8192 / 2,
  'gpt-4-32k': 32768 / 2,
  'gpt-4-32k-0613': 32768 / 2,
}

/**
 * Groq (OpenAI Compatibility)
 * https://console.groq.com/docs/models
 *
 * maxTokens = input + output
 */
const groqModels = {
  'llama3-8b-8192': 8192 / 2,
  'llama3-70b-8192': 8192 / 2,
  'mixtral-8x7b-32768': 32768 / 2,
  'gemma-7b-it': 8192 / 2,
}

/**
 * Perplexity
 * https://docs.perplexity.ai/docs/model-cards
 *
 * maxTokens = input + output
 */
const perplexityModels = {
  'llama-3-sonar-small-32k-chat': 32768 / 2,
  'llama-3-sonar-small-32k-online': 28000 / 2,
  'llama-3-sonar-large-32k-chat': 32768 / 2,
  'llama-3-sonar-large-32k-online': 28000 / 2,

  'llama-3-8b-instruct': 8192 / 2,
  'llama-3-70b-instruct': 8192 / 2,
  'mixtral-8x7b-instruct': 16384 / 2,
}

/**
 * Fireworks AI
 * https://fireworks.ai/models
 *
 * maxTokens = input + output
 */
const fireworksModels = {
  'accounts/fireworks/models/firefunction-v2': 8192 / 2,
  'accounts/fireworks/models/firellava-13b': 4096 / 2,
  'accounts/fireworks/models/mixtral-8x7b-instruct': 32768 / 2,
  'accounts/fireworks/models/mixtral-8x22b-instruct': 65536 / 2,
  'accounts/fireworks/models/yi-large': 32768 / 2,
  'accounts/fireworks/models/llama-v3-70b-instruct': 8192 / 2,
  'accounts/fireworks/models/bleat-adapter': 4096 / 2,
  'accounts/fireworks/models/chinese-llama-2-lora-7b': 4096 / 2,
  'accounts/fireworks/models/chronos-hermes-13b-v2': 4096 / 2,
  'accounts/fireworks/models/codegemma-2b': 8192 / 2,
  'accounts/fireworks/models/code-llama-13b': 32768 / 2,
  'accounts/fireworks/models/code-llama-13b-instruct': 32768 / 2,
  'accounts/fireworks/models/code-llama-13b-python': 32768 / 2,
  'accounts/fireworks/models/code-llama-34b': 32768 / 2,
  'accounts/fireworks/models/code-llama-34b-instruct': 32768 / 2,
  'accounts/fireworks/models/code-llama-34b-python': 32768 / 2,
  'accounts/fireworks/models/code-llama-70b': 16384 / 2,
  'accounts/fireworks/models/code-llama-70b-instruct': 4096 / 2,
  'accounts/fireworks/models/code-llama-70b-python': 4096 / 2,
  'accounts/fireworks/models/code-llama-7b': 32768 / 2,
  'accounts/fireworks/models/code-llama-7b-instruct': 32768 / 2,
  'accounts/fireworks/models/code-llama-7b-python': 32768 / 2,
  'accounts/fireworks/models/code-qwen-1p5-7b': 65536 / 2,
  'accounts/fireworks/models/dbrx-instruct': 32768 / 2,
  'accounts/fireworks/models/deepseek-coder-1b-base': 16384 / 2,
  'accounts/fireworks/models/deepseek-coder-33b-instruct': 16384 / 2,
  'accounts/fireworks/models/deepseek-coder-7b-base': 16384 / 2,
  'accounts/fireworks/models/deepseek-coder-7b-base-v1p5': 4096 / 2,
  'accounts/fireworks/models/deepseek-coder-7b-instruct-v1p5': 4096 / 2,
  'accounts/fireworks/models/dolphin-2-9-2-qwen2-72b': 32768 / 2,
  'accounts/fireworks/models/dolphin-2p6-mixtral-8x7b': 32768 / 2,
  'accounts/fireworks/models/elyza-japanese-llama-2-7b-fast-instruct': 4096 / 2,
  'accounts/fireworks/models/firefunction-v1': 32768 / 2,
  'accounts/fireworks/models/gemma2-9b-it': 8192 / 2,
  'accounts/fireworks/models/gemma-7b': 8192 / 2,
  'accounts/fireworks/models/gemma-7b-it': 8192 / 2,
  'accounts/fireworks/models/hermes-2-pro-mistral-7b': minimumTokens / 2, // context unknown
  'accounts/fireworks/models/japanese-stablelm-instruct-beta-70b':
    minimumTokens / 2, // context unknown
  'accounts/fireworks/models/japanese-stablelm-instruct-gamma-7b':
    minimumTokens / 2, // context unknown
  'accounts/fireworks/models/japanese-stable-vlm-8b': 4096 / 2,
  'accounts/fireworks/models/llama-2-13b-fp16-french': 4096 / 2,
  'accounts/fireworks/models/llama-2-13b-guanaco-peft': 4096 / 2,
  'accounts/fireworks/models/llama2-7b-summarize': 4096 / 2,
  'accounts/fireworks/models/llama-guard-2-8b': 8192 / 2,
  'accounts/fireworks/models/llamaguard-7b': 4096 / 2,
  'accounts/fireworks/models/llama-v2-13b': 4096 / 2,
  'accounts/fireworks/models/llama-v2-13b-chat': 4096 / 2,
  'accounts/fireworks/models/llama-v2-70b-chat': 4096 / 2,
  'accounts/fireworks/models/llama-v2-7b': 4096 / 2,
  'accounts/fireworks/models/llama-v2-7b-chat': 4096 / 2,
  'accounts/fireworks/models/llama-v3-70b-instruct-hf': 8192 / 2,
  'accounts/fireworks/models/llama-v3-8b-hf': 8192 / 2,
  'accounts/fireworks/models/llama-v3-8b-instruct': 8192 / 2,
  'accounts/fireworks/models/llama-v3-8b-instruct-hf': 8192 / 2,
  'accounts/fireworks/models/llava-yi-34b': 4096 / 2,
  'accounts/fireworks/models/mistral-7b': 32768 / 2,
  'accounts/fireworks/models/mistral-7b-instruct-4k': 32768 / 2,
  'accounts/fireworks/models/mistral-7b-instruct-v0p2': 32768 / 2,
  'accounts/fireworks/models/mistral-7b-instruct-v3': 32768 / 2,
  'accounts/fireworks/models/mistral-7b-v0p2': 32768 / 2,
  'accounts/fireworks/models/mixtral-8x22b': 65536 / 2,
  'accounts/fireworks/models/mixtral-8x22b-hf': 65536 / 2,
  'accounts/fireworks/models/mixtral-8x22b-instruct-hf': 65536 / 2,
  'accounts/fireworks/models/mixtral-8x7b': 32768 / 2,
  'accounts/fireworks/models/mixtral-8x7b-instruct-hf': 32768 / 2,
  'accounts/fireworks/models/mythomax-l2-13b': 4096 / 2,
  'accounts/fireworks/models/nous-capybara-7b-v1p9': 32768 / 2,
  'accounts/fireworks/models/nous-hermes-2-mixtral-8x7b-dpo': 32768 / 2,
  'accounts/fireworks/models/nous-hermes-2-mixtral-8x7b-dpo-fp8': 32768 / 2,
  'accounts/fireworks/models/nous-hermes-2-yi-34b': 4096 / 2,
  'accounts/fireworks/models/nous-hermes-llama2-13b': 4096 / 2,
  'accounts/fireworks/models/nous-hermes-llama2-70b': 4096 / 2,
  'accounts/fireworks/models/nous-hermes-llama2-7b': 4096 / 2,
  'accounts/fireworks/models/openchat-3p5-0106-7b': 8192 / 2,
  'accounts/fireworks/models/openhermes-2-mistral-7b': 32768 / 2,
  'accounts/fireworks/models/openhermes-2p5-mistral-7b': 32768 / 2,
  'accounts/fireworks/models/openorca-7b': 32768 / 2,
  'accounts/fireworks/models/phi-2-3b': 2048 / 2,
  'accounts/fireworks/models/phi-3-mini-128k-instruct': minimumTokens / 2, // context unknown
  'accounts/fireworks/models/phi-3-vision-128k-instruct': 131072 / 2,
  'accounts/fireworks/models/phind-code-llama-34b-python-v1': 16384 / 2,
  'accounts/fireworks/models/phind-code-llama-34b-v1': 16384 / 2,
  'accounts/fireworks/models/phind-code-llama-34b-v2': 16384 / 2,
  'accounts/fireworks/models/pythia-12b': 2048 / 2,
  'accounts/fireworks/models/qwen-14b-chat': 8192 / 2,
  'accounts/fireworks/models/qwen1p5-72b-chat': 32768 / 2,
  'accounts/fireworks/models/qwen2-72b-instruct': 32768 / 2,
  'accounts/fireworks/models/qwen-72b-chat': 4096 / 2,
  'accounts/fireworks/models/snorkel-mistral-7b-pairrm-dpo': 32768 / 2,
  'accounts/fireworks/models/stablecode-3b': 16384 / 2,
  'accounts/fireworks/models/stablelm-2-zephyr-2b': 4096 / 2,
  'accounts/fireworks/models/stablelm-zephyr-3b': 4096 / 2,
  'accounts/fireworks/models/starcoder-16b': 8192 / 2,
  'accounts/fireworks/models/starcoder2-15b': 16384 / 2,
  'accounts/fireworks/models/starcoder2-3b': 16384 / 2,
  'accounts/fireworks/models/starcoder2-7b': 16384 / 2,
  'accounts/fireworks/models/starcoder-7b': 8192 / 2,
  'accounts/fireworks/models/toppy-m-7b': 32768 / 2,
  'accounts/fireworks/models/traditional-chinese-qlora-llama2': 4096 / 2,
  'accounts/fireworks/models/yi-34b': 4096 / 2,
  'accounts/fireworks/models/yi-34b-200k-capybara': 200000 / 2,
  'accounts/fireworks/models/yi-34b-chat': 4096 / 2,
  'accounts/fireworks/models/yi-6b': 4096 / 2,
  'accounts/01-ai/models/yi-large': 32768 / 2,
  'accounts/yi-01-ai/models/yi-large': 32768 / 2,
  'accounts/fireworks/models/zephyr-7b-beta': 4096 / 2,
}

/**
 * Anthropics
 * https://docs.anthropic.com/en/docs/about-claude/models#model-names
 *
 * maxTokens = Max output
 */
const anthropicModels = {
  'claude-3-5-sonnet-20240620': 4096,
  'anthropic.claude-3-5-sonnet-20240620-v1:0': 4096,
  'claude-3-5-sonnet@20240620': 4096,
  'claude-3-opus-20240229': 4096,
  'claude-3-sonnet-20240229': 4096,
  'claude-3-haiku-20240307': 4096,
  'anthropic.claude-3-opus-20240229-v1:0': 4096,
  'anthropic.claude-3-sonnet-20240229-v1:0': 4096,
  'anthropic.claude-3-haiku-20240307-v1:0': 4096,
  'claude-3-opus@20240229': 4096,
  'claude-3-sonnet@20240229': 4096,
  'claude-3-haiku@20240307': 4096,

  // Legacy models https://docs.anthropic.com/en/docs/about-claude/models#legacy-model-comparison
  'claude-2.1': 4096,
  'claude-2.0': 4096,
  'claude-instant-1.2': 4096,
}

/**
 * Google Generative AI
 * https://ai.google.dev/gemini-api/docs/models/gemini#model-variations
 *
 * maxTokens = Output token limit
 */
const googleVertexModels = {
  'models/gemini-1.5-flash-latest': 8192,
  'models/gemini-1.5-flash': 8192,

  'models/gemini-1.5-pro-latest': 8192,
  'models/gemini-1.5-pro': 8192,
  'models/gemini-1.0-pro': 8192,

  'models/gemini-pro-vision': 4096,
}

/**
 * Mistral AI
 * https://docs.mistral.ai/getting-started/models/
 *
 * maxTokens = input + output
 */
const mistralModels = {
  'open-mistral-7b': 32000 / 2,
  'open-mixtral-8x7b': 32000 / 2,
  'open-mixtral-8x22b': 64000 / 2,
  'mistral-small-latest': 32000 / 2,
  'mistral-medium-latest': 32000 / 2,
  'mistral-large-latest': 32000 / 2,
  'codestral-latest': 32000 / 2,
}

/**
 * Cohere
 * https://docs.cohere.com/docs/models
 *
 * maxTokens = MAXIMUM OUTPUT TOKENS
 */
const cohereModels = {
  'command-r-plus': 4000,
  'command-r': 4000,
  command: 4000,
  'command-nightly': 128000,
  'command-light': 4000,
  'command-light-nightly': 4000,
}

export const modelTokens = {
  ...openAIModels,
  ...groqModels,
  ...perplexityModels,
  ...fireworksModels,
  ...anthropicModels,
  ...googleVertexModels,
  ...mistralModels,
  ...cohereModels,
}
