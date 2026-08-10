# Collections Hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the bare `/collections` route into a visual chooser between the three product categories (noivas, ternos, festa) instead of it silently defaulting into the noivas grid.

**Architecture:** `CollectionsPage` (`frontend/src/pages/CollectionsPage.js`) branches on whether a `category` prop was passed. When it wasn't (the bare `/collections` route in `App.js` renders `<CollectionsPage />` with no props), it renders a new `CollectionsHub` component instead of the existing tab-nav + filter bar + grid. When a category *is* passed (via `CollectionSlugRouter` for `/collections/noivas|ternos|festa`), behavior is unchanged. No new routes, no changes to `App.js`, `CollectionSlugRouter`, `CollectionId`, or `Header`.

**Tech Stack:** React 19, react-router-dom v7, Tailwind CSS, react-lazy-load-image-component, react-helmet-async, Jest + Testing Library (existing `frontend/jest.config.js` mocks `react-router-dom`, `gsap`, and all image extensions — see Global Constraints).

## Global Constraints

- No new routes and no changes to `App.js`, `CollectionSlugRouter.js`, `CollectionId.js`, or `Header.js` — spec's "Fora de escopo".
- No new npm dependencies.
- Visual style must reuse existing tokens only: `border-hairline`, `bg-surface`, `text-ink`, `font-display` (Fraunces), `font-body` (Manrope), `font-label` (Space Grotesk), category tint colors `noivas`/`ternos`/`festa` already in `tailwind.config.js`. Sharp corners (no `rounded-*` on the cards), matching the rest of the site.
- Card title, description, and CTA text must be visible by default, not only on `:hover` (accessibility requirement from the spec).
- Each card is a single `Link` wrapping the whole card (not just the CTA).
- Whole-card `focus-visible` ring for keyboard navigation.
- Images: noivas → `frontend/src/assets/images/ImagensVestidos/Alvor/imagem_5.webp` (already used elsewhere, confirmed to exist); festa → `frontend/src/assets/images/MadrinhaOtimizada/azul-marinho_princesa_longo_v.webp` (confirmed to exist); ternos → `frontend/src/assets/images/placeholders/foto-em-breve.svg` (only asset available today; confirmed to exist) — centralize these in one data file so swapping later is a one-line edit.
- Responsive: cards stacked full-width through tablet, three side-by-side only at `lg:` (1024px+) — `grid-cols-1 lg:grid-cols-3`.
- New `Helmet` SEO block for the hub state, separate from the existing `SEO_BY_CATEGORY` map.

---

### Task 1: `CollectionsHub` component + data

**Files:**
- Create: `frontend/src/data/collectionsHub.js`
- Create: `frontend/src/components/CollectionsHub.js`
- Test: `frontend/src/tests/CollectionsHub.test.js`

**Interfaces:**
- Consumes: `useReveal` from `frontend/src/hooks/useReveal.js` (existing, no signature change — returns a ref to attach via `ref={...}`).
- Produces: default export `CollectionsHub` — a React component taking no props, rendered by Task 2 as `<CollectionsHub />`. Renders an `<h1>` and three `Link`s to `/collections/noivas`, `/collections/ternos`, `/collections/festa` in that order.

- [ ] **Step 1: Write the failing test**

Create `frontend/src/tests/CollectionsHub.test.js`:

```jsx
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CollectionsHub from "../components/CollectionsHub";

const renderHub = () =>
  render(
    <BrowserRouter>
      <CollectionsHub />
    </BrowserRouter>
  );

describe("CollectionsHub", () => {
  test("Mostra o título principal e a introdução", () => {
    renderHub();
    expect(
      screen.getByRole("heading", { level: 1, name: "Encontre o look perfeito para o seu momento" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Descubra nossas coleções e encontre o visual ideal para uma ocasião inesquecível."
      )
    ).toBeInTheDocument();
  });

  test("Mostra um card por categoria com título, descrição e CTA sempre visíveis", () => {
    renderHub();

    expect(screen.getByRole("heading", { level: 2, name: "Vestidos de Noiva" })).toBeInTheDocument();
    expect(screen.getByText("Para o seu grande dia.")).toBeInTheDocument();

    expect(screen.getByRole("heading", { level: 2, name: "Ternos" })).toBeInTheDocument();
    expect(screen.getByText("Elegância para momentos especiais.")).toBeInTheDocument();

    expect(screen.getByRole("heading", { level: 2, name: "Vestidos de Festa" })).toBeInTheDocument();
    expect(screen.getByText("Para celebrar ocasiões inesquecíveis.")).toBeInTheDocument();

    expect(screen.getAllByText("Conheça a coleção →")).toHaveLength(3);
  });

  test("Cada card é um link inteiro, na ordem noivas/ternos/festa", () => {
    renderHub();

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("href", "/collections/noivas");
    expect(links[1]).toHaveAttribute("href", "/collections/ternos");
    expect(links[2]).toHaveAttribute("href", "/collections/festa");
  });

  test("Imagens têm texto alternativo descritivo", () => {
    renderHub();
    expect(screen.getByAltText("Vestido de noiva da coleção Alvor, Iara Noivas")).toBeInTheDocument();
    expect(screen.getByAltText("Ternos Iara Noivas — fotos em breve")).toBeInTheDocument();
    expect(
      screen.getByAltText("Vestido de festa azul-marinho estilo princesa, Iara Noivas")
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend && npx jest --config=jest.config.js src/tests/CollectionsHub.test.js --verbose`
Expected: FAIL — `Cannot find module '../components/CollectionsHub'` (neither the component nor the data file exist yet).

