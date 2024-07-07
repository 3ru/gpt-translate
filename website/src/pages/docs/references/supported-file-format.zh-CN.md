---
title: 支持的文件格式
description: 可供翻译的文件格式列表
---

# 支持的文件格式

### Markdown `.md`

<details><summary>小技巧</summary><div>

长句子，比如一部没有任何换行的小说，很难分割成单独的翻译，可能会导致错误。如果您的文本包含大约80,000个连续字符（使用gpt-3.5时）而没有换行，请检查您的文本校对。

#### 示例

**✅️ 友好格式** (有换行)

```md filename="sample.md"
这是一个样本小说。

从前有一次...
```

**⚠️ 不友好格式**

```md filename="sample.md"
这是一个样本小说。
从前有一次...
从前有一次...
```

可以在[OpenAI官方工具](https://platform.openai.com/tokenizer)上测量令牌的数量。

</div></details>

### [MDX](https://mdxjs.com/) `.mdx`

MDX允许你在你的markdown内容中使用JSX。


### Json `.json`