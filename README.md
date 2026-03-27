# ReceitasBR

Catálogo estático de receitas brasileiras com visual editorial, busca sem acento, filtros combinados e modal acessível com ingredientes e modo de preparo.

## Destaques

- Interface em HTML, CSS e JavaScript puros, sem build step obrigatório.
- Catálogo com 26 receitas brasileiras e metadados normalizados.
- Busca por nome, categoria, origem, tags, ingredientes e instruções.
- Filtros combinados por categoria, tag/origem e ordenação.
- Modal acessível com navegação por teclado, foco controlado e fechamento por `Esc`.
- Conjunto de imagens locais revisadas para os pratos mais sensíveis da curadoria visual.
- Smoke test com Playwright cobrindo carregamento, filtros, busca e modal.

## Estrutura

```text
.
|-- assets/
|   `-- images/
|-- src/
|   |-- data/
|   |   `-- receitas.js
|   |-- scripts/
|   |   |-- filters.js
|   |   |-- main.js
|   |   |-- modal.js
|   |   |-- render-grid.js
|   |   |-- state.js
|   |   `-- utils.js
|   `-- styles/
|       `-- main.css
|-- tests/
|   `-- smoke.spec.js
|-- tools/
|   `-- dev-server.js
|-- index.html
|-- package.json
`-- playwright.config.js
```

## Como rodar

Instale as dependências:

```bash
npm install
```

Suba o servidor local:

```bash
npm run serve
```

Abra no navegador:

```text
http://127.0.0.1:4173
```

## Testes

Execute o smoke test:

```bash
npm run test:smoke
```

## Notas

- O projeto foi organizado para manter a raiz mais limpa e separar dados, scripts de interface, estilos e ferramentas.
- As imagens do catálogo misturam arquivos locais revisados com referências externas estáveis quando apropriado.
