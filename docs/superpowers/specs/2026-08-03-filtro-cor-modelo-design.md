# Design: Filtro de Cor e Modelo nas Coleções (Iara Noivas)

**Data:** 2026-08-03
**Status:** Aprovado para planejamento de implementação

## Contexto

Hoje a navegação por vestidos tem dois níveis: a página de categoria
(`/collections/:categoria`, ex. `noivas`) mostra a cliente uma vitrine de
**coleções** (ex. "Petrova - Coleção Alvor"), e a página de uma coleção
específica (`/collections/:collectionId`) mostra os vestidos individuais
dela. Não existe hoje nenhuma forma de a cliente pedir "quero um vestido
verde, modelo sereia" sem abrir coleção por coleção manualmente.

`noivas.js` tem 148 produtos reais (só `id`, `name`, `image` — sem cor nem
modelo). `ternos.js` e `festa.js` têm 3 produtos cada, todos com foto
placeholder (`foto-em-breve.svg`), aguardando fotos reais.

## Objetivo

Permitir filtrar por **cor** e **modelo/silhueta** dentro de uma categoria,
cruzando os vestidos de todas as coleções daquela categoria de uma vez
(ex.: dentro de "Vestidos de Festa", ver todo vestido verde sereia,
não importa de qual coleção). A navegação atual por vitrine de coleções
é preservada — o filtro é uma alternativa, não uma substituição.

## Não-objetivos

- Não cruza categorias diferentes (a busca fica dentro de noivas, ou dentro
  de ternos, ou dentro de festa — nunca misturando as três).
- Não constrói um painel administrativo para cadastrar cor/modelo — os
  campos são editados diretamente nos arquivos de catálogo (`data/catalog/*.js`),
  como já é feito hoje para nome/imagem.
- Não tenta inferir cor/silhueta reais dos 148 vestidos de noiva existentes
  a partir do nome ou da imagem — dado real virá do usuário depois.
- Não faz deep-link direto para um produto específico dentro da coleção;
  o card na grade filtrada leva para a página da coleção-mãe, como os
  cards da vitrine já fazem hoje.

## Modelo de dados

Cada produto ganha dois campos **opcionais**:

```js
{
  id: "vestidos-petrova-p1",
  name: "Modernice",
  image: ...,
  color: "verde",   // slug minúsculo, sem acento; ausente = não classificado
  model: "sereia",  // slug minúsculo, sem acento; ausente = não classificado
}
```

Produto sem `color`/`model` continua aparecendo normalmente na vitrine de
coleções; só não entra em nenhum resultado de filtro. As opções que
aparecem na barra de filtro (quais cores/modelos existem para escolher)
são calculadas dinamicamente a partir do que estiver de fato cadastrado
naquela categoria — não há lista fixa de opções que possa ficar
desatualizada.

### Dados provisórios desta fase

O usuário vai enviar fotos e dados corretos dos 148 vestidos de noiva
depois. Até lá:

- **`noivas`**: os 148 produtos recebem `model` preenchido de forma
  **rotativa/genérica** entre os valores conhecidos hoje —
  `princesa`, `sereia`, `minimalista` — só para o filtro funcionar e
  poder ser demonstrado/testado. Um comentário no topo de `noivas.js`
  deixa explícito que são valores placeholder a substituir. `color` fica
  **sem valor** (nenhum dado de cor foi fornecido ainda).
- **`festa`**: os 3 produtos placeholder recebem `model: "sereia"` ou
  `"princesa"` (valores reais conhecidos, únicos citados pelo usuário
  para essa categoria). `color` fica sem valor.
- **`ternos`**: nenhuma taxonomia de modelo foi fornecida para essa
  categoria — `color`/`model` ficam sem valor por enquanto. Como só há
  3 produtos placeholder, o filtro simplesmente não mostra opções nessa
  categoria até haver dado real (ver "Casos extremos").

## Arquitetura e componentes

- **`src/utils/flattenCategoryProducts.js`** (novo) — recebe a categoria,
  percorre `catalog` e retorna um array plano de produtos daquela
  categoria, cada um carregando `collectionId`/`collectionName` da
  coleção-mãe (necessário pro link e pro card).
- **`src/components/ProductCard.js`** (novo, extraído de `CollectionId.js`)
  — o card de vestido (imagem, favoritar, curtir, WhatsApp, compartilhar)
  vira componente próprio, reaproveitado tanto na página de uma coleção
  quanto na grade filtrada. `CollectionId.js` passa a usá-lo também, em
  vez de manter o JSX duplicado.
- **`src/components/ProductFilterBar.js`** (novo) — swatches de cor
  (multi-seleção) + chips de modelo (multi-seleção) + "Limpar filtros".
  Recebe as opções disponíveis já calculadas (dinâmicas) e o estado atual;
  não sabe nada sobre roteamento.
- **`src/components/FilteredProductGrid.js`** (novo) — recebe a lista já
  filtrada e renderiza usando `ProductCard`, com contador de resultados e
  estado vazio ("nenhum vestido encontrado com esse filtro").
- **`CollectionsPage.js`** (modificado) — passa a guardar o estado do
  filtro sincronizado com a URL via `useSearchParams`
  (`?cor=verde,azul&modelo=sereia`), calcula os produtos achatados da
  categoria atual e as opções disponíveis, e decide o que renderizar:
  sem filtro ativo → `CollectionGrid` de sempre; com filtro ativo →
  `FilteredProductGrid`. `ProductFilterBar` fica sempre visível no topo,
  logo abaixo da navegação de categorias.

## Regra do filtro

Dentro da categoria atual: múltiplas cores selecionadas = OU entre si
(verde OU azul), múltiplos modelos = OU entre si (sereia OU princesa),
cor e modelo juntos = E (verde E sereia). Trocar de categoria
(noivas/ternos/festa) zera o filtro. Estado sincronizado com a URL para
poder ser compartilhado (o site já compartilha bastante via WhatsApp —
ver `shareCurrentPage`/`shareSingleDress`).

## Casos extremos

- **Categoria sem nenhum produto tagueado** (caso de `ternos` nesta fase):
  a barra de filtro mostra "Filtro em breve" em vez de swatches/chips
  vazios, evitando uma UI quebrada.
- **Filtro sem resultado**: `FilteredProductGrid` mostra estado vazio com
  sugestão de limpar o filtro.
- **Produto sem `color` ou sem `model`**: nunca aparece em resultado de
  filtro daquela dimensão, mas continua normalmente na vitrine de
  coleções (comportamento inalterado).

## Testes

- Unitário: `flattenCategoryProducts` (achata corretamente, mantém
  `collectionId`).
- Unitário: lógica de filtro (OU dentro da dimensão, E entre dimensões,
  produto sem campo não aparece).
- Componente: `ProductFilterBar` (seleção múltipla, limpar filtros).
- Componente: `CollectionsPage` alterna corretamente entre `CollectionGrid`
  e `FilteredProductGrid` conforme a URL tem ou não filtro.
- Regressão: `CollectionGrid.test.js` e `CollectionId.test.js` existentes
  continuam passando (o card extraído para `ProductCard` não pode mudar
  comportamento visível).

## Trabalho futuro (fora desta fase)

- Substituir os valores placeholder de `model`/`color` pelos dados reais
  quando o usuário enviar as fotos e classificações corretas dos 148
  vestidos de noiva.
- Definir e cadastrar a taxonomia de modelo para `ternos`.
