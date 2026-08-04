# Filtro de Cor e Modelo nas Coleções — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Permitir filtrar vestidos por cor e modelo/silhueta dentro de uma categoria (noivas, ternos ou festa), cruzando os produtos de todas as coleções daquela categoria, sem remover a vitrine de coleções atual.

**Architecture:** Dois utilitários puros (achatar produtos de uma categoria; calcular opções e aplicar o filtro) alimentam três componentes novos (card de produto extraído, barra de filtro controlada, grade de resultados filtrados) que a página de categoria já existente passa a orquestrar via estado sincronizado com a URL.

**Tech Stack:** React 19, react-router-dom v7 (`useSearchParams`), Jest + Testing Library (testes em `frontend/src/tests/`, único diretório varrido pelo `jest.config.js`).

Spec de referência: `docs/superpowers/specs/2026-08-03-filtro-cor-modelo-design.md`

## Global Constraints

- Todos os comandos deste plano rodam a partir de `frontend/` (`cd frontend` primeiro).
- Slugs de `color`/`model` nos dados: minúsculos, sem acento (ex. `"verde"`, `"sereia"`).
- O filtro cruza produtos de todas as coleções da **mesma categoria** — nunca entre noivas/ternos/festa.
- Produto sem `color` ou sem `model` nunca aparece em resultado de filtro daquela dimensão, mas continua normalmente na vitrine de coleções.
- Estado do filtro fica na URL via query params `cor` e `modelo`, valores separados por vírgula (ex. `?cor=verde,azul&modelo=sereia`).
- `frontend/src/tests/__mocks__/react-router-dom.js` substitui globalmente o módulo `react-router-dom` em **todos** os testes (via `moduleNameMapper` em `jest.config.js`) — qualquer hook novo usado em componentes precisa existir nesse mock.
- Jest só varre `frontend/src/tests/` (`roots` em `jest.config.js`) — todo arquivo de teste novo vai lá, nunca colocado ao lado do código-fonte.
- Não pode quebrar `frontend/src/tests/CollectionGrid.test.js` nem `frontend/src/tests/CollectionId.test.js`, que já existem e passam hoje.
- `ternos.js` não é tocado neste plano (nenhuma taxonomia de modelo foi definida para essa categoria ainda — fica sem `color`/`model`, e a barra de filtro mostra "Filtro em breve" lá, conforme a spec).

---

### Task 1: Utilitário `flattenCategoryProducts`

**Files:**
- Create: `frontend/src/utils/flattenCategoryProducts.js`
- Test: `frontend/src/tests/flattenCategoryProducts.test.js`

**Interfaces:**
- Produces: `flattenCategoryProducts(catalog: Array<Collection>, category: string) => Array<Product & { collectionId: string, collectionName: string }>` (export default), onde `Collection = { id, name, category, products: Array<Product> }` e `Product` tem pelo menos `{ id, name, image }`.

- [ ] **Step 1: Escrever o teste (vai falhar — o arquivo ainda não existe)**

Criar `frontend/src/tests/flattenCategoryProducts.test.js`:

```js
import flattenCategoryProducts from "../utils/flattenCategoryProducts";

const catalog = [
  {
    id: "vestidos-petrova",
    name: "Petrova - Coleção Alvor",
    category: "noivas",
    products: [
      { id: "vestidos-petrova-p1", name: "Modernice", image: "p1.jpg", model: "sereia" },
      { id: "vestidos-petrova-p2", name: "Ascenção", image: "p2.jpg", model: "princesa" },
    ],
  },
  {
    id: "vestidos-enlace",
    name: "Petrova - Enlace",
    category: "noivas",
    products: [{ id: "vestidos-enlace-p1", name: "Vênus", image: "p3.jpg" }],
  },
  {
    id: "ternos-classico",
    name: "Ternos - Coleção Clássica",
    category: "ternos",
    products: [{ id: "ternos-classico-p1", name: "Terno Slim Azul-Marinho", image: "p4.jpg" }],
  },
];

describe("flattenCategoryProducts", () => {
  test("retorna só os produtos das coleções da categoria informada", () => {
    const result = flattenCategoryProducts(catalog, "noivas");
    expect(result).toHaveLength(3);
    expect(result.map((product) => product.id)).toEqual([
      "vestidos-petrova-p1",
      "vestidos-petrova-p2",
      "vestidos-enlace-p1",
    ]);
  });

  test("mantém os campos originais do produto", () => {
    const result = flattenCategoryProducts(catalog, "noivas");
    expect(result[0]).toMatchObject({ name: "Modernice", image: "p1.jpg", model: "sereia" });
  });

  test("anexa collectionId e collectionName da coleção-mãe", () => {
    const result = flattenCategoryProducts(catalog, "noivas");
    expect(result[0]).toMatchObject({
      collectionId: "vestidos-petrova",
      collectionName: "Petrova - Coleção Alvor",
    });
  });

  test("retorna array vazio quando a categoria não tem coleções", () => {
    expect(flattenCategoryProducts(catalog, "festa")).toEqual([]);
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm test -- --watchAll=false --testPathPattern=flattenCategoryProducts`
Expected: FAIL — `Cannot find module '../utils/flattenCategoryProducts'`

- [ ] **Step 3: Implementar**

Criar `frontend/src/utils/flattenCategoryProducts.js`:

```js
const flattenCategoryProducts = (catalog, category) =>
  catalog
    .filter((collection) => collection.category === category)
    .flatMap((collection) =>
      collection.products.map((product) => ({
        ...product,
        collectionId: collection.id,
        collectionName: collection.name,
      }))
    );

export default flattenCategoryProducts;
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npm test -- --watchAll=false --testPathPattern=flattenCategoryProducts`
Expected: PASS (4 testes)

- [ ] **Step 5: Commit**

