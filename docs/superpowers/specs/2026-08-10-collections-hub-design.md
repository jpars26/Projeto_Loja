# Coleções como vitrine de escolha — Design

## Contexto

Hoje `/collections` renderiza `CollectionsPage` sem categoria, que internamente
usa `category = "noivas"` como default — ou seja, quem acessa `/collections`
já cai direto na grade de vestidos de noiva, com uma navegação por abas
(noivas/ternos/festa) no topo. Isso depende do usuário notar as abas (ou a
navbar) para descobrir as outras categorias.

Objetivo: transformar `/collections` numa página de descoberta — três grandes
cards (Vestidos de Noiva, Ternos, Vestidos de Festa) que funcionam como porta
de entrada visual, sem depender da navbar. As páginas de cada categoria
(`/collections/noivas`, `/collections/ternos`, `/collections/festa`) já
existem e continuam funcionando exatamente como hoje — só são acessadas a
partir dos cards em vez de abas.

## Decisão de rota (confirmada com o usuário)

`/collections` (sem categoria) passa a renderizar a nova vitrine de escolha em
vez de cair no default `noivas`. `/collections/:categoria` continua
inalterada. Nenhuma rota nova é criada — `CollectionSlugRouter` e `App.js` não
mudam.

## Arquitetura

- `CollectionsPage` (`src/pages/CollectionsPage.js`): quando `category` é
  `undefined` (rota bare `/collections`), renderiza `<CollectionsHub />` em
  vez do nav de abas + `ProductFilterBar` + `CollectionGrid`/`FilteredProductGrid`.
  Quando `category` é passado (via `CollectionSlugRouter`), comportamento
  idêntico ao atual.
- `CollectionsHub` (novo, `src/components/CollectionsHub.js`): seção com H1 +
  intro, e três cards clicáveis (`Link` inteiro, não só o CTA) apontando para
  `/collections/{slug}`.
- `collectionsHub` (novo, `src/data/collectionsHub.js`): dados de cada card —
  `slug`, `title`, `description`, `ctaLabel`, `image`, `imageAlt` — para
  centralizar textos/imagens e facilitar troca futura de imagem.

## Conteúdo dos cards

| Categoria | Título | Descrição | Imagem |
|---|---|---|---|
| noivas | Vestidos de Noiva | Para o seu grande dia. | Foto real (Alvor), já usada na home |
| ternos | Ternos | Elegância para momentos especiais. | Placeholder atual do catálogo (`foto-em-breve.svg`) — único asset disponível hoje; trocar em `collectionsHub.js` quando houver fotos reais |
| festa | Vestidos de Festa | Para celebrar ocasiões inesquecíveis. | Foto real (Madrinha), já usada no catálogo de festa |

CTA de todos: "Conheça a coleção →".

## Visual

Segue o sistema existente (nenhum padrão novo introduzido):
- Cantos retos, borda fina `border-hairline` (como `ProductCard`/`CollectionGrid`).
- Imagem grande `aspect-[4/5]`, `LazyLoadImage` com efeito blur.
- Linha de destaque fina no topo do card na cor da categoria
  (`border-noivas`/`border-ternos`/`border-festa`, já definidas no
  `tailwind.config.js`).
- Hover: zoom da imagem (`scale-105`, mesmo padrão do `CollectionGrid`),
  overlay gradiente escurecendo, seta do CTA deslocando levemente.
- Título (`font-display`), descrição e CTA sempre visíveis (não dependem de
  hover) — importante para acessibilidade e mobile/touch.
- `focus-visible:ring` no card inteiro para navegação por teclado.

## Responsivo

- Mobile e tablet: cards empilhados, largura total (respeitando padding da
  página), imagem continua grande o suficiente para reconhecer a categoria.
- Desktop (`lg:` / 1024px+): três cards lado a lado (`grid-cols-1 lg:grid-cols-3`).
- Tablet fica no layout empilhado (evita 3 cards espremidos ou um 2+1
  desequilibrado).

## Acessibilidade e SEO

- `alt` descritivo em cada imagem; título/descrição/CTA como texto real, não
  dependente de `:hover`.
- H1 único da página deixa claro que é a página de coleções da Iara Noivas;
  cada card usa `h2`.
- Novo bloco `Helmet` (title/description/og) específico para o estado hub,
  separado do `SEO_BY_CATEGORY` já existente por categoria.

## Fora de escopo

- Não altera `CollectionSlugRouter`, `CollectionId`, `App.js`, `Header`
  (navbar continua como está, funcionando em paralelo).
- Não adiciona dependências novas.
- Não mexe nos catálogos de produtos (`data/catalog/*`) além de importar uma
  imagem já existente de cada um.
