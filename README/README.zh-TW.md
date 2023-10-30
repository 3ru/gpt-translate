# 🌎 Markdown 翻譯機器人
[![可維護性](https://api.codeclimate.com/v1/badges/a13ea4f37913ba6ba570/maintainability)](https://codeclimate.com/github/3ru/gpt-translate/maintainability)
[![GPT 翻譯](https://github.com/3ru/gpt-translate/actions/workflows/gpt-translate.yml/badge.svg)](https://github.com/3ru/gpt-translate/actions/workflows/gpt-translate.yml)

這個 GitHub 操作可以使用 GPT-4，GPT-3.5 模型將您的 markdown 文件翻譯成多種語言。

### ⚠️**警告**
OpenAI API 目前不是免費的。您需要一個帶有 `付費帳戶` 的 API 密鑰才能使用此工作流程。  
<img width="387" alt="image" src="https://github.com/3ru/gpt-translate/assets/69892552/8c803edb-85ef-41ee-a4be-be52b3a30eba">

<br/>

<details><summary>🧐 當前狀態</summary>
<p>

- 此操作僅支援翻譯 **markdown(`.md`) 和 markdown-jsx(`.mdx`) 文件**。

- 命令只能由具有 **對存儲庫有寫權限的個人** 執行。

這些限制防止了非信任方濫用 API。

</p>
</details> 

## 🔧 設定

### 存儲庫設定

#### 1. 設定 > 操作 > 一般

- 啟用 `讀寫權限`
- 啟用 `允許 GitHub 操作創建和批准拉取請求`
  ![權限](https://user-images.githubusercontent.com/69892552/228692074-d8d009a8-9272-4023-97b1-3cbc637d5d84.jpg)

#### 2. 設定 > 秘密和變量 > 操作

- 將 [您的 API 密鑰](https://platform.openai.com/account/api-keys)(`OPENAI_API_KEY`) 設定為秘密
  ![秘密](https://user-images.githubusercontent.com/69892552/228692421-22d7db33-4e32-4f28-b166-45b4d3ce2b11.jpg)


### GitHub 操作工作流程設定

#### 必需
- 提供 OPENAI_API_KEY 作為 apiKey。
- 設定 `on` 以在創建評論時觸發 (`types: [ created ]`)。
- 提前進行簽出(`actions/checkout@v3`)。

#### 建議 (為了最小化不必要的運行時間)
- 配置只有在評論中存在 `/gpt-translate` 或 `/gt` 時才運行。


👇 以下是一個最小的工作流程範例：
```yaml
# .github/workflows/gpt-translate.yml
name: GPT 翻譯

on:
  issue_comment:
    types: [ created ]

jobs:
  gpt_translate:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: 運行 GPT 翻譯
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
您可以使用 /gt 作為 /gpt-translate 的縮寫。

1.在問題或拉取請求中創建一個帶有 `/gpt-translate` 或 `/gt` 的評論。

2.【在問題上】翻譯的文件將作為一個 **拉取請求** 創建。

2.【在拉取請求上】翻譯的文件將 **以新的提交添加到拉取請求中**。

換句話說，如果您在問題上不斷評論，將不斷創建新的 PR。
如果您在 PR 上不斷評論，新的提交將不斷添加到該 PR 中。

## 📝 範例
```
/gpt-translate README.md zh-TW/README.md traditional-chinese
```
將 `README.md` 翻譯成繁體中文並將其放在 `zh-TW` 目錄下。

### 支援多文件

您可以通過在輸入文件路徑中指定萬用字元一次翻譯多個文件。

以下是一個範例
```
/gpt-translate *.md *.ja.md Japanese
```
如果根目錄中有 `A.md` 和 `B.md`，則輸出將是 `A.ja.md` 和 `B.ja.md`。文件名繼承自輸入文件。
我正在考慮用任意文件名輸出文件，但如果您有聰明的想法，請通過問題提出建議！

有關更多信息，請參考 [網站](https://g-t.vercel.app/docs/references/path-builder)

## 🌐 支援的語言
任何由 GPT-4 或 GPT-3.5 解釋的語言

## 🏘️ 社區
- [討論](https://github.com/3ru/gpt-translate/discussions)
  - 如果您有任何問題，請隨時在 GitHub 討論中提問 :)
- [問題](https://github.com/3ru/gpt-translate/issues)
  - 請將錯誤和新功能建議提交到 GitHub 問題

## 📃 授權
MIT 授權