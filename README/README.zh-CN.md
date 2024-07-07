# 🌎 Markdown 翻译机器人
[![Maintainability](https://api.codeclimate.com/v1/badges/a13ea4f37913ba6ba570/maintainability)](https://codeclimate.com/github/3ru/gpt-translate/maintainability)
[![GPT Translate](https://github.com/3ru/gpt-translate/actions/workflows/gpt-translate.yml/badge.svg)](https://github.com/3ru/gpt-translate/actions/workflows/gpt-translate.yml)

[![OpenAI](https://img.shields.io/badge/-OpenAI-white?style=flat-square&logo=openai&logoColor=black)](https://openai.com/)
[![Azure](https://img.shields.io/badge/-Microsoft%20Azure-white?style=flat-square&logo=microsoftazure&color=0078D4)](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
[![Anthropic](https://img.shields.io/badge/-Anthropic-black?style=flat-square&logo=anthropic&logoColor=black&color=d4a27f)](https://www.anthropic.com/)
[![Perplexity](https://img.shields.io/badge/-Perplexity-black?style=flat-square&logo=perplexity&color=black)](https://docs.perplexity.ai/)
[![Google](https://img.shields.io/badge/-Google%20gemini-white?style=flat-square&logo=googlegemini&color=white)](https://ai.google/discover/generativeai/)
[![Groq](https://img.shields.io/badge/-Groq-black?style=flat-square&logoColor=black&color=F55036)](https://groq.com/)
[![Fireworks](https://img.shields.io/badge/-Fireworks%20AI-black?style=flat-square&color=631fee)](https://fireworks.ai/)
[![Mistral](https://img.shields.io/badge/-Mistral%20AI-black?style=flat-square&color=ff7000)](https://mistral.ai/)
[![Cohere](https://img.shields.io/badge/-Cohere-black?style=flat-square&color=39594c)](https://cohere.com/)

[English](/README.md) |
[简体中文](/README/README.zh-CN.md) |
[繁體中文](/README/README.zh-TW.md) |
[Español](/README/README.es.md) |
[हिंदी, हिन्दी](/README/README.hi.md) |
[한국어](/README/README.ko.md) |
[日本語](/README/README.ja.md)

这个 GitHub 动作使用多个 AI 模型将你的 markdown 文件翻译成多种语言。

> [!Important]
> 现已推出：**来自多个提供商的 AI 模型✨**  \
> 我们已扩展支持多种 AI 模型提供商，不再局限于 OpenAI。  \
> 有关支持的提供商的完整列表和详细信息，请参阅我们的[发布说明](https://github.com/3ru/gpt-translate/releases/tag/v1.2.0-beta)。

<br/>

<details><summary>🧐 当前状态</summary>
<p>

- 该动作仅支持翻译 **markdown(`.md`)、markdown-jsx(`.mdx`)、json(`.json`) 文件**。

- 该命令只能由具有 **仓库写权限** 的个人执行。

这些限制防止了非信任方滥用 API。

</p>
</details> 

## 🔧 设置

### 仓库设置

#### 1. 设置 > Actions > 常规

- 启用 `读写权限`
- 启用 `允许 GitHub Actions 创建和批准拉取请求`
  ![permissions](https://user-images.githubusercontent.com/69892552/228692074-d8d009a8-9272-4023-97b1-3cbc637d5d84.jpg)

#### 2. 设置 > Secrets 和变量 > Actions

- 将 [你的 API 密钥](https://platform.openai.com/account/api-keys)(`OPENAI_API_KEY`) 设置为密钥
  ![secrets](https://user-images.githubusercontent.com/69892552/228692421-22d7db33-4e32-4f28-b166-45b4d3ce2b11.jpg)

### GitHub Actions 工作流设置

#### 必需
- 提供 OPENAI_API_KEY 作为 apiKey。
- 设置 `on` 以在创建评论时触发（`types: [ created ]`）。
- 预先签出（`actions/checkout@v3`）。

#### 推荐（以最小化不必要的运行时间）
- 配置仅在评论中包含 `/gpt-translate` 或 `/gt` 时运行。

👇 下面是一个最小的工作流示例：
```yaml
# .github/workflows/gpt-translate.yml
name: GPT Translate

on:
  issue_comment:
    types: [ created ]

jobs:
  gpt_translate:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: 运行 GPT Translate
        if: |
          contains(github.event.comment.body, '/gpt-translate') || 
          contains(github.event.comment.body, '/gt')
        uses: 3ru/gpt-translate@master
        with:
          apikey: ${{ secrets.OPENAI_API_KEY }}
```

## 💡 使用方法

```
/gpt-translate [输入文件路径] [输出文件路径] [目标语言] 
```
你可以使用 /gt 作为 /gpt-translate 的简写。

1. 在问题或拉取请求中创建包含 `/gpt-translate` 或 `/gt` 的评论。

2.【在问题中】翻译后的文件将作为 **拉取请求** 创建。

2.【在拉取请求中】翻译后的文件将 **以新提交的形式添加到拉取请求中**。

换句话说，如果你不断在问题中评论，将会不断创建新的 PR。
如果你不断在 PR 中评论，将会不断向该 PR 添加新的提交。

## 📝 示例
```
/gpt-translate README.md zh-TW/README.md traditional-chinese
```
将 `README.md` 翻译成繁体中文并放置在 `zh-TW` 目录下。

### 多文件支持

你可以通过在输入文件路径中指定通配符一次翻译多个文件。

这是一个示例
```
/gpt-translate *.md *.ja.md Japanese
```
如果根目录中有 `A.md` 和 `B.md`，输出将是 `A.ja.md` 和 `B.ja.md`。文件名继承自输入文件。
我正在考虑以任意文件名输出文件，但如果你有聪明的想法，请通过问题提出建议！

有关更多信息，请参阅[网站](https://g-t.vercel.app/docs/references/path-builder)

## 🌐 支持的语言
**任何**由 GPT-4 或 GPT-3.5 解释的语言

## 🏘️ 社区
- [讨论](https://github.com/3ru/gpt-translate/discussions)
  - 如果你有任何问题，请随时在 GitHub 讨论中提问 :)
- [问题](https://github.com/3ru/gpt-translate/issues)
  - 请将错误和新功能建议提交到 GitHub 问题

## 📃 许可证
MIT 许可证