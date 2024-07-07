# 🌎 Markdown 翻譯機器人
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

這個 GitHub Action 使用多個 AI 模型將你的 Markdown 文件翻譯成多種語言。

> [!Important]
> 現在可用：**來自多個提供商的 AI 模型✨**  \
> 我們已經擴展到支持多個 AI 模型提供商。  \
> 有關支持的提供商的完整[列表](https://g-t.vercel.app/docs/references/supported-model-provider)和詳細信息，請參閱我們的[發佈說明](https://github.com/3ru/gpt-translate/releases/tag/v1.2.0-beta)。

<br/>

<details><summary>🧐 當前狀態</summary>
<p>

- 此 Action 僅支持翻譯 **markdown(`.md`)、markdown-jsx(`.mdx`)、json(`.json`) 文件**。

- 只有擁有 **倉庫寫入權限** 的人才能執行此命令。

這些限制防止了非信任方濫用 API。

</p>
</details> 

## 🔧 設置

### 倉庫設置

#### 1. 設置 > Actions > 一般

- 啟用 `讀取和寫入權限`
- 啟用 `允許 GitHub Actions 創建和批准拉取請求`
  ![permissions](https://user-images.githubusercontent.com/69892552/228692074-d8d009a8-9272-4023-97b1-3cbc637d5d84.jpg)

#### 2. 設置 > Secrets 和變量 > Actions

- 將 [你的 API 密鑰](https://platform.openai.com/account/api-keys)(`OPENAI_API_KEY`) 設置為 secrets
  ![secrets](https://user-images.githubusercontent.com/69892552/228692421-22d7db33-4e32-4f28-b166-45b4d3ce2b11.jpg)


### GitHub Actions 工作流程設置

#### 必需
- 提供 OPENAI_API_KEY 作為 apiKey。
- 設置 `on` 以在創建評論時觸發 (`types: [ created ]`)。
- 預先檢出(`actions/checkout@v3`)。

#### 推薦 (以最小化不必要的運行時間)
- 配置僅在評論中包含 `/gpt-translate` 或 `/gt` 時運行。


👇 這是一個最小的工作流程示例：
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

      - name: Run GPT Translate
        if: |
          contains(github.event.comment.body, '/gpt-translate') || 
          contains(github.event.comment.body, '/gt')
        uses: 3ru/gpt-translate@master
        with:
          apikey: ${{ secrets.OPENAI_API_KEY }}
```


## 💡 使用方法

```
/gpt-translate [輸入文件路徑] [輸出文件路徑] [目標語言] 
```
你可以使用 /gt 作為 /gpt-translate 的簡寫。

1. 在問題或拉取請求中創建一個包含 `/gpt-translate` 或 `/gt` 的評論。

2.【在問題中】翻譯後的文件將被創建為 **拉取請求**。

2.【在拉取請求中】翻譯後的文件將 **以新提交的形式添加到拉取請求中**。

換句話說，如果你不斷在問題中評論，新的 PR 將不斷被創建。
如果你不斷在 PR 中評論，新的提交將不斷被添加到該 PR 中。

## 📝 示例
```
/gpt-translate README.md zh-TW/README.md traditional-chinese
```
將 `README.md` 翻譯成繁體中文並放置在 `zh-TW` 目錄下。

### 多文件支持

你可以通過在輸入文件路徑中指定通配符來一次翻譯多個文件。

這裡有一個示例
```
/gpt-translate *.md *.ja.md Japanese
```
如果根目錄中有 `A.md` 和 `B.md`，輸出將是 `A.ja.md` 和 `B.ja.md`。文件名繼承自輸入文件。
我正在考慮以任意文件名輸出文件，但如果你有聰明的想法，請通過問題提出建議！

有關更多信息，請參閱[網站](https://g-t.vercel.app/docs/references/path-builder)

## 🌐 支持的語言
**任何**由 GPT-4 或 GPT-3.5 解釋的語言

## 🏘️ 社區
- [討論](https://github.com/3ru/gpt-translate/discussions)
  - 如果你有任何問題，請隨時在 GitHub 討論中提問 :)
- [問題](https://github.com/3ru/gpt-translate/issues)
  - 請將錯誤和新功能建議提交到 GitHub 問題

## 📃 許可證
MIT 許可證