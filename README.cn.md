# 🌎 Markdown 翻译机器人
[![Maintainability](https://api.codeclimate.com/v1/badges/a13ea4f37913ba6ba570/maintainability)](https://codeclimate.com/github/3ru/gpt-translate/maintainability)
[![GPT Translate](https://github.com/3ru/gpt-translate/actions/workflows/gpt-translate.yml/badge.svg)](https://github.com/3ru/gpt-translate/actions/workflows/gpt-translate.yml)

这个 GitHub Action 使用 GPT-3.5 模型将你的 markdown 文件翻译成多种语言。

### ⚠️**警告**
OpenAI API 目前不提供免费使用。你需要一个由“付费账户”发行的 API 密钥才能使用这个工作流。
<img width="387" alt="image" src="https://github.com/3ru/gpt-translate/assets/69892552/8c803edb-85ef-41ee-a4be-be52b3a30eba">

<br/>

<details><summary> GPT-4 的 README 摘要</summary>
<p>
> - 这是一个 GitHub Action，使用 GPT-3.5 将 markdown 文件翻译成多种语言。
> - 要使用，创建一个包含输入/输出文件路径和目标语言的 issue 或 pull request 中的注释，并使用 /gpt-translate 或 /gt 命令。
> - 翻译后的文件将作为 pull request（在 issues 上）或作为新提交添加到现有 pull request 中（在 pull requests 上）。
</p>
</details> 

<details><summary>🧐 当前状态</summary>
<p>

- 该操作仅支持翻译单个 markdown 文件。

- 该命令只能由具有仓库写入权限的个人执行。

这些限制可以防止非受信任的人滥用 API。

我正在考虑将来实现每个目录的翻译和多选功能。
</p>
</details> 

## 🔧 设置

### 仓库设置

#### 1. 设置 > 操作 > 通用

- 启用“读写权限”
- 启用“允许 GitHub Actions 创建和批准 pull request”
  ![permissions](https://user-images.githubusercontent.com/69892552/228692074-d8d009a8-9272-4023-97b1-3cbc637d5d84.jpg)

#### 2. 设置 > 密钥和变量 > 操作

- 将 [你的 API 密钥](https://platform.openai.com/account/api-keys)（`OPENAI_API_KEY`）设置为 secrets
  ![secrets](https://user-images.githubusercontent.com/69892552/228692421-22d7db33-4e32-4f28-b166-45b4d3ce2b11.jpg)


### GitHub Actions 工作流设置

#### 必需的
- 将 OPENAI_API_KEY 设置为 apiKey。
- 设置 `on` 以在创建评论时触发 (`types: [ created ]`)。
- 预先检出 (`actions/checkout@v3`)。

#### 推荐的（为了最小化不必要的运行时间）
- 配置仅在评论中存在 `/gpt-translate` 或 `/gt` 时运行。

👇 这是一个最小的工作流示例：
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
      - uses: actions/checkout@v3

      - name: Run GPT Translate
        if: |
          contains(github.event.comment.body, '/gpt-translate') || 
          contains(github.event.comment.body, '/gt')
        uses: 3ru/gpt-translate@v1.0
        with:
          apikey: ${{ secrets.OPENAI_API_KEY }}
```


## 💡 用法

```
/gpt-translate [输入文件路径] [输出文件路径] [目标语言] 
```
你可以使用 /gt 作为 /gpt-translate 的缩写。

1.在 issue 或 pull request 中创建一个包含 `/gpt-translate` 或 `/gt` 的注释。

2.【在 issue 上】翻译后的文件将作为 **pull request** 创建。

2.【在 pull request 上】翻译后的文件将作为 **新提交** 添加到 pull request 中。

换句话说，如果你不断在 issue 上发表评论，将不断创建新的 PR。
如果你不断在 PR 上发表评论，将不断添加新的提交到该 PR 中。

## 📝 示例
```
/gpt-translate README.md zh-TW/README.md traditional-chinese
```
将 `README.md` 翻译成繁体中文，并将其放置在 `zh-TW` 目录下。

## 🌐 支持的语言
GPT-3.5 可以解释的任何语言。

## 📃 许可证
MIT 许可证