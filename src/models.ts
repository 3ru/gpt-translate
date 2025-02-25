// Output Token limits for each model
export const minimumTokens = 4096

/**
 * OpenAI
 * https://platform.openai.com/docs/models
 *
 * Values are set based on Max output tokens from the latest documentation
 */
const openAIModels = {
  // GPT-4o models
  'gpt-4o': 16384,
  'gpt-4o-2024-11-20': 16384,
  'gpt-4o-2024-08-06': 16384,
  'gpt-4o-2024-05-13': 4096,
  'chatgpt-4o-latest': 16384,
  
  // GPT-4o mini models
  'gpt-4o-mini': 16384,
  'gpt-4o-mini-2024-07-18': 16384,
  
  // o1 and o1-mini models
  'o1': 100000,
  'o1-2024-12-17': 100000,
  'o1-mini': 65536,
  'o1-mini-2024-09-12': 65536,
  'o1-preview': 32768,
  'o1-preview-2024-09-12': 32768,
  
  // o3-mini models
  'o3-mini': 100000,
  'o3-mini-2025-01-31': 100000,
  
  // GPT-4o Realtime models
  'gpt-4o-realtime-preview': 4096,
  'gpt-4o-realtime-preview-2024-12-17': 4096,
  'gpt-4o-realtime-preview-2024-10-01': 4096,
  'gpt-4o-mini-realtime-preview': 4096,
  'gpt-4o-mini-realtime-preview-2024-12-17': 4096,
  
  // GPT-4o Audio models
  'gpt-4o-audio-preview': 16384,
  'gpt-4o-audio-preview-2024-12-17': 16384,
  'gpt-4o-audio-preview-2024-10-01': 16384,
  'gpt-4o-mini-audio-preview': 16384,
  'gpt-4o-mini-audio-preview-2024-12-17': 16384,
  
  // GPT-4 Turbo and GPT-4 models
  'gpt-4-turbo': 4096,
  'gpt-4-turbo-2024-04-09': 4096,
  'gpt-4-turbo-preview': 4096,
  'gpt-4-0125-preview': 4096,
  'gpt-4-1106-preview': 4096,
  'gpt-4': 8192,
  'gpt-4-0613': 8192,
  'gpt-4-0314': 8192,
  
  // GPT-3.5 Turbo models
  'gpt-3.5-turbo-0125': 4096,
  'gpt-3.5-turbo': 4096,
  'gpt-3.5-turbo-1106': 4096,
  'gpt-3.5-turbo-instruct': 4096,
}

/**
 * Groq (OpenAI Compatibility)
 * https://console.groq.com/docs/models
 *
 * Values are set based on Max Completion Tokens where available, otherwise half of Context Window
 */
const groqModels = {
  // Production Models
  'gemma2-9b-it': 4096,
  'llama-3.3-70b-versatile': 32768,
  'llama-3.1-8b-instant': 8192,
  'llama-guard-3-8b': 4096,
  'llama3-70b-8192': 4096,
  'llama3-8b-8192': 4096,
  'mixtral-8x7b-32768': 16384,
  
  // Preview Models
  'qwen-2.5-coder-32b': 64000,
  'qwen-2.5-32b': 64000,
  'deepseek-r1-distill-qwen-32b': 16384,
  'deepseek-r1-distill-llama-70b-specdec': 16384,
  'deepseek-r1-distill-llama-70b': 64000,
  'llama-3.3-70b-specdec': 4096,
  'llama-3.2-1b-preview': 8192,
  'llama-3.2-3b-preview': 8192,
  'llama-3.2-11b-vision-preview': 8192,
  'llama-3.2-90b-vision-preview': 8192,
  
}

/**
 * Perplexity
 * https://docs.perplexity.ai/guides/model-cards#supported-models
 *
 * Values are set based on max output token limits where available
 */
const perplexityModels = {
  // Current models
  'sonar-reasoning-pro': 8000,  // 128k context with 8k max output
  'sonar-reasoning': 8000,      // 128k context with assumed 8k max output
  'sonar-pro': 8000,            // 200k context with 8k max output
  'sonar': 8000,                // 128k context with assumed 8k max output
  'r1-1776': 8000,              // 128k context with assumed 8k max output
}

/**
 * Fireworks AI
 * https://fireworks.ai/models
 *
 * maxTokens = input + output
 */
// TODO: Update these values
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
 * Anthropic
 * https://docs.anthropic.com/en/docs/about-claude/models#model-names
 *
 * maxTokens = Max output
 */
