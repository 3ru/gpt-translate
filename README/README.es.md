# 🌎 BOT de Traducción Markdown
[![Mantenibilidad](https://api.codeclimate.com/v1/badges/a13ea4f37913ba6ba570/mantenibilidad)](https://codeclimate.com/github/3ru/gpt-translate/mantenibilidad)
[![GPT Translate](https://github.com/3ru/gpt-translate/actions/workflows/gpt-translate.yml/badge.svg)](https://github.com/3ru/gpt-translate/actions/workflows/gpt-translate.yml)

[![OpenAI](https://img.shields.io/badge/-OpenAI-white?style=flat-square&logo=openai&logoColor=black)](https://openai.com/)
[![Azure](https://img.shields.io/badge/-Microsoft%20Azure-white?style=flat-square&logo=microsoftazure&color=0078D4)](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
[![Anthropic](https://img.shields.io/badge/-Anthropic-black?style=flat-square&logo=anthropic&logoColor=black&color=d4a27f)](https://www.anthropic.com/)
[![Perplexity](https://img.shields.io/badge/-Perplexity-black?style=flat-square&logo=perplexity&color=black)](https://docs.perplexity.ai/)
[![Google](https://img.shields.io/badge/-Google%20gemini-white?style=flat-square&logo=googlegemini&color=white)](https://ai.google/discover/generativeai/)
[![Groq](https://img.shields.io/badge/-Groq-black?style=flat-square&logoColor=black&color=F55036)](https://groq.com/)
[![Fireworks](https://img.shields.io/badge/-Fireworks%20AI-black?style=flat-square&color=631fee)](https://fireworks.ai/)
[![Mistral](https://img.shields.io/badge/-Mistral%20AI-black?style=flat-square&color=ff7000)](https://mistral.ai/)
[![Cohere](https://img.shields.io/badge/-Cohere-black?style=flat-square&color=39594c)](https://cohere.com/)


[English](/README.md) |
[简体中文](/README/README.zh-CN.md) |
[繁體中文](/README/README.zh-TW.md) |
[Español](/README/README.es.md) |
[हिंदी, हिन्दी](/README/README.hi.md) |
[한국어](/README/README.ko.md) |
[日本語](/README/README.ja.md)

Esta acción de GitHub traduce tus archivos markdown a múltiples idiomas utilizando varios modelos de IA.

> [!Important]  
> Ahora Disponible: **Modelos de IA de Múltiples Proveedores✨**  \
> Nos hemos expandido más allá de OpenAI para soportar varios proveedores de modelos de IA.  \
> Para una lista completa de [proveedores soportados](https://g-t.vercel.app/docs/references/supported-model-provider) e información detallada, por favor consulta nuestras [notas de lanzamiento](https://github.com/3ru/gpt-translate/releases/tag/v1.2.0-beta).

<br/>

<details><summary>🧐 Estado Actual</summary>
<p>

- La acción soporta traducir **archivos markdown(`.md`), markdown-jsx(`.mdx`), json(`.json`) únicamente**.

- El comando puede ser ejecutado exclusivamente por individuos con **permisos de escritura en el repositorio**.

Estas limitaciones previenen el abuso de la API por parte de terceros no confiables.

</p>
</details> 

## 🔧 Configuración

### Configuración del Repositorio

#### 1. Configuración > Acciones > General

- Habilitar `Permisos de lectura y escritura`
- Habilitar `Permitir que las Acciones de GitHub creen y aprueben solicitudes de extracción`
  ![permisos](https://user-images.githubusercontent.com/69892552/228692074-d8d009a8-9272-4023-97b1-3cbc637d5d84.jpg)

#### 2. Configuración > Secretos y variables > Acciones

- Configura [tu clave API](https://platform.openai.com/account/api-keys)(`OPENAI_API_KEY`) en secretos
  ![secretos](https://user-images.githubusercontent.com/69892552/228692421-22d7db33-4e32-4f28-b166-45b4d3ce2b11.jpg)


### Configuración del Flujo de Trabajo de GitHub Actions

#### Requerido
- Proporciona la OPENAI_API_KEY como apiKey.
- Configura `on` para que se active cuando se cree un comentario (`types: [ created ]`).
- Realiza el checkout por adelantado (`actions/checkout@v3`).

#### Recomendado (Para minimizar el tiempo de ejecución innecesario)
- Configura para que se ejecute solo cuando `/gpt-translate` o `/gt` esté presente en el comentario.


👇 Aquí tienes un ejemplo mínimo de flujo de trabajo:
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


## 💡 Uso

```
/gpt-translate [ruta del archivo de entrada] [ruta del archivo de salida] [idioma objetivo] 
```
Puedes usar /gt como una abreviatura de /gpt-translate.

1. Crea un comentario con `/gpt-translate` o `/gt` en un issue o pull request.

2. 【En issue】Los archivos traducidos se crearán como una **solicitud de extracción**.

2. 【En pull request】Los archivos traducidos se **agregarán al pull request con un nuevo commit**.

En otras palabras, si sigues comentando en un issue, se crearán nuevas PRs continuamente.
Si sigues comentando en un PR, se agregarán nuevos commits continuamente a ese PR.

## 📝 Ejemplo
```
/gpt-translate README.md zh-TW/README.md traditional-chinese
```
Traduce `README.md` al chino tradicional y colócalo en el directorio `zh-TW`.

### Soporte para múltiples archivos

Puedes traducir múltiples archivos a la vez especificando un comodín en la ruta del archivo de entrada.

Aquí tienes un ejemplo
```
/gpt-translate *.md *.ja.md Japanese
```
Si `A.md` y `B.md` están en el directorio raíz, la salida será `A.ja.md` y `B.ja.md`. Los nombres de los archivos se heredan de los archivos de entrada.
Estoy considerando la posibilidad de generar el archivo con un nombre arbitrario, pero si tienes una idea inteligente, por favor sugiérela a través del issue.

Para más información, por favor consulta el [sitio web](https://g-t.vercel.app/docs/references/path-builder)

## 🌐 Idiomas Soportados
**Cualquier idioma** interpretado por GPT-4 o GPT-3.5

## 🏘️ Comunidad
- [Discusiones](https://github.com/3ru/gpt-translate/discussions)
  - Si tienes alguna pregunta, no dudes en preguntar en las discusiones de GitHub :)
- [Issues](https://github.com/3ru/gpt-translate/issues)
  - Por favor, envía errores y nuevas sugerencias de características a GitHub Issues

## 📃 Licencia
Licencia MIT