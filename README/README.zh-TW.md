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

這個 GitHub Action 能透過多種 AI 模型，快速將你的 Markdown 文件翻譯成多種語言。

> [!Important]
> 新功能上線：**多家 AI 模型供應商✨**
> 我們不再僅限於 OpenAI，現已支援多家 AI 模型供應商。
> 如需查看完整的[支援供應商清單](https://g-t.vercel.app/docs/references/supported-model-provider)與詳細資訊，請參閱[版本發布說明](https://github.com/3ru/gpt-translate/releases/tag/v1.2.0-beta)。

<br/>

<details><summary>🧐 目前功能狀態</summary>
<p>

- 目前僅支援翻譯 **Markdown (`.md`)、Markdown-JSX (`.mdx`) 以及 JSON (`.json`) 檔案**。

- 僅限擁有**儲存庫寫入權限**的使用者可執行此命令。

這些限制是為了防止未經授權的使用者濫用 API。

</p>
</details>

## 🔧 設定方式

### 儲存庫設定

#### 1. Settings > Actions > General

- 啟用「`讀取與寫入權限`」
- 啟用「`允許 GitHub Actions 建立和核准 Pull Request`」
  ![permissions](https://user-images.githubusercontent.com/69892552/228692074-d8d009a8-9272-4023-97b1-3cbc637d5d84.jpg)

#### 2. Settings > Secrets and variables > Actions

- 將 [API 金鑰](https://platform.openai.com/account/api-keys) (`OPENAI_API_KEY`) 設定為 Secret
  ![secrets](https://user-images.githubusercontent.com/69892552/228692421-22d7db33-4e32-4f28-b166-45b4d3ce2b11.jpg)

### GitHub Actions 工作流程設定

#### 必要設定

- 提供 OPENAI_API_KEY 作為 apiKey
- 設定觸發條件 `on` 為建立評論時（`types: [ created ]`）
- 預先執行 checkout（`actions/checkout@v3`）

#### 建議設定（減少不必要的執行時間）

- 設定只在評論內容包含 `/gpt-translate` 或 `/gt` 時才執行

👇 以下是一個基本的工作流程範例：

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

## 💡 使用方式

```
/gpt-translate [來源檔案路徑] [目標檔案路徑] [目標語言]
```

你可以使用 `/gt` 作為 `/gpt-translate` 的命令縮寫。

1. 在 Issue 或 Pull Request 中建立一則包含 `/gpt-translate` 或 `/gt` 的留言。

2.【在 Issue 中】翻譯後的檔案會以 **Pull Request** 的形式建立。

3.【在 Pull Request 中】翻譯後的檔案會以**新的 Commit** 加入該 Pull Request。

換句話說，如果你在 Issue 中持續留言，系統會不斷建立新的 Pull Request；
如果你在 Pull Request 中持續留言，系統會不斷在該 Pull Request 中加入新的 Commit。

## 📝 範例

```
/gpt-translate README.md zh-TW/README.md traditional-chinese
```

將 `README.md` 翻譯成繁體中文，並存放在 `zh-TW` 目錄下。

### 多檔案支援

你可以在來源檔案路徑中使用萬用字元（wildcard），一次翻譯多個檔案。

範例：

```
/gpt-translate *.md *.ja.md Japanese
```

如果根目錄中有 `A.md` 和 `B.md`，輸出的檔案會是 `A.ja.md` 和 `B.ja.md`。檔案名稱會沿用來源檔案的名稱。
我們也正在考慮支援自訂輸出檔案名稱的功能，若你有任何建議，歡迎透過 Issue 提出！

更多詳細資訊，請參考[官方網站說明](https://g-t.vercel.app/docs/references/path-builder)。

## 🌐 支援語言

**所有 GPT-4 或 GPT-3.5 能理解的語言**

## 🏘️ 社群資源

- [討論區](https://github.com/3ru/gpt-translate/discussions)
  - 若有任何問題，歡迎到 GitHub 討論區發問 :)
- [Issue](https://github.com/3ru/gpt-translate/issues)
  - 錯誤回報或新功能建議，請提交至 GitHub Issue

## 📃 授權條款

MIT 授權
