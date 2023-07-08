# 🌎 Markdown Translation BOT
[![Maintainability](https://api.codeclimate.com/v1/badges/a13ea4f37913ba6ba570/maintainability)](https://codeclimate.com/github/3ru/gpt-translate/maintainability)
[![GPT Translate](https://github.com/3ru/gpt-translate/actions/workflows/gpt-translate.yml/badge.svg)](https://github.com/3ru/gpt-translate/actions/workflows/gpt-translate.yml)

This GitHub action translates your markdown files into multiple languages using the GPT-3.5 model.

### ⚠️**Warning**
The OpenAI API is currently not available for free. You need an API Key issued with a `paid account` to use this workflow.  
<img width="387" alt="image" src="https://github.com/3ru/gpt-translate/assets/69892552/8c803edb-85ef-41ee-a4be-be52b3a30eba">

<br/>

<details><summary>🧐 Current Status</summary>
<p>

- The action supports translating **markdown files only**.

- The command can be executed exclusively by individuals with **write permissions to the repository**.

These limitations prevent API abuse by non-trusted parties.

</p>
</details> 

## 🔧 Setup

### Repository Settings

#### 1. Settings > Actions > General

- Enable `Read and write permissions`
- Enable `Allow GitHub Actions to create and approve pull requests`
  ![permissions](https://user-images.githubusercontent.com/69892552/228692074-d8d009a8-9272-4023-97b1-3cbc637d5d84.jpg)

#### 2. Settings > Secrets and variables > Actions

- Set [your API key](https://platform.openai.com/account/api-keys)(`OPENAI_API_KEY`) to secrets
  ![secrets](https://user-images.githubusercontent.com/69892552/228692421-22d7db33-4e32-4f28-b166-45b4d3ce2b11.jpg)


### GitHub Actions Workflow Settings

#### Required
- Provide the OPENAI_API_KEY as apiKey.
- Set `on` to trigger when a comment is created (`types: [ created ]`).
- Checkout in advance(`actions/checkout@v3`).

#### Recommended (To minimize unnecessary run time)
- Configure if to run only when `/gpt-translate` or `/gt` is present in the comment.


👇 Here is a minimal workflow example:
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
        uses: 3ru/gpt-translate@v1.1
        with:
          apikey: ${{ secrets.OPENAI_API_KEY }}
```


## 💡 Usage

```
/gpt-translate [input filepath] [output filepath] [target language] 
```
You can use /gt as a shorthand for /gpt-translate.

1.Create a comment with `/gpt-translate` or `/gt` in an issue or pull request.

2.【On issue】Translated files will be created as a **pull request**.

2.【On pull request】Translated files will be **added to the pull request with new commit**.

In other words, if you keep commenting on an issue, new PRs will continuously be created.
If you keep commenting on a PR, new commits will continuously be added to that PR.

## 📝 Example
```
/gpt-translate README.md zh-TW/README.md traditional-chinese
```
Translate `README.md` into traditional Chinese and place it under the `zh-TW` directory.

### v1.1 Multiple file support

You can now translate multiple files at once by specifying a wildcard in the input file path.

Here is a sample
```
/gpt-translate *.md *.ja.md Japanese
```
If `A.md` and `B.md` are in the root directory, the output will be `A.ja.md` and `B.ja.md`. The file names are inherited from the input files.
I am considering outputting the file with an arbitrary file name, but if you have a smart idea, please suggest it through the issue!

## 🌐 Supported Languages
Any language interpreted by GPT-3.5

## 🏘️ Community
- [Discussions](https://github.com/3ru/gpt-translate/discussions)
  - If you have any questions, please feel free to ask in the GitHub Discussions :)
- [Issues](https://github.com/3ru/gpt-translate/issues)
  - Please submit bugs and new feature suggestions to GitHub Issues

## 📃 License
MIT License