- [ ] **Step 3: Create the data file**

Create `frontend/src/data/collectionsHub.js`:

```js
// src/data/collectionsHub.js
//
// Conteúdo dos 3 cards da vitrine de coleções (/collections sem categoria).
// Trocar `image`/`imageAlt` aqui quando houver fotos reais — hoje "ternos"
// usa o mesmo placeholder do catálogo (ver data/catalog/ternos.js), pois
// ainda não existem fotos reais de ternos.
import imgNoivas from "../assets/images/ImagensVestidos/Alvor/imagem_5.webp";
import imgTernos from "../assets/images/placeholders/foto-em-breve.svg";
import imgFesta from "../assets/images/MadrinhaOtimizada/azul-marinho_princesa_longo_v.webp";

const collectionsHub = [
  {
    slug: "noivas",
    title: "Vestidos de Noiva",
    description: "Para o seu grande dia.",
    ctaLabel: "Conheça a coleção →",
    image: imgNoivas,
    imageAlt: "Vestido de noiva da coleção Alvor, Iara Noivas",
  },
  {
    slug: "ternos",
    title: "Ternos",
    description: "Elegância para momentos especiais.",
    ctaLabel: "Conheça a coleção →",
    image: imgTernos,
    imageAlt: "Ternos Iara Noivas — fotos em breve",
  },
  {
    slug: "festa",
    title: "Vestidos de Festa",
    description: "Para celebrar ocasiões inesquecíveis.",
    ctaLabel: "Conheça a coleção →",
    image: imgFesta,
    imageAlt: "Vestido de festa azul-marinho estilo princesa, Iara Noivas",
  },
];

export default collectionsHub;
```

- [ ] **Step 4: Create the component**

Create `frontend/src/components/CollectionsHub.js`:

```jsx
// src/components/CollectionsHub.js
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import collectionsHub from "../data/collectionsHub";
import { useReveal } from "../hooks/useReveal";

const ACCENT_CLASSES = {
  noivas: "bg-noivas",
  ternos: "bg-ternos",
  festa: "bg-festa",
};

const CollectionsHub = () => {
  const revealRef = useReveal();

  return (
    <section ref={revealRef} className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
      <h1 className="font-display text-3xl font-medium text-ink sm:text-4xl">
        Encontre o look perfeito para o seu momento
      </h1>
      <p className="mx-auto mt-4 max-w-xl font-body text-sm text-ink/70 sm:text-base">
        Descubra nossas coleções e encontre o visual ideal para uma ocasião inesquecível.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-8 text-left lg:grid-cols-3">
        {collectionsHub.map((item) => (
          <Link
            key={item.slug}
            to={`/collections/${item.slug}`}
            className="group block border border-hairline bg-surface transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <span aria-hidden="true" className={`block h-1 w-full ${ACCENT_CLASSES[item.slug]}`} />

            <div className="relative aspect-[4/5] overflow-hidden">
              <LazyLoadImage
                effect="blur"
                src={item.image}
                alt={item.imageAlt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                wrapperClassName="block h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
            </div>

            <div className="p-6">
              <h2 className="font-display text-xl font-medium text-ink">{item.title}</h2>
              <p className="mt-2 font-body text-sm text-ink/70">{item.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 font-label text-xs uppercase tracking-wide text-accent transition-transform duration-300 group-hover:translate-x-1">
                {item.ctaLabel}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CollectionsHub;
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd frontend && npx jest --config=jest.config.js src/tests/CollectionsHub.test.js --verbose`
Expected: PASS (4 tests).

- [ ] **Step 6: Commit**

```bash
git add frontend/src/data/collectionsHub.js frontend/src/components/CollectionsHub.js frontend/src/tests/CollectionsHub.test.js
git commit -m "feat: add CollectionsHub showcase component"
```

---

### Task 2: Wire the hub into `CollectionsPage` for the bare `/collections` route

