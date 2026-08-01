# Prompt: Reformulação da Iara Noivas (base técnica + Ternos/Festa + modernização visual)

Copie o bloco abaixo e use como prompt no Claude Code (dentro da pasta `Projeto_Loja`).

---

Este é um e-commerce/vitrine em React para uma loja que hoje vende apenas vestidos de noiva ("Iara Noivas"). O código já tem um tempo e nunca passou por uma limpeza — quero três frentes de trabalho, nesta ordem, e preciso que você primeiro proponha um plano antes de mexer no código.

## 0. Modernização da base técnica (fazer primeiro, antes do resto)

Já auditei o projeto e encontrei problemas concretos que quero resolvidos antes de construir as novas features em cima:

- **Dependências mortas/duplicadas** em `frontend/package.json` — confirme com uma busca no código antes de remover, mas até onde levantei:
  - `react-joyride` e `intro.js` estão instalados mas não são importados em lugar nenhum; o guia de tour real usa `shepherd.js` (`frontend/src/utils/TourGuide.js`). Remover os dois não usados.
  - `swiper` está instalado mas não é usado; o carrossel real é `react-slick` + `slick-carousel` (`frontend/src/components/Sections.js`). Remover `swiper`.
  - Tanto `react-helmet` quanto `react-helmet-async` estão instalados; todo o SEO hoje usa `react-helmet` (não mantido, com problemas conhecidos em React 18+ concurrent rendering). Migre todos os usos (`AboutUs.js`, `CollectionsPage.js`, `HomePage.js`, `CollectionId.js`, `Contact.js`) para `react-helmet-async` (que exige envolver a árvore com `HelmetProvider`) e remova `react-helmet`.
- **Migrar de Create React App (`react-scripts`) para Vite.** CRA está descontinuado/arquivado oficialmente, o que está deixando `npm start`/build lentos. Faça a migração padrão (estrutura de `index.html` na raiz, `vite.config.js`, ajustar imports de env vars de `process.env.REACT_APP_*` para `import.meta.env.VITE_*`, adaptar o setup do Jest ou migrar os testes para Vitest — avalie e proponha). Mantenha o `firebase.json`/deploy funcionando ao final.
- **Adotar Tailwind CSS** no lugar do CSS solto por componente (hoje cada componente tem seu próprio `.css` em `frontend/src/css/`, sem tokens de design compartilhados). Configure o Tailwind, defina tokens (cores, tipografia, spacing) alinhados com a nova identidade visual do item 2 abaixo, e migre os componentes principais para classes utilitárias conforme forem sendo tocados — não precisa migrar tudo de uma vez, mas a partir de agora todo componente novo/redesenhado deve usar Tailwind.
- **Reestruturar o catálogo de produtos.** Hoje `frontend/src/data/collections.js` é um arquivo único e extenso com `require()` de imagem por produto, sem nenhum campo de categoria — isso é a raiz do problema do item 1 abaixo. Proponha uma estrutura mais sustentável (ex: um `catalog.js`/`catalog.json` por categoria, ou um índice central com campo `category`), já pensando em como isso vai crescer com Ternos e Vestidos de Festa.

## 1. Adicionar novas categorias: Ternos e Vestidos de Festa

Hoje o catálogo inteiro é implicitamente "vestido de noiva" (coleções como Alvor, Betola, Enlace, Jardim Secreto, Vitória, Origem). O componente `CollectionGrid.js` renderiza essa lista com texto fixo "Ver Vestidos" no botão, e `CollectionsPage.js`/`CollectionId.js` consomem os dados sem noção de categoria.

Quero o site com 3 categorias: **Noivas** (a atual), **Ternos** e **Vestidos de Festa**. Para isso:

- Use a estrutura de dados já reestruturada no item 0 para migrar as coleções existentes para `category: "noivas"` sem perder nada.
- Crie a navegação para as novas categorias no `Header.js` (hoje só tem Início / Coleção / Sobre / Contato).
- Adapte `CollectionsPage.js` e `CollectionGrid.js` para filtrar/exibir por categoria (ex: tabs ou pills "Noivas / Ternos / Vestidos de Festa"), com texto do botão e metadados de SEO (`Helmet`) dinâmicos por categoria em vez de fixos em "vestidos".
- Como ainda não tenho fotos de ternos/vestidos de festa, use placeholders de imagem claramente identificáveis (não fotos de noiva reaproveitadas) e deixe a estrutura pronta para eu substituir pelas fotos reais depois — não invente produtos com nomes ultra-específicos como fez o catálogo de noivas, pode usar 2-3 produtos de exemplo por categoria.
- Atualize (ou adicione) os testes relevantes para cobrir o filtro por categoria.

## 2. Modernizar a identidade visual ("cara de loja moderna")

Hoje o visual é: fonte `Playfair Display` (serif clássica) em tudo, paleta rosa/mauve suave (`#a38396`, `#d4b5c9`, `#e91e63`).

Quero uma direção mais "loja moderna" — inspiração: e-commerces de moda contemporâneos, grid editorial, bastante espaço em branco, tipografia mais atual, sem perder um toque de sofisticação (a loja ainda vende vestido de noiva, então não pode virar genérica/fria demais). Concretamente:

- Proponha uma paleta nova (cores neutras + 1-2 cores de destaque) e uma combinação tipográfica (pode manter uma serif de destaque só em títulos/hero, mas o corpo do texto e a UI devem usar uma sans-serif moderna). Defina isso como tokens do Tailwind (item 0), não como valores soltos.
- Modernize o grid de produtos/coleções (`CollectionGrid.js`, `ProductCard.js`) para um layout mais editorial (proporções de imagem consistentes, hover states discretos, menos "botão colorido genérico").
- Revise `Hero.js`, `Header.js` e `Footer.js` para o novo visual — o Header hoje é bem simples (logo + nav + ícone de coração), pode propor melhorias de hierarquia visual mantendo a função de favoritos (moodboard).
- Mantenha o uso de `LazyLoadImage`, `Framer Motion` (para as animações) e as integrações existentes (Firebase, WhatsApp button, chatbot, AdSense, Instagram widget) funcionando.
- Não quebre as rotas atuais (`/home`, `/about`, `/collections`, `/collections/:id`, `/moodboard`, `/contact`) nem a suíte de testes.

## Como quero que você trabalhe

1. Primeiro me apresente um plano curto cobrindo as três frentes (base técnica, categorias, visual): confirme quais dependências realmente estão mortas, a estratégia de migração para Vite, a estrutura de dados/categoria proposta, e a direção de paleta/tipografia — antes de escrever código.
2. Depois de eu aprovar o plano, implemente em etapas pequenas e testáveis, nesta ordem: (a) limpeza de dependências, (b) migração para Vite, (c) Tailwind + reestruturação de dados, (d) categorias novas, (e) redesign visual. Rode os testes a cada etapa.
3. Ao final, eu quero conseguir rodar o projeto localmente e navegar pelas 3 categorias vendo o novo visual, com o build/deploy do Firebase ainda funcionando.