```bash
git add frontend/src/utils/flattenCategoryProducts.js frontend/src/tests/flattenCategoryProducts.test.js
git commit -m "feat: adiciona flattenCategoryProducts para achatar produtos por categoria"
```

---

### Task 2: Utilitário `productFilters`

**Files:**
- Create: `frontend/src/utils/productFilters.js`
- Test: `frontend/src/tests/productFilters.test.js`

**Interfaces:**
- Consumes: nenhum (função pura, sem dependência de Task 1).
- Produces:
  - `computeAvailableFilterOptions(products: Array<Product>) => { colors: string[], models: string[] }` (opções únicas, ordenadas, ignorando produto sem o campo)
  - `filterProductsByAttributes(products: Array<Product>, { colors?: string[], models?: string[] }) => Array<Product>` (OU dentro da dimensão, E entre dimensões; seleção vazia = não filtra aquela dimensão)
  - `parseFilterParam(value: string | null) => string[]` (`"verde,azul"` → `["verde", "azul"]`; `null`/`""` → `[]`)

- [ ] **Step 1: Escrever o teste (vai falhar — o arquivo ainda não existe)**

Criar `frontend/src/tests/productFilters.test.js`:

```js
import {
  computeAvailableFilterOptions,
  filterProductsByAttributes,
  parseFilterParam,
} from "../utils/productFilters";

const products = [
  { id: "p1", name: "Modernice", color: "verde", model: "sereia" },
  { id: "p2", name: "Ascenção", color: "azul", model: "princesa" },
  { id: "p3", name: "Vênus", color: "verde", model: "princesa" },
  { id: "p4", name: "Sem dados" },
];

describe("computeAvailableFilterOptions", () => {
  test("retorna cores e modelos únicos e ordenados, ignorando produto sem o campo", () => {
    expect(computeAvailableFilterOptions(products)).toEqual({
      colors: ["azul", "verde"],
      models: ["princesa", "sereia"],
    });
  });

  test("retorna listas vazias quando nenhum produto tem os campos", () => {
    expect(computeAvailableFilterOptions([{ id: "p1", name: "Sem dados" }])).toEqual({
      colors: [],
      models: [],
    });
  });
});

describe("filterProductsByAttributes", () => {
  test("sem seleção nenhuma, retorna todos os produtos", () => {
    expect(filterProductsByAttributes(products, {})).toEqual(products);
  });

  test("filtra por cor (OU dentro da dimensão)", () => {
    const result = filterProductsByAttributes(products, { colors: ["azul"] });
    expect(result.map((product) => product.id)).toEqual(["p2"]);
  });

  test("cor e modelo juntos usam E entre dimensões", () => {
    const result = filterProductsByAttributes(products, { colors: ["verde"], models: ["princesa"] });
    expect(result.map((product) => product.id)).toEqual(["p3"]);
  });

  test("produto sem o campo nunca aparece quando aquela dimensão está filtrada", () => {
    const result = filterProductsByAttributes(products, { colors: ["verde", "azul"] });
    expect(result.some((product) => product.id === "p4")).toBe(false);
  });
});

describe("parseFilterParam", () => {
  test("separa por vírgula", () => {
    expect(parseFilterParam("verde,azul")).toEqual(["verde", "azul"]);
  });

  test("valor único vira array de 1", () => {
    expect(parseFilterParam("verde")).toEqual(["verde"]);
  });

  test("null ou string vazia viram array vazio", () => {
    expect(parseFilterParam(null)).toEqual([]);
    expect(parseFilterParam("")).toEqual([]);
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm test -- --watchAll=false --testPathPattern=productFilters`
Expected: FAIL — `Cannot find module '../utils/productFilters'`

- [ ] **Step 3: Implementar**

Criar `frontend/src/utils/productFilters.js`:

```js
export const computeAvailableFilterOptions = (products) => {
  const colors = new Set();
  const models = new Set();

  products.forEach((product) => {
    if (product.color) colors.add(product.color);
    if (product.model) models.add(product.model);
  });

  return {
    colors: Array.from(colors).sort(),
    models: Array.from(models).sort(),
  };
};

export const filterProductsByAttributes = (products, { colors = [], models = [] } = {}) =>
  products.filter((product) => {
    const matchesColor = colors.length === 0 || colors.includes(product.color);
    const matchesModel = models.length === 0 || models.includes(product.model);
    return matchesColor && matchesModel;
  });

export const parseFilterParam = (value) => (value ? value.split(",").filter(Boolean) : []);
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npm test -- --watchAll=false --testPathPattern=productFilters`
Expected: PASS (9 testes)

- [ ] **Step 5: Commit**

```bash
git add frontend/src/utils/productFilters.js frontend/src/tests/productFilters.test.js
git commit -m "feat: adiciona productFilters (opções disponíveis, filtro e parse de query param)"
```

---

### Task 3: Extrair `ProductCard` de `CollectionId.js`

**Files:**
- Create: `frontend/src/components/ProductCard.js`
- Test: `frontend/src/tests/ProductCard.test.js`
- Modify: `frontend/src/pages/CollectionId.js` (substituir o card inline pelo componente)

**Interfaces:**
- Consumes: `useMoodboard()` de `../context/MoodboardContext` (já existe: `{ moodboardItems, addToMoodboard, removeFromMoodboard }`); `shareCurrentPage` de `../utils/shareCurrentPage`; `shareSingleDress` de `../utils/shareSingleDress`; `FabricTag` de `./FabricTag`.
- Produces: `<ProductCard product={{ id, name, image }} />` (export default) — card completo com favoritar, curtir, compartilhar WhatsApp e compartilhar genérico. Não depende de roteamento; quem usa o componente decide se envolve num `<Link>` ou não.

Este card hoje só existe embutido dentro do `.map()` de `CollectionId.js`. A extração preserva o comportamento exato (inclusive o botão "Curtir" chamando a mesma ação de favoritar que o coração) e corrige uma lacuna: os botões de compartilhar não paravam a propagação do clique — inofensivo hoje porque o card nunca fica dentro de um link, mas a Task 5 (grade filtrada) vai envolver o card num `<Link>`, e sem a correção um clique no botão de compartilhar também dispararia a navegação do link.

