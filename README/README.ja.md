# 🌎 Markdown Translation BOT
[![Maintainability](https://api.codeclimate.com/v1/badges/a13ea4f37913ba6ba570/maintainability)](https://codeclimate.com/github/3ru/gpt-translate/maintainability)
[![GPT Translate](https://github.com/3ru/gpt-translate/actions/workflows/gpt-translate.yml/badge.svg)](https://github.com/3ru/gpt-translate/actions/workflows/gpt-translate.yml)

[English](/README.md) |
[简体中文](/README/README.zh-CN.md) |
[繁體中文](/README/README.zh-TW.md) |
[Español](/README.es.md) |
[हिंदी, हिन्दी](/README.hi.md) |
[한국어](/README.ko.md) |
[日本語](/README.ja.md)

このGitHubアクションは、GPT-4、GPT-3.5モデルを使用して、Markdownファイルを複数の言語に翻訳します。

> [!Important]  
> OpenAI APIは現在無料では利用できません。このワークフローを使用するには、`有料アカウント`で発行されたAPIキーが必要です。  
> <img width="387" alt="image" src="https://github.com/3ru/gpt-translate/assets/69892552/8c803edb-85ef-41ee-a4be-be52b3a30eba">

<br/>

<details><summary>🧐 現在のステータス</summary>
<p>

- このアクションは、**markdown(`.md`)、markdown-jsx(`.mdx`)、json(`.json`)ファイルのみ**を翻訳することができます。

- コマンドは、**リポジトリへの書き込み権限を持つ個人**のみが実行できます。

これらの制限により、信頼されていない第三者によるAPIの乱用を防ぎます。

</p>
</details> 

## 🔧 セットアップ

### リポジトリ設定

#### 1. 設定 > アクション > 一般

- `読み取りおよび書き込み権限`を有効にする
- `GitHub Actionsがプルリクエストを作成および承認できるようにする`を有効にする
  ![permissions](https://user-images.githubusercontent.com/69892552/228692074-d8d009a8-9272-4023-97b1-3cbc637d5d84.jpg)

#### 2. 設定 > シークレットと変数 > アクション

- [APIキー](https://platform.openai.com/account/api-keys)(`OPENAI_API_KEY`)をシークレットに設定する
  ![secrets](https://user-images.githubusercontent.com/69892552/228692421-22d7db33-4e32-4f28-b166-45b4d3ce2b11.jpg)


### GitHub Actions ワークフロー設定

#### 必須
- OPENAI_API_KEYをapiKeyとして提供する。
- コメントが作成されたときにトリガーされるように`on`を設定する（`types: [ created ]`）。
- 事前にチェックアウトする（`actions/checkout@v3`）。

#### 推奨（不要な実行時間を最小限に抑えるため）
- コメントに`/gpt-translate`または`/gt`が含まれている場合にのみ実行するように設定する。

👇 以下は最小限のワークフロー例です：
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
/gpt-translate [入力ファイルパス] [出力ファイルパス] [ターゲット言語] 
```
/gpt-translateの代わりに/gtを使用することもできます。

1. イシューまたはプルリクエストに`/gpt-translate`または`/gt`を含むコメントを作成します。

2.【イシューの場合】翻訳されたファイルは**プルリクエスト**として作成されます。

2.【プルリクエストの場合】翻訳されたファイルは**新しいコミットとしてプルリクエストに追加されます**。

つまり、イシューにコメントを続けると、新しいPRが継続的に作成されます。
プルリクエストにコメントを続けると、新しいコミットが継続的にそのPRに追加されます。

## 📝 例
```
/gpt-translate README.md zh-TW/README.md traditional-chinese
```
`README.md`を繁体字中国語に翻訳し、`zh-TW`ディレクトリに配置します。

### 複数ファイルのサポート

入力ファイルパスにワイルドカードを指定することで、複数のファイルを一度に翻訳することができます。

以下はサンプルです：
```
/gpt-translate *.md *.ja.md Japanese
```
ルートディレクトリに`A.md`と`B.md`がある場合、出力は`A.ja.md`と`B.ja.md`になります。ファイル名は入力ファイルから継承されます。
任意のファイル名で出力することを検討していますが、スマートなアイデアがあれば、イシューを通じて提案してください！

詳細については、[ウェブサイト](https://g-t.vercel.app/docs/references/path-builder)を参照してください。

## 🌐 サポートされている言語
GPT-4またはGPT-3.5によって解釈される**任意の言語**

## 🏘️ コミュニティ
- [ディスカッション](https://github.com/3ru/gpt-translate/discussions)
  - 質問がある場合は、GitHubディスカッションでお気軽にお尋ねください :)
- [イシュー](https://github.com/3ru/gpt-translate/issues)
  - バグや新機能の提案はGitHubイシューに提出してください

## 📃 ライセンス
MITライセンス