const anthropicModels = {
  // Latest Models
  'claude-3-7-sonnet-20250219': 8192,  // Normal mode
  'claude-3-7-sonnet-latest': 8192,     // Alias for latest claude-3-7-sonnet
  'anthropic.claude-3-7-sonnet-20250219-v1:0': 8192,
  'claude-3-7-sonnet@20250219': 8192,
  
  // Extended thinking mode for Claude 3.7
  'claude-3-7-sonnet-20250219-extended': 64000,  // With extended thinking header
  
  // Claude 3.5 models
  'claude-3-5-sonnet-20241022': 8192,  // Latest v2
  'claude-3-5-sonnet-latest': 8192,     // Alias for latest claude-3-5-sonnet
  'anthropic.claude-3-5-sonnet-20241022-v2:0': 8192,
  'claude-3-5-sonnet-v2@20241022': 8192,
  
  'claude-3-5-sonnet-20240620': 8192,  // Previous version
  'anthropic.claude-3-5-sonnet-20240620-v1:0': 8192,
  'claude-3-5-sonnet-v1@20240620': 8192,
  
  'claude-3-5-haiku-20241022': 8192,
  'claude-3-5-haiku-latest': 8192,     // Alias for latest claude-3-5-haiku
  'anthropic.claude-3-5-haiku-20241022-v1:0': 8192,
  'claude-3-5-haiku@20241022': 8192,
  
  // Claude 3 models
  'claude-3-opus-20240229': 4096,
  'claude-3-opus-latest': 4096,        // Alias for latest claude-3-opus
  'anthropic.claude-3-opus-20240229-v1:0': 4096,
  'claude-3-opus@20240229': 4096,
  
  'claude-3-sonnet-20240229': 4096,
  'claude-3-sonnet-latest': 4096,      // Alias for latest claude-3-sonnet
  'anthropic.claude-3-sonnet-20240229-v1:0': 4096,
  'claude-3-sonnet@20240229': 4096,
  
  'claude-3-haiku-20240307': 4096,
  'claude-3-haiku-latest': 4096,       // Alias for latest claude-3-haiku
  'anthropic.claude-3-haiku-20240307-v1:0': 4096,
  'claude-3-haiku@20240307': 4096,
  
  // Special case - Claude 3.7 with 128k output beta header
  'claude-3-7-sonnet-20250219-128k': 128000  // With output-128k-2025-02-19 beta header
}

/**
 * Google Generative AI
 * https://ai.google.dev/gemini-api/docs/models/gemini
 *
 * maxTokens = Output token limit
 */
const googleVertexModels = {
  // Gemini 2.0 models
  'models/gemini-2.0-flash-latest': 8192,
  'models/gemini-2.0-flash': 8192,
  
  // Gemini 2.0 Flash-Lite Preview
  'models/gemini-2.0-flash-lite-preview-02-05': 8192,
  
  // Gemini 1.5 models
  'models/gemini-1.5-flash-latest': 8192,
  'models/gemini-1.5-flash': 8192,
  'models/gemini-1.5-flash-8b': 8192,
  
  'models/gemini-1.5-pro-latest': 8192,
  'models/gemini-1.5-pro': 8192,
}

/**
 * Mistral AI
 * https://docs.mistral.ai/getting-started/models/
 *
 * maxTokens = input + output
 */
const mistralModels = {
  // Premier models
  'mistral-large-latest': 65536,        // Currently points to mistral-large-2411 (131K context)
  'mistral-large-2411': 65536,          // Latest version (131K context)
  'mistral-small-latest': 16000,        // Currently points to mistral-small-2501 (32K context)
  'mistral-small-2501': 16000,          // Latest version (32K context)
  'mistral-saba-latest': 16000,         // Currently points to mistral-saba-2502 (32K context)
  'mistral-saba-2502': 16000,           // Middle East and South Asia languages (32K context)
  'codestral-latest': 128000,           // Currently points to codestral-2501 (256K context)
  'codestral-2501': 128000,             // Latest version (256K context)
  'ministral-3b-latest': 65536,         // Currently points to ministral-3b-2410 (131K context)
  'ministral-3b-2410': 65536,           // Edge model (131K context)
  'ministral-8b-latest': 65536,         // Currently points to ministral-8b-2410 (131K context)
  'ministral-8b-2410': 65536,           // Powerful edge model (131K context)
  
  // Free models
  'open-mistral-nemo': 65536,           // Multilingual model (131K context)
  
  // Legacy models (will be retired on 2025/03/30)
  'open-mistral-7b': 16000,             // (32K context)
  'open-mixtral-8x7b': 16000,           // (32K context)
  'open-mixtral-8x22b': 32000,          // (64K context)
  'mistral-medium-2312': 16000,         // (32K context)
  'mistral-small-2402': 16000,          // (32K context)
  'mistral-large-2402': 16000,          // (32K context)
  'mistral-large-2407': 65536,          // (131K context)
  'codestral-2405': 16000               // (32K context)
}

/**
 * Cohere
 * https://docs.cohere.com/docs/models
 *
 * maxTokens = MAXIMUM OUTPUT TOKENS
 */
const cohereModels = {
  // Latest Command models
  'command-r7b-12-2024': 4000,        // Small, fast December 2024 update
  'command-r-plus-08-2024': 4000,     // August 2024 update
  'command-r-plus-04-2024': 4000,     // April 2024 version
  'command-r-plus': 4000,             // Alias for command-r-plus-04-2024
  'command-r-08-2024': 4000,          // August 2024 update
  'command-r-03-2024': 4000,          // March 2024 version
  'command-r': 4000,                  // Alias for command-r-03-2024
  'command': 4000,                    // Original Command model
  'command-nightly': 4000,            // Experimental version (128K context)
  'command-light': 4000,              // Smaller, faster version
  'command-light-nightly': 4000,      // Experimental smaller version
  
  // Multilingual models (good for translation)
  'c4ai-aya-expanse-8b': 4000,        // 8B multilingual model (23 languages)
  'c4ai-aya-expanse-32b': 4000,       // 32B multilingual model (23 languages)
  
  // Platform-specific IDs
  'cohere.command-r-plus-v1:0': 4000, // Amazon Bedrock ID
  'cohere.command-r-v1:0': 4000,      // Amazon Bedrock ID
  'cohere.command-text-v14': 4000,    // Amazon Bedrock ID
  'cohere.command-light-text-v14': 4000 // Amazon Bedrock ID
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