- [ ] **Step 1: Escrever o teste (vai falhar — o componente ainda não existe)**

Criar `frontend/src/tests/ProductCard.test.js`:

```js
import { render, screen, fireEvent } from "@testing-library/react";
import { MoodboardProvider } from "../context/MoodboardContext";
import ProductCard from "../components/ProductCard";

const product = { id: "vestidos-petrova-p1", name: "Modernice", image: "p1.jpg" };

const renderCard = (children = <ProductCard product={product} />) =>
  render(<MoodboardProvider>{children}</MoodboardProvider>);

describe("ProductCard", () => {
  test("Renderiza o nome e a imagem do produto", () => {
    renderCard();
    expect(screen.getByText("Modernice")).toBeInTheDocument();
    expect(screen.getByAltText("Modernice")).toBeInTheDocument();
  });

  test("Favoritar muda o estado visual do botão de coração", () => {
    renderCard();
    const favoriteButton = screen.getByLabelText("Favoritar");
    expect(favoriteButton).toHaveClass("text-ink");

    fireEvent.click(favoriteButton);
    expect(favoriteButton).toHaveClass("text-accent");
  });

  test("Botão Curtir também adiciona/remove dos favoritos", () => {
    renderCard();
    fireEvent.click(screen.getByLabelText("Curtir"));
    expect(screen.getByLabelText("Favoritar")).toHaveClass("text-accent");

    fireEvent.click(screen.getByLabelText("Curtir"));
    expect(screen.getByLabelText("Favoritar")).toHaveClass("text-ink");
  });

  test("Clique no botão do WhatsApp não propaga pro elemento pai", () => {
    const parentClick = jest.fn();
    render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
      <div onClick={parentClick}>
        <MoodboardProvider>
          <ProductCard product={product} />
        </MoodboardProvider>
      </div>
    );

    fireEvent.click(screen.getByLabelText("Compartilhar no WhatsApp"));
    expect(parentClick).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm test -- --watchAll=false --testPathPattern=ProductCard`
Expected: FAIL — `Cannot find module '../components/ProductCard'`

- [ ] **Step 3: Implementar o componente**

Criar `frontend/src/components/ProductCard.js`:

```jsx
import { useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaHeart, FaShareAlt, FaWhatsapp, FaThumbsUp } from "react-icons/fa";
import { useMoodboard } from "../context/MoodboardContext";
import { shareCurrentPage } from "../utils/shareCurrentPage";
import { shareSingleDress } from "../utils/shareSingleDress";
import FabricTag from "./FabricTag";

const ProductCard = ({ product }) => {
  const { moodboardItems, addToMoodboard, removeFromMoodboard } = useMoodboard();
  const [justLiked, setJustLiked] = useState(false);
  const lastTapRef = useRef(0);

  const isFavorite = moodboardItems.some((item) => item.id === product.id);

  const handleFavoriteClick = (event) => {
    event?.stopPropagation();
    if (isFavorite) {
      removeFromMoodboard(product.id);
      return;
    }
    addToMoodboard(product);
    setJustLiked(true);
    setTimeout(() => setJustLiked(false), 1000);
  };

  const handleTouchStart = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      handleFavoriteClick();
    }
    lastTapRef.current = now;
  };

  return (
    <div className="group text-center" onTouchStart={handleTouchStart}>
      <div className="relative aspect-[3/4] overflow-hidden bg-hairline/30">
        <LazyLoadImage
          effect="blur"
          src={product.image}
          loading="lazy"
          alt={product.name}
          className="h-full w-full object-cover"
          wrapperClassName="block h-full w-full"
        />

        <button
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 transition-colors hover:bg-surface ${
            isFavorite ? "text-accent" : "text-ink"
          }`}
          onClick={handleFavoriteClick}
          aria-label="Favoritar"
        >
          <FaHeart size={16} />
        </button>

        {justLiked && (
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 animate-float-up text-2xl text-accent">
            <FaHeart />
          </span>
        )}
      </div>

      <div className="mt-3 flex justify-center">
        <FabricTag>{product.name}</FabricTag>
      </div>

      <div className="mt-3 flex justify-center gap-3">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:border-accent hover:text-accent"
          onClick={handleFavoriteClick}
          aria-label="Curtir"
        >
          <FaThumbsUp size={16} />
        </button>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-[#25D366] transition-colors hover:border-[#25D366]"
          data-name={product.name}
          onClick={(event) => {
            event.stopPropagation();
            shareSingleDress(event);
          }}
          aria-label="Compartilhar no WhatsApp"
        >
          <FaWhatsapp size={16} />
        </button>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:border-accent hover:text-accent"
          onClick={(event) => {
            event.stopPropagation();
            shareCurrentPage();
          }}
          aria-label="Compartilhar"
        >
          <FaShareAlt size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npm test -- --watchAll=false --testPathPattern=ProductCard`
Expected: PASS (4 testes)

- [ ] **Step 5: Atualizar `CollectionId.js` para usar `ProductCard`**

Substituir o conteúdo de `frontend/src/pages/CollectionId.js` por:

```jsx
import { useRef } from "react";
import { useParams } from "react-router-dom";
import collections from "../data/catalog";
import Layout from "../layout/Layout";
import { Helmet } from "react-helmet-async";
import ProductCard from "../components/ProductCard";
import { useParallax } from "../hooks/useParallax";
import logo from "../assets/images/loguinho.webp";

const Collection_ID = () => {
  const { slug: id } = useParams();
  const collection = collections.find((col) => col.id === id);
  const gridRef = useRef(null);
  const bannerParallaxRef = useParallax({ distance: 40 });

  if (!collection) {
    return <h2 className="p-10 text-center font-display text-2xl text-ink">Coleção não encontrada!</h2>;
  }

  return (
    <Layout title={collection.name}>
      <Helmet>
        <title>Iara Noivas - Vestidos de Noiva </title>
      </Helmet>

      <div className="mx-auto max-w-6xl px-4 pt-8 text-center sm:px-6">
        <h1 className="sr-only">{collection.name}</h1>
        <img
          ref={bannerParallaxRef}
          src={logo}
          loading="lazy"
          alt={collection.name}
          className="mx-auto max-h-45 w-1/2 object-contain"
        />
        <p className="mt-4 font-body text-sm text-ink/70 sm:text-base">
          Explore nossa coleção exclusiva {collection.name}.
        </p>
      </div>

      {/* Grid de Produtos */}
      <div
        ref={gridRef}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3"
      >
        {collection.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  );
};

export default Collection_ID;
```

- [ ] **Step 6: Rodar o teste existente de `CollectionId` e confirmar que ainda passa**

Run: `npm test -- --watchAll=false --testPathPattern=CollectionId`
Expected: PASS (2 testes, sem nenhuma mudança no arquivo de teste)

- [ ] **Step 7: Commit**

```bash
git add frontend/src/components/ProductCard.js frontend/src/tests/ProductCard.test.js frontend/src/pages/CollectionId.js
git commit -m "refactor: extrai ProductCard de CollectionId para reaproveitar na grade filtrada"
```

---

### Task 4: Componente `ProductFilterBar`

**Files:**
- Create: `frontend/src/components/ProductFilterBar.js`
- Test: `frontend/src/tests/ProductFilterBar.test.js`

**Interfaces:**
- Consumes: nada de outras tasks — componente controlado puro.
- Produces: `<ProductFilterBar colorOptions={string[]} modelOptions={string[]} selectedColors={string[]} selectedModels={string[]} onToggleColor={(color: string) => void} onToggleModel={(model: string) => void} onClear={() => void} />` (export default). Swatch de cor tem `aria-label={"Filtrar por cor " + color}`. Sem nenhuma opção (`colorOptions` e `modelOptions` vazios), renderiza só o texto "Filtro em breve".

- [ ] **Step 1: Escrever o teste (vai falhar — o componente ainda não existe)**

Criar `frontend/src/tests/ProductFilterBar.test.js`:

```js
import { render, screen, fireEvent } from "@testing-library/react";
import ProductFilterBar from "../components/ProductFilterBar";

const baseProps = {
  colorOptions: [],
  modelOptions: [],
  selectedColors: [],
  selectedModels: [],
  onToggleColor: () => {},
  onToggleModel: () => {},
  onClear: () => {},
};

describe("ProductFilterBar", () => {
  test("Mostra 'Filtro em breve' quando não há nenhuma opção", () => {
    render(<ProductFilterBar {...baseProps} />);
    expect(screen.getByText("Filtro em breve")).toBeInTheDocument();
  });

  test("Renderiza só o modelo quando não há opções de cor", () => {
    render(<ProductFilterBar {...baseProps} modelOptions={["sereia", "princesa"]} />);
    expect(screen.queryByText("Cor")).not.toBeInTheDocument();
    expect(screen.getByText("Sereia")).toBeInTheDocument();
    expect(screen.getByText("Princesa")).toBeInTheDocument();
  });

  test("Clicar num swatch de cor chama onToggleColor com a cor certa", () => {
    const onToggleColor = jest.fn();
    render(<ProductFilterBar {...baseProps} colorOptions={["verde"]} onToggleColor={onToggleColor} />);
    fireEvent.click(screen.getByLabelText("Filtrar por cor verde"));
    expect(onToggleColor).toHaveBeenCalledWith("verde");
  });

  test("Clicar num chip de modelo chama onToggleModel com o modelo certo", () => {
    const onToggleModel = jest.fn();
    render(<ProductFilterBar {...baseProps} modelOptions={["sereia"]} onToggleModel={onToggleModel} />);
    fireEvent.click(screen.getByText("Sereia"));
    expect(onToggleModel).toHaveBeenCalledWith("sereia");
  });

  test("Botão Limpar filtros só aparece com filtro ativo, e chama onClear", () => {
    const onClear = jest.fn();
    const { rerender } = render(
      <ProductFilterBar {...baseProps} colorOptions={["verde"]} onClear={onClear} />
    );
    expect(screen.queryByText("Limpar filtros")).not.toBeInTheDocument();

    rerender(
      <ProductFilterBar {...baseProps} colorOptions={["verde"]} selectedColors={["verde"]} onClear={onClear} />
    );
    fireEvent.click(screen.getByText("Limpar filtros"));
    expect(onClear).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm test -- --watchAll=false --testPathPattern=ProductFilterBar`
Expected: FAIL — `Cannot find module '../components/ProductFilterBar'`

- [ ] **Step 3: Implementar**

Criar `frontend/src/components/ProductFilterBar.js`:

```jsx
const COLOR_HEX = {
  branco: "#FFFFFF",
  "off-white": "#F4EFE6",
  marfim: "#F2EAD3",
  champanhe: "#E8D5A8",
  nude: "#D9B99B",
  dourado: "#D4AF37",
  prata: "#C0C0C0",
  preto: "#1A1A1A",
  vermelho: "#B3323C",
  rosa: "#E8A5B6",
  roxo: "#7A4B8A",
  azul: "#2F4C6E",
  verde: "#3B6B4F",
  esmeralda: "#2E8B57",
  amarelo: "#E8C547",
  laranja: "#D9822B",
};

const displayLabel = (slug) => slug.charAt(0).toUpperCase() + slug.slice(1);

const ProductFilterBar = ({
  colorOptions,
  modelOptions,
  selectedColors,
  selectedModels,
  onToggleColor,
  onToggleModel,
  onClear,
}) => {
  const hasAnyOption = colorOptions.length > 0 || modelOptions.length > 0;
  const hasActiveFilter = selectedColors.length > 0 || selectedModels.length > 0;

  if (!hasAnyOption) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-4 text-center font-label text-xs uppercase tracking-wide text-ink/50 sm:px-6">
        Filtro em breve
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-4 py-6 sm:px-6">
      {colorOptions.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-label text-xs uppercase tracking-wide text-ink/70">Cor</span>
          {colorOptions.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`Filtrar por cor ${color}`}
              aria-pressed={selectedColors.includes(color)}
              onClick={() => onToggleColor(color)}
              className={`h-7 w-7 rounded-full border-2 transition-colors ${
                selectedColors.includes(color) ? "border-accent" : "border-hairline"
              }`}
              style={{ backgroundColor: COLOR_HEX[color] ?? "#CCCCCC" }}
            />
          ))}
        </div>
      )}

      {modelOptions.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-label text-xs uppercase tracking-wide text-ink/70">Modelo</span>
          {modelOptions.map((model) => (
            <button
              key={model}
              type="button"
              aria-pressed={selectedModels.includes(model)}
              onClick={() => onToggleModel(model)}
              className={`border px-3 py-1 font-label text-xs uppercase tracking-wide transition-colors ${
                selectedModels.includes(model)
                  ? "border-accent text-accent"
                  : "border-hairline text-ink/70 hover:text-ink"
              }`}
            >
              {displayLabel(model)}
            </button>
          ))}
        </div>
      )}

      {hasActiveFilter && (
        <button
          type="button"
          onClick={onClear}
          className="font-label text-xs uppercase tracking-wide text-ink/50 underline hover:text-ink"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
};

export default ProductFilterBar;
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npm test -- --watchAll=false --testPathPattern=ProductFilterBar`
Expected: PASS (5 testes)

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/ProductFilterBar.js frontend/src/tests/ProductFilterBar.test.js
git commit -m "feat: adiciona ProductFilterBar (swatches de cor + chips de modelo)"
```

---

### Task 5: Componente `FilteredProductGrid`

**Files:**
- Create: `frontend/src/components/FilteredProductGrid.js`
- Test: `frontend/src/tests/FilteredProductGrid.test.js`

**Interfaces:**
- Consumes: `ProductCard` da Task 3 (`<ProductCard product={product} />`); `Link` de `react-router-dom`.
- Produces: `<FilteredProductGrid products={Array<Product & { collectionId }>} onClearFilters={() => void} />` (export default). Cada produto precisa ter `collectionId` (vem de `flattenCategoryProducts`, Task 1). Estado vazio quando `products.length === 0`.

- [ ] **Step 1: Escrever o teste (vai falhar — o componente ainda não existe)**

Criar `frontend/src/tests/FilteredProductGrid.test.js`:

```js
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MoodboardProvider } from "../context/MoodboardContext";
import FilteredProductGrid from "../components/FilteredProductGrid";

const products = [
  { id: "vestidos-petrova-p1", name: "Modernice", image: "p1.jpg", collectionId: "vestidos-petrova" },
  { id: "vestidos-enlace-p1", name: "Vênus", image: "p2.jpg", collectionId: "vestidos-enlace" },
];

const renderGrid = (items, onClearFilters = () => {}) =>
  render(
    <BrowserRouter>
      <MoodboardProvider>
        <FilteredProductGrid products={items} onClearFilters={onClearFilters} />
      </MoodboardProvider>
    </BrowserRouter>
  );

describe("FilteredProductGrid", () => {
  test("Renderiza a contagem e os produtos", () => {
    renderGrid(products);
    expect(screen.getByText("2 vestidos encontrados")).toBeInTheDocument();
    expect(screen.getByText("Modernice")).toBeInTheDocument();
    expect(screen.getByText("Vênus")).toBeInTheDocument();
  });

  test("Cada card linka pra página da coleção-mãe", () => {
    renderGrid(products);
    expect(screen.getByText("Modernice").closest("a")).toHaveAttribute(
      "href",
      "/collections/vestidos-petrova"
    );
  });

  test("Mostra estado vazio e aciona onClearFilters", () => {
    const onClearFilters = jest.fn();
    renderGrid([], onClearFilters);
    expect(screen.getByText("Nenhum vestido encontrado com esse filtro.")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Limpar filtros"));
    expect(onClearFilters).toHaveBeenCalled();
  });

  test("Usa singular quando há só 1 resultado", () => {
    renderGrid([products[0]]);
    expect(screen.getByText("1 vestido encontrado")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npm test -- --watchAll=false --testPathPattern=FilteredProductGrid`
Expected: FAIL — `Cannot find module '../components/FilteredProductGrid'`

- [ ] **Step 3: Implementar**

Criar `frontend/src/components/FilteredProductGrid.js`:

```jsx
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const FilteredProductGrid = ({ products, onClearFilters }) => {
  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <p className="font-body text-sm text-ink/70">Nenhum vestido encontrado com esse filtro.</p>
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-4 font-label text-xs uppercase tracking-wide text-accent underline"
        >
          Limpar filtros
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <p className="pb-2 font-label text-xs uppercase tracking-wide text-ink/50">
        {products.length} {products.length === 1 ? "vestido encontrado" : "vestidos encontrados"}
      </p>
      <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link key={product.id} to={`/collections/${product.collectionId}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FilteredProductGrid;
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npm test -- --watchAll=false --testPathPattern=FilteredProductGrid`
Expected: PASS (4 testes)

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/FilteredProductGrid.js frontend/src/tests/FilteredProductGrid.test.js
git commit -m "feat: adiciona FilteredProductGrid (grade de resultados cruzando coleções)"
```

---

### Task 6: Ligar tudo em `CollectionsPage.js`

**Files:**
- Modify: `frontend/src/pages/CollectionsPage.js`
- Modify: `frontend/src/tests/__mocks__/react-router-dom.js` (adicionar `useSearchParams` ao mock global)
- Test: `frontend/src/tests/CollectionsPage.test.js`

**Interfaces:**
- Consumes: `flattenCategoryProducts` (Task 1), `computeAvailableFilterOptions` / `filterProductsByAttributes` / `parseFilterParam` (Task 2), `ProductFilterBar` (Task 4), `FilteredProductGrid` (Task 5), `CollectionGrid` (já existe).
- Produces: `CollectionsPage` continua com a mesma prop pública (`category`), agora renderizando a barra de filtro sempre, e alternando entre `CollectionGrid` (sem filtro ativo) e `FilteredProductGrid` (com filtro ativo).

O `jest.config.js` mapeia `react-router-dom` inteiro para `frontend/src/tests/__mocks__/react-router-dom.js` (ver Global Constraints). Esse mock hoje não exporta `useSearchParams`, e `CollectionsPage.js` vai passar a usar esse hook — por isso o mock precisa ser estendido antes do teste da página funcionar. É uma mudança aditiva (só acrescenta um export), não deve afetar nenhum teste existente.

- [ ] **Step 1: Estender o mock global de `react-router-dom` com `useSearchParams`**

Editar `frontend/src/tests/__mocks__/react-router-dom.js` (arquivo completo):

```js
import React from "react";

export const MemoryRouter = ({ children }) => <div>{children}</div>;
export const BrowserRouter = ({ children }) => <div>{children}</div>;
export const Link = ({ to, children }) => <a href={to}>{children}</a>;
export const useNavigate = jest.fn(); // Mantém a função corretamente
export const useParams = () => ({});
export const useLocation = () => ({ pathname: "/home" });
export const useSearchParams = () => {
  const [params, setParams] = React.useState(() => new URLSearchParams());
  const setSearchParams = (next) => {
    const value = typeof next === "function" ? next(params) : next;
    setParams(new URLSearchParams(value));
  };
  return [params, setSearchParams];
};

export default {
  BrowserRouter,
  MemoryRouter,
  Link,
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
};
```

- [ ] **Step 2: Rodar a suíte inteira e confirmar que nada quebrou com a mudança do mock**

Run: `npm test -- --watchAll=false`
Expected: PASS em todos os testes que já existiam antes desta task (mesma contagem de antes; nenhum teste novo ainda usa `useSearchParams`).

- [ ] **Step 3: Escrever o teste de `CollectionsPage` (vai falhar — a página ainda não tem filtro)**

Criar `frontend/src/tests/CollectionsPage.test.js`:

```js
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MoodboardProvider } from "../context/MoodboardContext";
import CollectionsPage from "../pages/CollectionsPage";

jest.mock("../data/catalog", () => [
  {
    id: "vestidos-petrova",
    name: "Petrova - Coleção Alvor",
    image: "petrova.jpg",
    category: "noivas",
    products: [
      { id: "vestidos-petrova-p1", name: "Modernice", image: "p1.jpg", color: "verde", model: "sereia" },
      { id: "vestidos-petrova-p2", name: "Ascenção", image: "p2.jpg", color: "azul", model: "princesa" },
    ],
  },
  {
    id: "ternos-classico",
    name: "Ternos - Coleção Clássica",
    image: "ternos.jpg",
    category: "ternos",
    products: [{ id: "ternos-classico-p1", name: "Terno Slim Azul-Marinho", image: "p3.jpg" }],
  },
]);

const renderPage = (category = "noivas") =>
  render(
    <BrowserRouter>
      <HelmetProvider>
        <MoodboardProvider>
          <CollectionsPage category={category} />
        </MoodboardProvider>
      </HelmetProvider>
    </BrowserRouter>
  );

describe("CollectionsPage", () => {
  test("Sem filtro ativo, mostra a vitrine de coleções", () => {
    renderPage();
    expect(screen.getByText("Petrova - Coleção Alvor")).toBeInTheDocument();
    expect(screen.queryByText("Modernice")).not.toBeInTheDocument();
  });

  test("Escolher uma cor troca pra grade filtrada com os produtos certos", () => {
    renderPage();
    fireEvent.click(screen.getByLabelText("Filtrar por cor verde"));

    expect(screen.queryByText("Petrova - Coleção Alvor")).not.toBeInTheDocument();
    expect(screen.getByText("Modernice")).toBeInTheDocument();
    expect(screen.queryByText("Ascenção")).not.toBeInTheDocument();
  });

  test("Categoria sem produto tagueado mostra 'Filtro em breve' e continua na vitrine", () => {
    renderPage("ternos");
    expect(screen.getByText("Filtro em breve")).toBeInTheDocument();
    expect(screen.getByText("Ternos - Coleção Clássica")).toBeInTheDocument();
  });

  test("Limpar filtros volta pra vitrine de coleções", () => {
    renderPage();
    fireEvent.click(screen.getByLabelText("Filtrar por cor verde"));
    expect(screen.getByText("Modernice")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Limpar filtros"));
    expect(screen.getByText("Petrova - Coleção Alvor")).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Rodar o teste e confirmar que falha**

Run: `npm test -- --watchAll=false --testPathPattern=CollectionsPage`
Expected: FAIL — a página ainda renderiza só `CollectionGrid`, sem `ProductFilterBar`; `getByLabelText("Filtrar por cor verde")` não encontra nada.

- [ ] **Step 5: Implementar**

Substituir o conteúdo de `frontend/src/pages/CollectionsPage.js` por:

```jsx
// src/pages/CollectionsPage.js
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CollectionGrid from "../components/CollectionGrid";
import ProductFilterBar from "../components/ProductFilterBar";
import FilteredProductGrid from "../components/FilteredProductGrid";
import Layout from "../layout/Layout";
import { Helmet } from "react-helmet-async";
import catalog from "../data/catalog";
import flattenCategoryProducts from "../utils/flattenCategoryProducts";
import {
  computeAvailableFilterOptions,
  filterProductsByAttributes,
  parseFilterParam,
} from "../utils/productFilters";

const CATEGORIES = [
  { slug: "noivas", label: "Noivas", activeBorderClass: "border-noivas" },
  { slug: "ternos", label: "Ternos", activeBorderClass: "border-ternos" },
  { slug: "festa", label: "Vestidos de Festa", activeBorderClass: "border-festa" },
];

const SEO_BY_CATEGORY = {
  noivas: {
    title: "Iara Noivas | Vestidos de Noiva - Coleções Exclusivas",
    description:
      "Descubra nossas coleções de vestidos de noiva elegantes e sofisticados para o seu grande dia.",
    ogTitle: "Iara Noivas - Coleções de Vestidos de Noiva",
    ogDescription: "Conheça nossas coleções de vestidos para noivas sofisticadas.",
  },
  ternos: {
    title: "Iara Noivas | Ternos - Coleções Exclusivas",
    description: "Descubra nossas coleções de ternos para casamentos e eventos especiais.",
    ogTitle: "Iara Noivas - Coleções de Ternos",
    ogDescription: "Conheça nossas coleções de ternos.",
  },
  festa: {
    title: "Iara Noivas | Vestidos de Festa - Coleções Exclusivas",
    description: "Descubra nossas coleções de vestidos de festa para todas as ocasiões.",
    ogTitle: "Iara Noivas - Coleções de Vestidos de Festa",
    ogDescription: "Conheça nossas coleções de vestidos de festa.",
  },
};

const CollectionsPage = ({ category = "noivas" }) => {
  const seo = SEO_BY_CATEGORY[category] ?? SEO_BY_CATEGORY.noivas;
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedColors = useMemo(() => parseFilterParam(searchParams.get("cor")), [searchParams]);
  const selectedModels = useMemo(() => parseFilterParam(searchParams.get("modelo")), [searchParams]);

  const categoryProducts = useMemo(() => flattenCategoryProducts(catalog, category), [category]);
  const filterOptions = useMemo(() => computeAvailableFilterOptions(categoryProducts), [categoryProducts]);
  const filteredProducts = useMemo(
    () => filterProductsByAttributes(categoryProducts, { colors: selectedColors, models: selectedModels }),
    [categoryProducts, selectedColors, selectedModels]
  );

  const hasActiveFilter = selectedColors.length > 0 || selectedModels.length > 0;

  const toggleParam = (paramName, value, selectedValues) => {
    const next = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];

    const nextParams = new URLSearchParams(searchParams);
    if (next.length > 0) {
      nextParams.set(paramName, next.join(","));
    } else {
      nextParams.delete(paramName);
    }
    setSearchParams(nextParams);
  };

  const handleClearFilters = () => setSearchParams({});

  return (
    <Layout>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta property="og:url" content={`https://www.iaranoivas.com/collections/${category}`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <nav
        className="mx-auto flex max-w-6xl justify-center gap-6 border-b border-hairline px-4 pt-16 sm:px-6"
        aria-label="Categorias"
      >
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            to={`/collections/${cat.slug}`}
            className={`border-b-2 py-2 font-label text-xs uppercase tracking-wide transition-colors ${
              category === cat.slug
                ? `${cat.activeBorderClass} text-ink`
                : "border-transparent text-ink/70 hover:text-ink"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </nav>

      <ProductFilterBar
        colorOptions={filterOptions.colors}
        modelOptions={filterOptions.models}
        selectedColors={selectedColors}
        selectedModels={selectedModels}
        onToggleColor={(color) => toggleParam("cor", color, selectedColors)}
        onToggleModel={(model) => toggleParam("modelo", model, selectedModels)}
        onClear={handleClearFilters}
      />

      {hasActiveFilter ? (
        <FilteredProductGrid products={filteredProducts} onClearFilters={handleClearFilters} />
      ) : (
        <CollectionGrid category={category} />
      )}
    </Layout>
  );
};

export default CollectionsPage;
```

- [ ] **Step 6: Rodar o teste da página e confirmar que passa**

Run: `npm test -- --watchAll=false --testPathPattern=CollectionsPage`
Expected: PASS (4 testes)

- [ ] **Step 7: Rodar a suíte inteira de novo (regressão)**

Run: `npm test -- --watchAll=false`
Expected: PASS em tudo, incluindo `CollectionGrid.test.js` e `CollectionId.test.js` sem nenhuma alteração neles.

- [ ] **Step 8: Commit**

```bash
git add frontend/src/pages/CollectionsPage.js frontend/src/tests/__mocks__/react-router-dom.js frontend/src/tests/CollectionsPage.test.js
git commit -m "feat: liga filtro de cor/modelo em CollectionsPage, sincronizado com a URL"
```

---

### Task 7: Cadastrar modelo real nos 3 produtos placeholder de `festa.js`

**Files:**
- Modify: `frontend/src/data/catalog/festa.js`

Único caso desta categoria: só 3 produtos, todos com foto placeholder, e os dois modelos citados pelo usuário (sereia, princesa) já cobrem taxonomia suficiente pra essa fase. `color` fica sem valor (nenhum dado de cor foi fornecido para festa ainda).

- [ ] **Step 1: Editar `frontend/src/data/catalog/festa.js`**

Trocar o array `products` (dentro do objeto `festa-glamour`) de:

```js
    products: [
      {
        id: "festa-glamour-p1",
        name: "Vestido Longo Dourado",
        image: placeholder,
      },
      {
        id: "festa-glamour-p2",
        name: "Vestido Midi Esmeralda",
        image: placeholder,
      },
      {
        id: "festa-glamour-p3",
        name: "Vestido de Festa Bordado",
        image: placeholder,
      },
    ],
```

para:

```js
    products: [
      {
        id: "festa-glamour-p1",
        name: "Vestido Longo Dourado",
        image: placeholder,
        model: "sereia",
      },
      {
        id: "festa-glamour-p2",
        name: "Vestido Midi Esmeralda",
        image: placeholder,
        model: "princesa",
      },
      {
        id: "festa-glamour-p3",
        name: "Vestido de Festa Bordado",
        image: placeholder,
        model: "sereia",
      },
    ],
```

- [ ] **Step 2: Rodar a suíte inteira**

Run: `npm test -- --watchAll=false`
Expected: PASS em tudo (nenhum teste usa o catálogo real de `festa.js` sem mock, então nada quebra).

- [ ] **Step 3: Commit**

```bash
git add frontend/src/data/catalog/festa.js
git commit -m "data: cadastra modelo (sereia/princesa) nos 3 produtos placeholder de festa"
```

---

### Task 8: Cadastrar modelo placeholder nos 139 produtos de `noivas.js`

**Files:**
- Create (temporário, apagado no fim desta task): `frontend/scripts/tag-placeholder-noivas-models.js`
- Modify: `frontend/src/data/catalog/noivas.js`

Os 139 vestidos de noiva reais ainda não têm classificação de modelo confirmada pelo usuário — as fotos e dados corretos virão depois. Por decisão explícita do usuário, cada produto recebe agora um valor **placeholder rotativo** entre os três modelos já conhecidos (`princesa`, `sereia`, `minimalista`), só para o filtro funcionar de ponta a ponta até então. `color` fica sem valor (nenhum dado de cor foi fornecido para noivas). Como são 139 edições mecânicas, um script de uma vez só faz a inserção — ele é apagado depois de rodar, porque não tem mais utilidade uma vez que os campos existem no arquivo.

- [ ] **Step 1: Criar o script de migração**

Criar `frontend/scripts/tag-placeholder-noivas-models.js`:

```js
#!/usr/bin/env node
// Script de uso único: insere `model:` placeholder (rotativo) em todo
// produto de src/data/catalog/noivas.js que ainda não tem esse campo.
// Rodar uma vez, conferir o resultado, apagar este arquivo.

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../src/data/catalog/noivas.js");
const MODELS = ["princesa", "sereia", "minimalista"];

let content = fs.readFileSync(filePath, "utf8");
let count = 0;

content = content.replace(/^( *)id: "([\w-]+-p\d+)",$/gm, (match, indent, id) => {
  const model = MODELS[count % MODELS.length];
  count += 1;
  return `${indent}id: "${id}",\n${indent}model: "${model}", // placeholder - substituir pelo modelo real`;
});

fs.writeFileSync(filePath, content);
console.log(`Adicionado "model:" em ${count} produtos de noivas.js.`);
```

- [ ] **Step 2: Rodar o script**

Run: `cd frontend && node scripts/tag-placeholder-noivas-models.js`
Expected: imprime `Adicionado "model:" em 139 produtos de noivas.js.`

- [ ] **Step 3: Conferir o resultado**

Run: `grep -c 'model: "' frontend/src/data/catalog/noivas.js`
Expected: `139`

Abrir `frontend/src/data/catalog/noivas.js` e conferir visualmente que os primeiros produtos ficaram assim (o `id` de cada produto continua igual, só ganhou a linha `model:` logo abaixo):

```js
      {
        id: "vestidos-petrova-p1",
        model: "princesa", // placeholder - substituir pelo modelo real
        name: "Modernice",
        image: img_3_assets_images_ImagensVestidos_Alvor_imagem_2,
      },
```

- [ ] **Step 4: Rodar a suíte inteira e o build**

Run: `npm test -- --watchAll=false`
Expected: PASS em tudo (testes existentes usam catálogo mockado, não são afetados pelo conteúdo real de `noivas.js`).

Run: `npm run build`
Expected: build conclui sem erro (confirma que o script não quebrou a sintaxe do arquivo).

- [ ] **Step 5: Apagar o script de migração**

Run: `rm frontend/scripts/tag-placeholder-noivas-models.js`

- [ ] **Step 6: Commit**

```bash
git add frontend/src/data/catalog/noivas.js
git rm frontend/scripts/tag-placeholder-noivas-models.js
git commit -m "data: cadastra modelo placeholder rotativo nos 139 produtos de noivas (temporário até dados reais)"
```

---

### Task 9: Verificação final

**Files:** nenhum (só verificação)

- [ ] **Step 1: Suíte completa**

Run: `cd frontend && npm test -- --watchAll=false`
Expected: todos os testes passam, incluindo os 6 arquivos de teste novos desta feature e os já existentes.

- [ ] **Step 2: Build de produção**

Run: `npm run build`
Expected: build conclui sem erro.

- [ ] **Step 3: Smoke test manual no navegador**

Com `npm start` rodando, verificar manualmente:
1. `/collections/noivas` — vitrine de coleções aparece normalmente; barra de filtro mostra cores/modelos disponíveis (`princesa`, `sereia`, `minimalista`, sem cores).
2. Clicar num modelo — a página troca para a grade com contagem de resultados; a URL ganha `?modelo=sereia` (ou equivalente).
3. Clicar em "Limpar filtros" — volta pra vitrine de coleções, URL sem query params.
4. `/collections/festa` — barra de filtro mostra `sereia`/`princesa`; filtrar funciona cruzando a única coleção existente.
5. `/collections/ternos` — barra de filtro mostra "Filtro em breve" (nenhum produto tagueado ainda); vitrine de coleções aparece normalmente.
6. Dentro de uma coleção (`/collections/vestidos-petrova`), o card de produto (favoritar, curtir, WhatsApp, compartilhar) continua funcionando como antes.

- [ ] **Step 4: Commit final (se algo precisar de ajuste do smoke test)**

Se o smoke test não indicar nenhum ajuste, esta task não gera commit — as Tasks 1–8 já cobrem tudo.
