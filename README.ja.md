# 🌎 Markdown Translation BOT

このGitHubアクションは、GPT-3.5モデルを使用して、複数の言語にマークダウンファイルを翻訳します。

```md
# Summary of this README by GPT-4
- Markdown Translation BOT is a GitHub Action that uses GPT-3.5 to translate markdown files into multiple languages.
- To use, create a comment with /gpt-translate or /gt in an issue or pull request, specifying input/output file paths and target language.
- The translated files will be created as a pull request (on issues) or added to the existing pull request as a new commit (on pull requests).
```


<details><summary>🧐 現在の状況</summary>
<p>

- このアクションは、単一のマークダウンファイルの翻訳にのみ対応しています。

- コマンドは、リポジトリに書き込み権限を持つ個人のみが実行できます。

これらの制限により、信頼できない第三者によるAPIの乱用を防止しています。

将来的には、ディレクトリごとの翻訳や複数の選択機能を実装することを検討しています。
</p>
</details> 

## 🔧 セットアップ

### リポジトリの設定

#### 1. Settings > Actions > General

- `Read and write permissions`を有効にする
- `Allow GitHub Actions to create and approve pull requests`を有効にする
![permissions](https://user-images.githubusercontent.com/69892552/228692074-d8d009a8-9272-4023-97b1-3cbc637d5d84.jpg)

#### 2. Settings > Secrets and variables > Actions

- APIキー(`OPENAI_API_KEY`)をシークレットに設定する
![secrets](https://user-images.githubusercontent.com/69892552/228692421-22d7db33-4e32-4f28-b166-45b4d3ce2b11.jpg)


### GitHub Actions Workflow Settings

#### 必須
- apiKeyとしてOPENAI_API_KEYを提供する。
- コメントが作成されたときにトリガーするように`on`を設定する(`types: [ created ]`)。
- 事前にチェックアウトする(`actions/checkout@v3`)。

#### 推奨（不必要な実行時間を最小限に抑えるため）
- コメントに`/gpt-translate`または`/gt`が含まれている場合にのみ実行するように設定する。

👇 以下は最小限のワークフローの例です:
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


## 💡 使い方

```
/gpt-translate [input filepath] [output filepath] [target language] 
```
/gtは/gpt-translateの省略形として使用できます。

1. issueまたはpull requestで`/gpt-translate`または`/gt`を含むコメントを作成します。

2.【issueの場合】翻訳されたファイルは**pull request**として作成されます。

2.【pull requestの場合】翻訳されたファイルは**新しいコミットとして既存のpull requestに追加**されます。

つまり、issueにコメントを続けると、新しいPRが継続的に作成されます。
PRにコメントを続けると、新しいコミットが継続的にそのPRに追加されます。

## 📝 例
```
/gpt-translate README.md zh-TW/README.md traditional-chinese
```
`README.md`を繁体字中国語に翻訳し、`zh-TW`ディレクトリの下に配置します。

## 🌐 サポートされる言語
GPT-3.5によって解釈される任意の言語

## 📃 ライセンス
MIT License