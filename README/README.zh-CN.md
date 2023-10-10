# 🌎 Markdown 翻译机器人
[![可维护性](https://api.codeclimate.com/v1/badges/a13ea4f37913ba6ba570/maintainability)](https://codeclimate.com/github/3ru/gpt-translate/maintainability)
[![GPT 翻译](https://github.com/3ru/gpt-translate/actions/workflows/gpt-translate.yml/badge.svg)](https://github.com/3ru/gpt-translate/actions/workflows/gpt-translate.yml)

这个 GitHub 动作使用 GPT-4，GPT-3.5 模型将你的 markdown 文件翻译成多种语言。

### ⚠️**警告**
OpenAI API 目前不是免费的。你需要一个`付费账户`发出的 API 密钥来使用这个工作流程。  
<img width="387" alt="image" src="https://github.com/3ru/gpt-translate/assets/69892552/8c803edb-85ef-41ee-a4be-be52b3a30eba">

<br/>

<details><summary>🧐 当前状态</summary>
<p>

- 该动作支持翻译 **markdown(`.md`) 和 markdown-jsx(`.mdx`) 文件**。

- 命令只能由具有**对仓库有写权限的个人**执行。

这些限制防止了非信任方的 API 滥用。

</p>
</details> 

## 🔧 设置

### 仓库设置

#### 1. 设置 > 动作 > 通用

- 启用 `读写权限`
- 启用 `允许 GitHub Actions 创建和批准拉取请求`
  ![权限](https://user-images.githubusercontent.com/69892552/228692074-d8d009a8-9272-4023-97b1-3cbc637d5d84.jpg)

#### 2. 设置 > 密钥和变量 > 动作

- 将[你的 API 密钥](https://platform.openai.com/account/api-keys)(`OPENAI_API_KEY`)设置为秘密
  ![秘密](https://user-images.githubusercontent.com/69892552/228692421-22d7db33-4e32-4f28-b166-45b4d3ce2b11.jpg)


### GitHub Actions 工作流程设置

#### 必需的
- 提供 OPENAI_API_KEY 作为 apiKey。
- 设置 `on` 在创建评论时触发 (`types: [ created ]`)。
- 提前检出(`actions/checkout@v3`)。

#### 推荐的 (为了最小化不必要的运行时间)
- 配置只有在评论中存在 `/gpt-translate` 或 `/gt` 时才运行。


👇 这是一个最小的工作流程示例：
```yaml
# .github/workflows/gpt-translate.yml
name: GPT 翻译

on:
  issue_comment:
    types: [ created ]

jobs:
  gpt_translate:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: 运行 GPT 翻译
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

1.在问题或拉取请求中创建一个带有 `/gpt-translate` 或 `/gt` 的评论。

2.【在问题上】翻译后的文件将作为一个**拉取请求**创建。

2.【在拉取请求上】翻译后的文件将**以新的提交添加到拉取请求中**。

换句话说，如果你在一个问题上不断评论，新的 PR 将不断被创建。
如果你在一个 PR 上不断评论，新的提交将不断被添加到那个 PR 中。

## 📝 示例
```
/gpt-translate README.md zh-TW/README.md traditional-chinese
```
将 `README.md` 翻译成繁体中文，并将其放在 `zh-TW` 目录下。

### 支持多文件

你可以通过在输入文件路径中指定通配符一次翻译多个文件。

这是一个样本
```
/gpt-translate *.md *.ja.md Japanese
```
如果 `A.md` 和 `B.md` 在根目录中，输出将是 `A.ja.md` 和 `B.ja.md`。文件名继承自输入文件。
我正在考虑用任意文件名输出文件，但如果你有聪明的想法，请通过问题提出建议！

更多信息，请参考[网站](https://g-t.vercel.app/docs/references/path-builder)

## 🌐 支持的语言
任何被 GPT-4 或 GPT-3.5 解释的语言

## 🏘️ 社区
- [讨论](https://github.com/3ru/gpt-translate/discussions)
  - 如果你有任何问题，请随时在 GitHub Discussions 中提问 :)
- [问题](https://github.com/3ru/gpt-translate/issues)
  - 请将错误和新功能建议提交给 GitHub Issues

## 📃 许可证
MIT 许可证