---
title: Supported File Formats
Description: List of File Formats Available for Translation
---

# Supported File Formats

### Markdown `.md`

<details><summary>Trick</summary><div>

Long sentences, such as a novel with no line breaks at all, are difficult to split into separate translations and may cause errors. If your text contains approximately 80,000 consecutive characters (when using gpt-3.5) without line breaks, please review your text proofreading.

#### Example

**✅️ Friendly format** (have line break)

```md filename="sample.md"
This is a sample novel.

Once upon a time...
```

**⚠️ Unfriendly format**

```md filename="sample.md"
This is a sample novel.
Once upon a time...
Once upon a time...
```

The number of tokens can be measured on the [official OpenAI tool](https://platform.openai.com/tokenizer).

</div></details>

### [MDX](https://mdxjs.com/) `.mdx`

MDX allows you to use JSX in your markdown content.


### Json `.json`

