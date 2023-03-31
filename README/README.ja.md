# 🌎 Markdown Translation BOT
[![Maintainability](https://api.codeclimate.com/v1/badges/a13ea4f37913ba6ba570/maintainability)](https://codeclimate.com/github/3ru/gpt-translate/maintainability)
[![GPT Translate](https://github.com/3ru/gpt-translate/actions/workflows/gpt-translate.yml/badge.svg)](https://github.com/3ru/gpt-translate/actions/workflows/gpt-translate.yml)

このGitHubアクションは、GPT-3.5モデルを使用して、マークダウンファイルを複数の言語に翻訳します。

<br/>

> GPT-4によるこのREADMEの要約
> - これは、GPT-3.5を使用してマークダウンファイルを複数の言語に翻訳するGitHubアクションです。
> - 使用するには、問題またはプルリクエストで/gpt-translateまたは/gtのコメントを作成し、入力/出力ファイルパスとターゲット言語を指定します。
> - 翻訳されたファイルは、プルリクエスト（問題の場合）として作成されるか、既存のプルリクエストに新しいコミットとして追加されます（プルリクエストの場合）。

<br/>

<details><summary>🧐 現在の状況</summary>
<p>

- このアクションは、単一のマークダウンファイルの翻訳のみをサポートしています。

- コマンドは、リポジトリに書き込み権限を持つ個人によってのみ実行できます。

これらの制限により、信頼できないパーティーによるAPIの乱用を防止しています。

将来的には、ディレクトリごとの翻訳や複数の選択機能を実装することを検討しています。
</p>
</details> 

## 🔧 セットアップ

### リポジトリの設定

#### 1. 設定 > アクション > 一般

- `Read and write permissions`を有効にする
- `Allow GitHub Actions to create and approve pull requests`を有効にする
  ![permissions](https://user-images.githubusercontent.com/69892552/228692074-d8d009a8-9272-4023-97b1-3cbc637d5d84.jpg)

#### 2. 設定 > Secrets and variables > Actions

- APIキー(`OPENAI_API_KEY`)をシークレットに設定する
  ![secrets](https://user-images.githubusercontent.com/69892552/228692421-22d7db33-4e32-4f28-b166-45b4d3ce2b11.jpg)


### GitHub Actions Workflowの設定

#### 必須
- apiKeyとしてOPENAI_API_KEYを提供する。
- コメントが作成されたときにトリガーするように`on`を設定する(`types: [ created ]`)。
- 事前にチェックアウトする(`actions/checkout@v3`)。

#### 推奨（不必要な実行時間を最小限に抑えるため）
- コメントに/gpt-translateまたは/gtが含まれている場合にのみ実行するように設定する。

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
/gtは/gpt-translateの略記法として使用できます。

1.問題またはプルリクエストで/gpt-translateまたは/gtを含むコメントを作成します。

2.【問題の場合】翻訳されたファイルは**プルリクエスト**として作成されます。

2.【プルリクエストの場合】翻訳されたファイルは**新しいコミットとして既存のプルリクエストに追加**されます。

つまり、問題にコメントを続けると、新しいPRが継続的に作成されます。
PRにコメントを続けると、新しいコミットが継続的にそのPRに追加されます。

## 🌐 サポートされる言語
GPT-3.5によって解釈される任意の言語

## 📃 ライセンス
MIT License