# 🌎 Markdown 번역 봇
[![Maintainability](https://api.codeclimate.com/v1/badges/a13ea4f37913ba6ba570/maintainability)](https://codeclimate.com/github/3ru/gpt-translate/maintainability)
[![GPT Translate](https://github.com/3ru/gpt-translate/actions/workflows/gpt-translate.yml/badge.svg)](https://github.com/3ru/gpt-translate/actions/workflows/gpt-translate.yml)

[English](/README.md) |
[简体中文](/README/README.zh-CN.md) |
[繁體中文](/README/README.zh-TW.md) |
[Español](/README/README.es.md) |
[हिंदी, हिन्दी](/README/README.hi.md) |
[한국어](/README/README.ko.md) |
[日本語](/README/README.ja.md)

이 GitHub 액션은 GPT-4, GPT-3.5 모델을 사용하여 마크다운 파일을 여러 언어로 번역합니다.

> [!중요]  
> OpenAI API는 현재 무료로 제공되지 않습니다. 이 워크플로를 사용하려면 `유료 계정`으로 발급된 API 키가 필요합니다.  
> <img width="387" alt="image" src="https://github.com/3ru/gpt-translate/assets/69892552/8c803edb-85ef-41ee-a4be-be52b3a30eba">

<br/>

<details><summary>🧐 현재 상태</summary>
<p>

- 이 액션은 **마크다운(`.md`), 마크다운-jsx(`.mdx`), json(`.json`) 파일만** 번역을 지원합니다.

- 명령은 **저장소에 쓰기 권한이 있는 개인**만 실행할 수 있습니다.

이러한 제한은 신뢰할 수 없는 사용자가 API를 남용하는 것을 방지합니다.

</p>
</details> 

## 🔧 설정

### 저장소 설정

#### 1. 설정 > 액션 > 일반

- `읽기 및 쓰기 권한` 활성화
- `GitHub Actions가 풀 리퀘스트를 생성하고 승인할 수 있도록 허용` 활성화
  ![permissions](https://user-images.githubusercontent.com/69892552/228692074-d8d009a8-9272-4023-97b1-3cbc637d5d84.jpg)

#### 2. 설정 > 비밀 및 변수 > 액션

- [API 키](https://platform.openai.com/account/api-keys)(`OPENAI_API_KEY`)를 비밀로 설정
  ![secrets](https://user-images.githubusercontent.com/69892552/228692421-22d7db33-4e32-4f28-b166-45b4d3ce2b11.jpg)


### GitHub Actions 워크플로 설정

#### 필수
- OPENAI_API_KEY를 apiKey로 제공하십시오.
- 댓글이 생성될 때(`types: [ created ]`) 트리거되도록 `on`을 설정하십시오.
- 사전에 체크아웃(`actions/checkout@v3`)하십시오.

#### 권장 (불필요한 실행 시간을 최소화하기 위해)
- 댓글에 `/gpt-translate` 또는 `/gt`가 포함된 경우에만 실행되도록 설정하십시오.


👇 여기에 최소한의 워크플로 예제가 있습니다:
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


## 💡 사용법

```
/gpt-translate [입력 파일 경로] [출력 파일 경로] [대상 언어] 
```
/gpt-translate의 약어로 /gt를 사용할 수 있습니다.

1. 이슈나 풀 리퀘스트에 `/gpt-translate` 또는 `/gt`를 포함한 댓글을 작성하십시오.

2.【이슈에서】번역된 파일이 **풀 리퀘스트**로 생성됩니다.

2.【풀 리퀘스트에서】번역된 파일이 **새 커밋으로 풀 리퀘스트에 추가됩니다**.

즉, 이슈에 계속 댓글을 달면 새로운 PR이 계속 생성됩니다.
PR에 계속 댓글을 달면 새로운 커밋이 계속 PR에 추가됩니다.

## 📝 예제
```
/gpt-translate README.md zh-TW/README.md traditional-chinese
```
`README.md`를 번체 중국어로 번역하여 `zh-TW` 디렉토리에 배치합니다.

### 다중 파일 지원

입력 파일 경로에 와일드카드를 지정하여 여러 파일을 한 번에 번역할 수 있습니다.

다음은 샘플입니다:
```
/gpt-translate *.md *.ja.md Japanese
```
루트 디렉토리에 `A.md`와 `B.md`가 있는 경우 출력은 `A.ja.md`와 `B.ja.md`가 됩니다. 파일 이름은 입력 파일에서 상속됩니다.
임의의 파일 이름으로 파일을 출력하는 것을 고려 중이지만, 좋은 아이디어가 있다면 이슈를 통해 제안해 주세요!

자세한 내용은 [웹사이트](https://g-t.vercel.app/docs/references/path-builder)를 참조하십시오.

## 🌐 지원 언어
GPT-4 또는 GPT-3.5가 해석할 수 있는 **모든 언어**

## 🏘️ 커뮤니티
- [토론](https://github.com/3ru/gpt-translate/discussions)
  - 질문이 있으시면 GitHub 토론에서 자유롭게 질문해 주세요 :)
- [이슈](https://github.com/3ru/gpt-translate/issues)
  - 버그와 새로운 기능 제안은 GitHub 이슈에 제출해 주세요

## 📃 라이선스
MIT 라이선스