**Files:**
- Modify: `frontend/src/pages/CollectionsPage.js`
- Test: `frontend/src/tests/CollectionsPage.test.js`

**Interfaces:**
- Consumes: `CollectionsHub` default export from Task 1 (`frontend/src/components/CollectionsHub.js`), no props.
- Produces: `CollectionsPage` component's existing prop contract changes in one way — `category` no longer defaults to `"noivas"` internally. Callers that already pass an explicit `category` (all current callers: `CollectionSlugRouter`, all existing tests) are unaffected. The only caller that passed no `category` at all is `App.js`'s bare `/collections` route, which will now render the hub.

- [ ] **Step 1: Write the failing test**

Append to `frontend/src/tests/CollectionsPage.test.js` (after the existing `describe("CollectionsPage", ...)` block, same file, same imports already present):

```jsx
describe("CollectionsPage — vitrine de escolha (sem categoria)", () => {
  test("Sem categoria informada, mostra a vitrine de escolha em vez da grade padrão", () => {
    render(
      <BrowserRouter>
        <HelmetProvider>
          <MoodboardProvider>
            <CollectionsPage />
          </MoodboardProvider>
        </HelmetProvider>
      </BrowserRouter>
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Encontre o look perfeito para o seu momento" })
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Filtrar por cor verde")).not.toBeInTheDocument();
    expect(screen.queryByText("Petrova - Coleção Alvor")).not.toBeInTheDocument();
  });

  test("Com categoria informada, continua mostrando a grade da categoria (comportamento inalterado)", () => {
    renderPage("noivas");
    expect(
      screen.queryByRole("heading", { level: 1, name: "Encontre o look perfeito para o seu momento" })
    ).not.toBeInTheDocument();
    expect(screen.getByText("Petrova - Coleção Alvor")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend && npx jest --config=jest.config.js src/tests/CollectionsPage.test.js --verbose`
Expected: FAIL on the first new test — `Encontre o look perfeito para o seu momento` heading not found (the page still defaults to the noivas grid).

- [ ] **Step 3: Modify `CollectionsPage.js`**

In `frontend/src/pages/CollectionsPage.js`:

1. Add the import (with the other component imports near the top):

```js
import CollectionsHub from "../components/CollectionsHub";
```

2. Change the component signature from:

```js
const CollectionsPage = ({ category = "noivas" }) => {
  const seo = SEO_BY_CATEGORY[category] ?? SEO_BY_CATEGORY.noivas;
  const [searchParams, setSearchParams] = useSearchParams();
```

to:

```js
const CollectionsPage = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
```

(the `seo` lookup moves further down — see step 4 below — since it no longer applies to the no-category branch).

3. Change the `categoryProducts` memo from:

```js
const categoryProducts = useMemo(() => flattenCategoryProducts(catalog, category), [category]);
```

to:

```js
const categoryProducts = useMemo(
  () => (category ? flattenCategoryProducts(catalog, category) : []),
  [category]
);
```

4. Immediately after the existing `const handleClearFilters = () => setSearchParams({}, { replace: true });` line, and *before* the final `return (...)`, insert the early-return branch and the (now relocated) `seo` lookup:

```js
  if (!category) {
    return (
      <Layout>
        <Helmet>
          <title>Iara Noivas | Coleções — Vestidos de Noiva, Ternos e Vestidos de Festa</title>
          <meta
            name="description"
            content="Descubra as coleções da Iara Noivas: vestidos de noiva, ternos e vestidos de festa em looks exclusivos para cada ocasião."
          />
          <meta property="og:title" content="Iara Noivas - Coleções" />
          <meta
            property="og:description"
            content="Vestidos de noiva, ternos e vestidos de festa em coleções exclusivas."
          />
          <meta property="og:url" content="https://www.iaranoivas.com/collections" />
          <meta property="og:type" content="website" />
        </Helmet>

        <CollectionsHub />
      </Layout>
    );
  }

  const seo = SEO_BY_CATEGORY[category] ?? SEO_BY_CATEGORY.noivas;
```

The existing `return (<Layout>...</Layout>)` block below (nav + `ProductFilterBar` + grid) stays exactly as it is today — it now only executes when `category` is truthy.

- [ ] **Step 4: Run test to verify it passes**

Run: `cd frontend && npx jest --config=jest.config.js src/tests/CollectionsPage.test.js --verbose`
Expected: PASS (all original tests + 2 new ones).

- [ ] **Step 5: Run the full test suite to check for regressions**

Run: `cd frontend && npm test`
Expected: PASS — no other test file references `CollectionsPage` with an implicit default category, so nothing else should be affected.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/pages/CollectionsPage.js frontend/src/tests/CollectionsPage.test.js
git commit -m "feat: show collections hub on bare /collections route"
```
