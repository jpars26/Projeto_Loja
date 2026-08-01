# Experiência de Scroll Narrativo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar movimento (revelações, capítulos pinados, parallax, transição de página) ao site da Iara Noivas usando GSAP + ScrollTrigger, corrigindo no processo dois problemas concretos de mobile (corte do vídeo do Hero e rótulos de produto invisíveis em touch).

**Architecture:** Uma camada de hooks reutilizáveis em `frontend/src/hooks/` (`useReveal`, `useParallax`, `usePinnedChapter`) encapsula toda a lógica GSAP/ScrollTrigger, incluindo respeito a `prefers-reduced-motion` e limpeza de instâncias via `gsap.context().revert()`. Um componente `PageTransition` em `frontend/src/components/` envolve `<Routes>` em `App.js` para a transição entre páginas. Cada página/componente visual consome esses hooks sem precisar conhecer GSAP diretamente.

**Tech Stack:** React 19, Vite, Tailwind CSS, GSAP + ScrollTrigger (novo), Jest + Testing Library (mocks manuais de `gsap`/`gsap/ScrollTrigger`).

**Spec:** `docs/superpowers/specs/2026-08-01-scroll-narrativo-design.md`

## Global Constraints

- Não reescrever conteúdo/copy das seções — só estrutura, layout e movimento.
- Não mexer no `Header.js` (links de Ternos/Festa) — pendência registrada à parte no spec.
- Não introduzir fotografia nova para Ternos/Vestidos de Festa — continuam com placeholder.
- Não alterar dados, Firebase ou rotas existentes.
- Toda animação de scroll deve respeitar `prefers-reduced-motion` via `gsap.matchMedia()` — não opcional.
- Todo `ScrollTrigger`/`gsap.matchMedia` criado num hook deve ser revertido no unmount via `gsap.context().revert()` — nenhum hook pode vazar instâncias entre trocas de rota.
- Uso de `pin` (seção pinada) restrito a no máximo 2 capítulos por página — nunca em toda seção.
- **Baseline de testes conhecida antes deste plano:** `npm test` (dentro de `frontend/`) já falha em 2 de 23 testes, por motivos não relacionados a este trabalho:
  - `src/tests/HomePage.test.js` — `getByTestId("instagram-widget")` não encontra nada porque `InstagramWidget` não está importado em `HomePage.js` (regressão da reformulação anterior, fora de escopo).
  - `src/tests/AboutUs.test.js` — o teste "Botão de agendar atendimento redireciona corretamente" espera um `href` com `?text=...` que o botão atual não tem.
  - Nenhuma tarefa deste plano deve corrigir essas duas falhas nem piorar o total. Sempre que um passo disser "rode a suíte completa", o resultado esperado é **"mesmas 2 falhas de antes, nenhuma nova"**, a menos que o passo diga explicitamente o contrário.

---

## File Structure

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `frontend/package.json` | modificar | adiciona dependência `gsap` |
| `frontend/jest.config.js` | modificar | mapeia `gsap` e `gsap/ScrollTrigger` para os mocks de teste |
| `frontend/src/tests/__mocks__/gsap.js` | criar | mock manual do módulo `gsap` |
| `frontend/src/tests/__mocks__/ScrollTrigger.js` | criar | mock manual do módulo `gsap/ScrollTrigger` |
| `frontend/src/hooks/useReveal.js` | criar | hook de revelação suave (fade/slide) ao entrar na tela |
| `frontend/src/hooks/useParallax.js` | criar | hook de parallax (scrub) para imagem/vídeo |
| `frontend/src/hooks/usePinnedChapter.js` | criar | hook de seção pinada com itens que se revezam |
| `frontend/src/components/PageTransition.js` | criar | wrapper de transição de rota (crossfade) |
| `frontend/src/App.js` | modificar | envolve `<Routes>` com `<PageTransition>` |
| `frontend/src/components/Hero.js` | modificar | corrige recorte do vídeo em mobile + aplica parallax |
| `frontend/src/components/CollectionGrid.js` | modificar | rótulo do produto sempre visível em touch + `useReveal` |
| `frontend/src/components/Sections.js` | modificar | capítulo pinado em "Por que Escolher" + `useReveal` no resto |
| `frontend/src/pages/AboutUs.js` | modificar | capítulo pinado em "Diferenciais" + `useReveal` no resto |
| `frontend/src/pages/CollectionId.js` | modificar | `useParallax` no banner da coleção |
| `frontend/src/pages/Contact.js` | modificar | `useReveal` em todas as seções |
| `frontend/src/tests/useReveal.test.js` | criar | testa o hook `useReveal` |
| `frontend/src/tests/useParallax.test.js` | criar | testa o hook `useParallax` |
| `frontend/src/tests/usePinnedChapter.test.js` | criar | testa o hook `usePinnedChapter` |
| `frontend/src/tests/PageTransition.test.js` | criar | testa o componente `PageTransition` |
| `frontend/src/tests/Hero.test.js` | criar | testa o recorte mobile e o link do Hero |
| `frontend/src/tests/CollectionGrid.test.js` | modificar | adiciona teste de visibilidade do rótulo sem hover |
| `frontend/src/tests/CollectionId.test.js` | criar | primeira cobertura de teste da página (não existia) |
| `frontend/src/tests/Contact.test.js` | criar | primeira cobertura de teste da página (não existia) |

---

### Task 1: Dependência GSAP + mocks de teste

**Files:**
- Modify: `frontend/package.json`
- Create: `frontend/src/tests/__mocks__/gsap.js`
- Create: `frontend/src/tests/__mocks__/ScrollTrigger.js`
- Modify: `frontend/jest.config.js`

**Interfaces:**
- Consumes: nada (tarefa de fundação).
- Produces: `gsap` importável como `import gsap from "gsap"` (default export com `registerPlugin`, `context`, `matchMedia`, `fromTo`, `to`, `set`, `timeline`, `utils.toArray`). `ScrollTrigger` importável como `import { ScrollTrigger } from "gsap/ScrollTrigger"`. Em ambiente Jest, ambos resolvem para os mocks abaixo — todas as tarefas seguintes dependem disso para não quebrar a suíte.

- [ ] **Step 1: Instalar o GSAP**

Rodar dentro de `frontend/`:

```bash
npm install gsap
```

- [ ] **Step 2: Rodar a suíte para confirmar a baseline antes de qualquer mudança de código**

Run: `npm test -- --silent`
Expected: `Test Suites: 2 failed, 4 passed, 6 total` / `Tests: 2 failed, 21 passed, 23 total` (as duas falhas descritas em "Global Constraints" — `HomePage.test.js` e `AboutUs.test.js`). Isso confirma que `npm install gsap` sozinho não quebrou nada.

- [ ] **Step 3: Criar o mock manual de `gsap`**

Criar `frontend/src/tests/__mocks__/gsap.js`:

```js
function createTimeline() {
  const timeline = {};
  timeline.to = jest.fn(() => timeline);
  timeline.fromTo = jest.fn(() => timeline);
  timeline.set = jest.fn(() => timeline);
  return timeline;
}

const gsap = {
  registerPlugin: jest.fn(),
  context: jest.fn((callback) => {
    callback();
    return { revert: jest.fn() };
  }),
  matchMedia: jest.fn(() => ({
    add: jest.fn((_query, callback) => {
      if (typeof callback === "function") {
        callback({ conditions: {} });
      }
    }),
    revert: jest.fn(),
  })),
  fromTo: jest.fn(),
  to: jest.fn(),
  set: jest.fn(),
  timeline: jest.fn(createTimeline),
  utils: {
    toArray: jest.fn((value) => (Array.isArray(value) ? value : [value])),
  },
};

module.exports = gsap;
module.exports.default = gsap;
```

- [ ] **Step 4: Criar o mock manual de `gsap/ScrollTrigger`**

Criar `frontend/src/tests/__mocks__/ScrollTrigger.js`:

```js
const ScrollTrigger = {
  refresh: jest.fn(),
  create: jest.fn(),
  getAll: jest.fn(() => []),
};

module.exports = { ScrollTrigger };
```

- [ ] **Step 5: Mapear os módulos no Jest**

Editar `frontend/jest.config.js`, adicionando duas linhas em `moduleNameMapper` (antes da linha do mock de imagem):

```js
module.exports = {
  roots: ["<rootDir>/src/tests"],
  moduleDirectories: ["node_modules", "<rootDir>/src", "<rootDir>/src/tests"],
  moduleNameMapper: {
    "^react-router-dom$": "<rootDir>/src/tests/__mocks__/react-router-dom.js",
    "^gsap$": "<rootDir>/src/tests/__mocks__/gsap.js",
    "^gsap/ScrollTrigger$": "<rootDir>/src/tests/__mocks__/ScrollTrigger.js",
    "^.+\\.(jpg|jpeg|png|gif|webp|svg|mp4|mov|webm)$": "<rootDir>/src/tests/__mocks__/fileMock.js",
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-router-dom)/)",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testEnvironment: "jsdom",
};
```

- [ ] **Step 6: Rodar a suíte de novo para confirmar que o mapeamento não quebrou nada**

Run: `npm test -- --silent`
Expected: mesmo resultado do Step 2 (`2 failed, 21 passed`) — os mocks existem mas ainda não são usados por nenhum código.

- [ ] **Step 7: Commit**

```bash
git add frontend/package.json frontend/package-lock.json frontend/jest.config.js frontend/src/tests/__mocks__/gsap.js frontend/src/tests/__mocks__/ScrollTrigger.js
git commit -m "chore: add gsap dependency and jest mocks for scroll animation"
```

---

### Task 2: Hook `useReveal`

**Files:**
- Create: `frontend/src/hooks/useReveal.js`
- Create: `frontend/src/tests/useReveal.test.js`

**Interfaces:**
- Consumes: `gsap` e `ScrollTrigger` do Task 1.
- Produces: `useReveal(options?: { y?: number, duration?: number, start?: string }) => React.RefObject` de `frontend/src/hooks/useReveal.js`. Tasks 6, 7, 8, 9 e 11 consomem este hook.

- [ ] **Step 1: Escrever o teste que falha**

Criar `frontend/src/tests/useReveal.test.js`:

```js
import { render } from "@testing-library/react";
import gsap from "gsap";
import { useReveal } from "../hooks/useReveal";

function RevealedBox() {
  const ref = useReveal();
  return <div ref={ref}>conteúdo revelado</div>;
}

describe("useReveal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("anima o elemento de opacidade 0 para 1 via gsap.fromTo", () => {
    render(<RevealedBox />);

    expect(gsap.fromTo).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ opacity: 0, y: 24 }),
      expect.objectContaining({
        opacity: 1,
        y: 0,
        scrollTrigger: expect.objectContaining({ toggleActions: "play none none reverse" }),
      })
    );
  });

  test("registra a limpeza via gsap.context ao desmontar", () => {
    const { unmount } = render(<RevealedBox />);
    const contextResult = gsap.context.mock.results[0].value;

    unmount();

    expect(contextResult.revert).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npx jest --config=jest.config.js src/tests/useReveal.test.js`
Expected: FAIL — `Cannot find module '../hooks/useReveal'`

- [ ] **Step 3: Implementar o hook**

Criar `frontend/src/hooks/useReveal.js`:

```js
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useReveal = ({ y = 24, duration = 0.6, start = "top 85%" } = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          element,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start,
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(element, { opacity: 1, y: 0 });
      });
    }, element);

    return () => ctx.revert();
  }, [y, duration, start]);

  return ref;
};
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npx jest --config=jest.config.js src/tests/useReveal.test.js`
Expected: PASS (2 testes)

- [ ] **Step 5: Commit**

```bash
git add frontend/src/hooks/useReveal.js frontend/src/tests/useReveal.test.js
git commit -m "feat: add useReveal scroll animation hook"
```

---

### Task 3: Hook `useParallax`

**Files:**
- Create: `frontend/src/hooks/useParallax.js`
- Create: `frontend/src/tests/useParallax.test.js`

**Interfaces:**
- Consumes: `gsap`/`ScrollTrigger` do Task 1.
- Produces: `useParallax(options?: { distance?: number }) => React.RefObject` de `frontend/src/hooks/useParallax.js`. Tasks 6 e 10 consomem este hook.

- [ ] **Step 1: Escrever o teste que falha**

Criar `frontend/src/tests/useParallax.test.js`:

```js
import { render } from "@testing-library/react";
import gsap from "gsap";
import { useParallax } from "../hooks/useParallax";

function ParallaxBox() {
  const ref = useParallax({ distance: 60 });
  return <div ref={ref}>fundo</div>;
}

describe("useParallax", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("anima o elemento em modo scrub, do metade negativa à metade positiva da distância", () => {
    render(<ParallaxBox />);

    expect(gsap.fromTo).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ y: -30 }),
      expect.objectContaining({
        y: 30,
        ease: "none",
        scrollTrigger: expect.objectContaining({ scrub: true }),
      })
    );
  });

  test("limpa a animação ao desmontar", () => {
    const { unmount } = render(<ParallaxBox />);
    const contextResult = gsap.context.mock.results[0].value;

    unmount();

    expect(contextResult.revert).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npx jest --config=jest.config.js src/tests/useParallax.test.js`
Expected: FAIL — `Cannot find module '../hooks/useParallax'`

- [ ] **Step 3: Implementar o hook**

Criar `frontend/src/hooks/useParallax.js`:

```js
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useParallax = ({ distance = 60 } = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          element,
          { y: -distance / 2 },
          {
            y: distance / 2,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, element);

    return () => ctx.revert();
  }, [distance]);

  return ref;
};
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npx jest --config=jest.config.js src/tests/useParallax.test.js`
Expected: PASS (2 testes)

- [ ] **Step 5: Commit**

```bash
git add frontend/src/hooks/useParallax.js frontend/src/tests/useParallax.test.js
git commit -m "feat: add useParallax scroll animation hook"
```

---

### Task 4: Hook `usePinnedChapter`

**Files:**
- Create: `frontend/src/hooks/usePinnedChapter.js`
- Create: `frontend/src/tests/usePinnedChapter.test.js`

**Interfaces:**
- Consumes: `gsap`/`ScrollTrigger` do Task 1.
- Produces: `usePinnedChapter(itemCount: number, options?: { stepDistance?: number }) => { sectionRef: React.RefObject, setItemRef: (index: number) => (node: HTMLElement | null) => void }` de `frontend/src/hooks/usePinnedChapter.js`. Tasks 8 e 9 consomem este hook.

- [ ] **Step 1: Escrever o teste que falha**

Criar `frontend/src/tests/usePinnedChapter.test.js`:

```js
import { render } from "@testing-library/react";
import gsap from "gsap";
import { usePinnedChapter } from "../hooks/usePinnedChapter";

function ThreeItemChapter() {
  const { sectionRef, setItemRef } = usePinnedChapter(3);
  return (
    <section ref={sectionRef} data-testid="chapter">
      <div ref={setItemRef(0)}>Item Um</div>
      <div ref={setItemRef(1)}>Item Dois</div>
      <div ref={setItemRef(2)}>Item Três</div>
    </section>
  );
}

describe("usePinnedChapter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("cria uma timeline gsap com scrollTrigger pinado quando seção e itens estão montados", () => {
    render(<ThreeItemChapter />);

    expect(gsap.timeline).toHaveBeenCalledWith(
      expect.objectContaining({
        scrollTrigger: expect.objectContaining({ pin: true, scrub: 1 }),
      })
    );
  });

  test("mantém todos os itens no DOM independente do estado da animação", () => {
    const { getByText } = render(<ThreeItemChapter />);

    expect(getByText("Item Um")).toBeInTheDocument();
    expect(getByText("Item Dois")).toBeInTheDocument();
    expect(getByText("Item Três")).toBeInTheDocument();
  });

  test("limpa a timeline ao desmontar", () => {
    const { unmount } = render(<ThreeItemChapter />);
    const contextResult = gsap.context.mock.results[0].value;

    unmount();

    expect(contextResult.revert).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npx jest --config=jest.config.js src/tests/usePinnedChapter.test.js`
Expected: FAIL — `Cannot find module '../hooks/usePinnedChapter'`

- [ ] **Step 3: Implementar o hook**

Criar `frontend/src/hooks/usePinnedChapter.js`:

```js
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const usePinnedChapter = (itemCount, { stepDistance = 400 } = {}) => {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);
  itemRefs.current = Array.from({ length: itemCount }, (_, i) => itemRefs.current[i] ?? null);

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemRefs.current;
    if (!section || items.some((item) => !item)) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(items, { opacity: 0, y: 24 });
        gsap.set(items[0], { opacity: 1, y: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${stepDistance * (itemCount - 1)}`,
            pin: true,
            scrub: 1,
          },
        });

        items.forEach((item, index) => {
          if (index === 0) return;
          tl.to(items[index - 1], { opacity: 0, y: -24, duration: 0.3 }, index - 1);
          tl.fromTo(item, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3 }, index - 1);
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(items, { opacity: 1, y: 0 });
      });
    }, section);

    return () => ctx.revert();
  }, [itemCount, stepDistance]);

  const setItemRef = (index) => (node) => {
    itemRefs.current[index] = node;
  };

  return { sectionRef, setItemRef };
};
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npx jest --config=jest.config.js src/tests/usePinnedChapter.test.js`
Expected: PASS (3 testes)

- [ ] **Step 5: Commit**

```bash
git add frontend/src/hooks/usePinnedChapter.js frontend/src/tests/usePinnedChapter.test.js
git commit -m "feat: add usePinnedChapter scroll animation hook"
```

---

### Task 5: Componente `PageTransition` + integração no `App.js`

**Files:**
- Create: `frontend/src/components/PageTransition.js`
- Create: `frontend/src/tests/PageTransition.test.js`
- Modify: `frontend/src/App.js`

**Interfaces:**
- Consumes: `gsap` do Task 1; `useLocation` de `react-router-dom` (já mockado em `src/tests/__mocks__/react-router-dom.js`, sempre retorna `{ pathname: "/home" }` em teste).
- Produces: componente default `PageTransition({ children }) => JSX.Element` de `frontend/src/components/PageTransition.js`, usado em `App.js` envolvendo `<Routes>`.

- [ ] **Step 1: Escrever o teste que falha**

Criar `frontend/src/tests/PageTransition.test.js`:

```js
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import gsap from "gsap";
import PageTransition from "../components/PageTransition";

describe("PageTransition", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza os filhos normalmente", () => {
    render(
      <MemoryRouter>
        <PageTransition>
          <div>Conteúdo da página</div>
        </PageTransition>
      </MemoryRouter>
    );

    expect(screen.getByText("Conteúdo da página")).toBeInTheDocument();
  });

  test("dispara o fade de entrada via gsap ao montar", () => {
    render(
      <MemoryRouter>
        <PageTransition>
          <div>Conteúdo</div>
        </PageTransition>
      </MemoryRouter>
    );

    expect(gsap.fromTo).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ opacity: 0 }),
      expect.objectContaining({ opacity: 1 })
    );
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npx jest --config=jest.config.js src/tests/PageTransition.test.js`
Expected: FAIL — `Cannot find module '../components/PageTransition'`

- [ ] **Step 3: Implementar o componente**

Criar `frontend/src/components/PageTransition.js`:

```js
import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PageTransition = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power1.out" });
    });

    ScrollTrigger.refresh();

    return () => mm.revert();
  }, [location.pathname]);

  return (
    <div ref={containerRef} key={location.pathname}>
      {children}
    </div>
  );
};

export default PageTransition;
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npx jest --config=jest.config.js src/tests/PageTransition.test.js`
Expected: PASS (2 testes)

- [ ] **Step 5: Envolver `<Routes>` com `<PageTransition>` em `App.js`**

Editar `frontend/src/App.js` (arquivo completo, para deixar claro onde `PageTransition` entra):

```js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import CollectionsPage from "./pages/CollectionsPage";
import MoodboardPage from "./pages/MoodboardPage";
import { MoodboardProvider } from "./context/MoodboardContext";
import CollectionSlugRouter from "./pages/CollectionSlugRouter";
import Contact from "./pages/Contact";
import { Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";

function App() {
  return (
    <HelmetProvider>
      <MoodboardProvider>
        <Router>
          <ScrollToTop />
          <PageTransition>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              {/* Páginas principais */}
              <Route path="/home" element={<HomePage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/moodboard" element={<MoodboardPage />} />
              <Route path="/collections/:slug" element={<CollectionSlugRouter />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </PageTransition>
        </Router>
      </MoodboardProvider>
    </HelmetProvider>
  );
}

export default App;
```

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/PageTransition.js frontend/src/tests/PageTransition.test.js frontend/src/App.js
git commit -m "feat: add page transition wrapper and wire it into App routing"
```

---

### Task 6: `Hero.js` — recorte mobile do vídeo + parallax

**Files:**
- Modify: `frontend/src/components/Hero.js`
- Create: `frontend/src/tests/Hero.test.js`

**Interfaces:**
- Consumes: `useParallax` do Task 3.

- [ ] **Step 1: Escrever o teste que falha**

Criar `frontend/src/tests/Hero.test.js`:

```js
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Hero from "../components/Hero";

describe("Hero Component", () => {
  test("aplica recorte ajustado para mobile e reverte para centro em telas maiores", () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );

    const video = screen.getByTestId("hero-section").querySelector("video");
    expect(video).toHaveClass("object-[center_20%]");
    expect(video).toHaveClass("sm:object-center");
    expect(video).toHaveClass("scale-110");
  });

  test("exibe o texto principal e o link para a coleção", () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );

    expect(screen.getByText("Vestidos que contam a sua história")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ver coleção/i })).toHaveAttribute("href", "/collections");
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npx jest --config=jest.config.js src/tests/Hero.test.js`
Expected: FAIL — as classes `object-[center_20%]`, `sm:object-center` e `scale-110` ainda não existem no componente.

- [ ] **Step 3: Atualizar o componente**

Editar `frontend/src/components/Hero.js` (arquivo completo):

```js
import { useState } from "react";
import { Link } from "react-router-dom";
import heroVideoWebm from "../assets/videos/videoCerto.webm";
import heroVideoMp4 from "../assets/videos/videoLoja.mp4";
import { useParallax } from "../hooks/useParallax";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const parallaxRef = useParallax({ distance: 60 });

  return (
    <section
      className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink sm:min-h-[85vh]"
      data-testid="hero-section"
    >
      <video
        ref={parallaxRef}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        className={`absolute inset-0 h-full w-full scale-110 object-cover object-[center_20%] transition-opacity duration-700 sm:object-center ${
          isLoaded ? "opacity-90" : "opacity-0"
        }`}
      >
        <source src={heroVideoWebm} type="video/webm" />
        <source src={heroVideoMp4} type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

      <div className="relative z-10 max-w-xl px-6 pb-14 sm:px-12 sm:pb-20">
        <p className="font-label text-xs uppercase tracking-[0.2em] text-bone/80">
          Iara Noivas
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium leading-tight text-bone sm:text-5xl">
          Vestidos que contam a sua história
        </h1>
        <p className="mt-4 max-w-md font-body text-sm text-bone/80 sm:text-base">
          Noivas, ternos e vestidos de festa em coleções exclusivas, feitos para o seu grande dia.
        </p>
        <Link
          to="/collections"
          className="mt-6 inline-block border border-bone px-5 py-2 font-label text-xs uppercase tracking-wide text-bone transition-colors hover:bg-bone hover:text-ink"
        >
          Ver Coleção
        </Link>
      </div>
    </section>
  );
};

export default Hero;
```

Nota: `object-[center_20%]` é um ponto de partida (enquadramento levemente deslocado para cima, comum quando o assunto principal do vídeo — vestido/casal — fica na metade superior do quadro). `scale-110` dá margem de 10% para o parallax (`useParallax({ distance: 60 })` desloca até ±30px) sem revelar bordas vazias.

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npx jest --config=jest.config.js src/tests/Hero.test.js`
Expected: PASS (2 testes)

- [ ] **Step 5: Verificação manual do enquadramento (não automatizável)**

Rodar `npm run dev`, abrir `http://localhost:3000/home` no navegador com viewport mobile (375×812) e desktop (1280×800). Se o assunto principal do vídeo ainda ficar cortado em retrato, ajustar o valor `20%` em `object-[center_20%]` (testar `10%`, `30%` etc.) até o enquadramento ficar correto — é um ajuste visual, não há valor certo calculável sem ver o vídeo renderizado.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/Hero.js frontend/src/tests/Hero.test.js
git commit -m "fix: correct hero video mobile crop and add parallax"
```

---

### Task 7: `CollectionGrid.js` — rótulo sempre visível em touch + revelação

**Files:**
- Modify: `frontend/src/components/CollectionGrid.js`
- Modify: `frontend/src/tests/CollectionGrid.test.js`

**Interfaces:**
- Consumes: `useReveal` do Task 2.

- [ ] **Step 1: Escrever o teste que falha**

Adicionar ao final do `describe` em `frontend/src/tests/CollectionGrid.test.js` (antes do `});` final):

```js
  test("Rótulo do produto fica visível por padrão, sem depender de hover/toque", () => {
    renderGrid("noivas");
    const label = screen.getByText("Petrova - Coleção Alvor").closest("div");
    expect(label).toHaveClass("opacity-100");
    expect(label).not.toHaveClass("opacity-0");
  });
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npx jest --config=jest.config.js src/tests/CollectionGrid.test.js`
Expected: FAIL — a `div` do rótulo ainda tem `opacity-0` como classe base.

- [ ] **Step 3: Atualizar o componente**

Editar `frontend/src/components/CollectionGrid.js` (arquivo completo):

```js
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import collections from "../data/catalog";
import logo from "../assets/images/loguinho.webp";
import FabricTag from "./FabricTag";
import { useReveal } from "../hooks/useReveal";

const BUTTON_LABEL_BY_CATEGORY = {
  noivas: "Ver Vestidos",
  ternos: "Ver Ternos",
  festa: "Ver Looks de Festa",
};

const CollectionGrid = ({ category = "noivas" }) => {
  const buttonLabel = BUTTON_LABEL_BY_CATEGORY[category] ?? "Ver Coleção";
  const filtered = collections.filter((dress) => dress.category === category);
  const revealRef = useReveal();

  return (
    <section ref={revealRef} className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6">
      <LazyLoadImage
        src={logo}
        alt="Coleção Exclusiva"
        className="mx-auto max-h-24 w-auto"
      />
      <h2 className="mt-4 font-display text-2xl font-medium text-ink sm:text-3xl">
        Coleção Exclusiva
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((dress) => (
          <Link
            key={dress.id}
            to={`/collections/${dress.id}`}
            className="group relative block aspect-[3/4] overflow-hidden bg-surface"
          >
            <LazyLoadImage
              effect="blur"
              src={dress.image}
              alt={dress.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              wrapperClassName="h-full w-full block"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute bottom-3 left-3 flex flex-col items-start gap-1 opacity-100 translate-y-0 transition-all duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
              <FabricTag tint={category} className="bg-surface/95">
                {dress.name}
              </FabricTag>
              <FabricTag className="bg-surface/95">{buttonLabel}</FabricTag>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CollectionGrid;
```

Como isso resolve o problema: em telas sem hover real (`@media (hover: hover)` não bate — a maioria dos celulares), o rótulo fica com `opacity-100 translate-y-0` (visível) desde o início, porque nenhuma das classes `[@media(hover:hover)]:*` se aplica. Em telas com mouse (`hover: hover` bate), o rótulo some por padrão (`opacity-0`) e só reaparece no `:hover` real, via `group-hover:*` — comportamento igual ao de antes para desktop.

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npx jest --config=jest.config.js src/tests/CollectionGrid.test.js`
Expected: PASS (6 testes)

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/CollectionGrid.js frontend/src/tests/CollectionGrid.test.js
git commit -m "fix: keep product labels visible on touch devices, add scroll reveal"
```

---

### Task 8: `Sections.js` — capítulo pinado "Por que Escolher" + revelação

**Files:**
- Modify: `frontend/src/components/Sections.js`

**Interfaces:**
- Consumes: `usePinnedChapter` do Task 4, `useReveal` do Task 2.

- [ ] **Step 1: Confirmar a cobertura de teste existente antes de mexer**

Run: `npx jest --config=jest.config.js src/tests/Sections.test.js`
Expected: PASS (4 testes) — esta é a baseline que os próximos passos não podem quebrar.

- [ ] **Step 2: Atualizar o componente**

Editar `frontend/src/components/Sections.js` (arquivo completo):

```js
import { Link } from "react-router-dom";
import { FaCheckCircle, FaQuoteLeft, FaStar } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import testimonials from "../data/testimonials";
import collectionsHomePage from "../data/collectionsHomePage";
import { usePinnedChapter } from "../hooks/usePinnedChapter";
import { useReveal } from "../hooks/useReveal";

const Sections = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: false,
    arrows: false,
  };

  const differentials = [
    {
      title: "Feitos Sob Medida",
      desc: "Temos o serviço de confecção para você que procura algo exclusivo",
      whatsappMessage: "Olá, estou interessada no serviço de confecção sob medida da Iara Noivas. Pode me passar mais informações?",
    },
    {
      title: "Materiais de Alta Qualidade",
      desc: "Usamos os tecidos mais sofisticados para garantir luxo e conforto.",
      whatsappMessage: "Olá, gostaria de saber mais sobre os vestidos da Iara Noivas. Pode me contar mais?",
    },
    {
      title: "Atendimento Personalizado",
      desc: "Nossa equipe ajuda você em cada etapa para escolher o vestido perfeito.",
      whatsappMessage: "Olá, gostaria de agendar um atendimento personalizado para me ajudar a escolher meu vestido. Vocês podem me ajudar?",
    }
  ];

  const getWhatsAppLink = (message) => {
    const phoneNumber = "5535998127656";
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  const { sectionRef: differentialsRef, setItemRef } = usePinnedChapter(differentials.length);
  const dualSectionRef = useReveal();
  const ctaRef = useReveal();

  return (
    <div className="font-body text-ink" data-testid="diferencial-section">
      {/* 📌 Bloco Diferenciais — capítulo pinado, um diferencial por vez */}
      <section
        ref={differentialsRef}
        className="bg-bone px-4 py-16 text-center sm:px-6"
        data-testid="diferenciais-chapter"
      >
        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
          Por que Escolher a Iara Noivas?
        </h2>
        <div className="relative mx-auto mt-10 h-72 max-w-md">
          {differentials.map((item, index) => (
            <a
              key={index}
              ref={setItemRef(index)}
              href={getWhatsAppLink(item.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex flex-col items-center justify-center border border-hairline bg-surface p-6 text-center transition-colors hover:border-accent"
            >
              <FaCheckCircle className="mx-auto mb-3 text-2xl text-accent" />
              <h3 className="font-display text-lg font-medium text-ink">{item.title}</h3>
              <p className="mt-2 font-body text-sm text-ink/70">{item.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* 📌 Bloco Produtos e Depoimentos lado a lado */}
      <section ref={dualSectionRef} className="bg-surface px-4 py-16 text-center sm:px-6" data-testid="dual-section">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:divide-x md:divide-hairline">
          <div className="flex flex-col items-center md:pr-8">
            <h2 className="font-display text-xl font-medium text-ink sm:text-2xl">
              Descubra Nossos Vestidos Exclusivos
            </h2>
            <FaStar className="my-3 text-xl text-accent" />
            <p className="max-w-sm font-body text-sm text-ink/70">
              Modelos feitos para tornar seu dia ainda mais especial.
            </p>

            <div className="mt-6 w-full max-w-sm">
              <Slider {...sliderSettings}>
                {collectionsHomePage.map((collection, index) => (
                  <div key={index} className="px-1 text-center">
                    <LazyLoadImage
                      src={collection.image}
                      alt={collection.name}
                      className="aspect-[3/4] w-full object-cover"
                    />
                    <p className="mt-3 font-label text-xs uppercase tracking-wide text-ink/70">
                      {collection.name}
                    </p>
                  </div>
                ))}
              </Slider>
            </div>

            <Link
              to="/collections"
              className="mt-8 inline-block border border-ink px-5 py-2 font-label text-xs uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-bone"
            >
              Ver Coleção
            </Link>
          </div>

          <div
            className="flex flex-col items-center md:pl-8"
            data-testid="testimonials-section"
          >
            <h2 className="font-display text-xl font-medium text-ink sm:text-2xl">
              Sonhos que Viraram Realidade
            </h2>
            <FaQuoteLeft className="my-3 text-xl text-accent" />
            <p className="max-w-sm font-body text-sm text-ink/70">
              Nossas noivas contam suas histórias inesquecíveis.
            </p>

            <div className="mt-6 w-full max-w-sm pb-10">
              <Slider {...sliderSettings}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="border-l-2 border-accent bg-bone p-6 text-left">
                    <LazyLoadImage
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <p className="mt-3 font-body text-sm italic text-ink/80">{testimonial.text}</p>
                    <h4 className="mt-2 font-label text-xs uppercase tracking-wide text-ink">
                      - {testimonial.name}
                    </h4>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* 📌 Bloco CTA Final */}
      <section ref={ctaRef} className="bg-bone px-4 py-16 text-center sm:px-6" data-testid="cta-section">
        <h2 className="font-display text-xl font-medium text-ink sm:text-2xl">
          Pronta para Encontrar o Vestido dos Seus Sonhos?
        </h2>
        <p className="mt-2 font-body text-sm text-ink/70">
          Entre em contato e agende uma consultoria exclusiva.
        </p>
        <a href="https://wa.me/+5535998127656" target="_blank" rel="noopener noreferrer">
          <button className="mt-6 border border-accent bg-accent px-5 py-2 font-label text-xs uppercase tracking-wide text-bone transition-colors hover:bg-transparent hover:text-accent">
            Agendar Atendimento
          </button>
        </a>
      </section>
    </div>
  );
};

export default Sections;
```

- [ ] **Step 3: Rodar os testes e confirmar que continuam passando**

Run: `npx jest --config=jest.config.js src/tests/Sections.test.js src/tests/HomePage.test.js`
Expected: `Sections.test.js` PASS (4 testes). `HomePage.test.js` continua com a mesma falha pré-existente de `instagram-widget` (não relacionada) — as outras asserções (`hero-section`, `diferencial-section`, `dual-section`, `testimonials-section`, `cta-section`) continuam passando.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/Sections.js
git commit -m "feat: turn 'Por que Escolher' into a pinned chapter, add reveal to remaining sections"
```

---

### Task 9: `AboutUs.js` — capítulo pinado "Diferenciais" + revelação

**Files:**
- Modify: `frontend/src/pages/AboutUs.js`

**Interfaces:**
- Consumes: `usePinnedChapter` do Task 4, `useReveal` do Task 2.

- [ ] **Step 1: Confirmar a cobertura de teste existente antes de mexer**

Run: `npx jest --config=jest.config.js src/tests/AboutUs.test.js`
Expected: FAIL em 1 de 5 testes (o botão "Agendar Atendimento" — falha pré-existente e fora de escopo, ver "Global Constraints"). Os outros 4 (heading principal, "Nossa História", "Por que escolher", "Noivas Felizes", timeline, diferenciais) passam — essa é a baseline que os próximos passos não podem piorar.

- [ ] **Step 2: Atualizar o componente**

Editar `frontend/src/pages/AboutUs.js` (arquivo completo):

```js
import CustomerGallery from '../components/CustomerGallery';
import Layout from '../layout/Layout';
import { Helmet } from "react-helmet-async";
import { FaCheckCircle, FaClock, FaStar } from "react-icons/fa";
import logo from "../assets/images/loguinho.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { usePinnedChapter } from "../hooks/usePinnedChapter";
import { useReveal } from "../hooks/useReveal";

const TIMELINE = [
  { year: "2003", text: "Fundação da Iara Noivas, inspirada pelo amor à moda nupcial." },
  { year: "2010", text: "Começamos a criar vestidos sob medida, exclusivos para cada noiva." },
  { year: "2020", text: "Nossas peças se tornaram referência em casamentos de luxo." },
  { year: "2024", text: "Expandimos para novas coleções exclusivas." },
];

const DIFFERENTIALS = [
  { icon: FaCheckCircle, title: "Feitos Sob Medida", text: "Cada vestido é desenhado para refletir sua personalidade e estilo." },
  { icon: FaClock, title: "22 Anos de Tradição", text: "Mais de 5.000 noivas já confiaram em nossa experiência." },
  { icon: FaStar, title: "Qualidade e Exclusividade", text: "Utilizamos os melhores materiais para criar peças atemporais." },
];

const AboutUs = () => {
  const introRef = useReveal();
  const timelineRef = useReveal();
  const { sectionRef: differentialsRef, setItemRef } = usePinnedChapter(DIFFERENTIALS.length);
  const galleryRef = useReveal();
  const ctaRef = useReveal();

  return (
    <Layout>
      {/* SEO para a página Sobre Nós */}
      <Helmet>
        <title>Sobre Nós - Iara Noivas</title>
        <meta
          name="description"
          content="Conheça a história da Iara Noivas e nossa paixão por criar vestidos de noiva inesquecíveis."
        />
        <meta property="og:title" content="Sobre Nós - Iara Noivas" />
        <meta
          property="og:description"
          content="Descubra como a Iara Noivas se tornou referência em vestidos de casamento sofisticados e elegantes."
        />
        <meta property="og:url" content="https://www.iaranoivas.com/about" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Seção Hero */}
      <section ref={introRef} className="bg-ink px-4 py-20 text-center text-bone sm:px-6">
        <h1 className="font-display text-3xl font-medium sm:text-4xl">
          Realizamos sonhos, um vestido por vez
        </h1>
        <p className="mt-3 font-body text-sm text-bone/80 sm:text-base">
          Transformamos momentos especiais em memórias inesquecíveis.
        </p>
      </section>

      {/* Nossa História - Timeline */}
      <section ref={timelineRef} className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">Nossa História</h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TIMELINE.map((item) => (
            <div key={item.year} className="border-t border-hairline pt-4">
              <span className="font-label text-xs uppercase tracking-wide text-accent">{item.year}</span>
              <p className="mt-2 font-body text-sm text-ink/70">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Diferenciais — capítulo pinado, um por vez */}
      <section
        ref={differentialsRef}
        className="bg-surface px-4 py-16 text-center sm:px-6"
        data-testid="about-diferenciais-chapter"
      >
        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
          Por que escolher a Iara Noivas?
        </h2>
        <div className="relative mx-auto mt-10 h-72 max-w-md">
          {DIFFERENTIALS.map(({ icon: Icon, title, text }, index) => (
            <div
              key={title}
              ref={setItemRef(index)}
              className="absolute inset-0 flex flex-col items-center justify-center border border-hairline bg-surface p-6"
            >
              <Icon className="mx-auto mb-3 text-2xl text-accent" />
              <h3 className="font-display text-lg font-medium text-ink">{title}</h3>
              <p className="mt-2 font-body text-sm text-ink/70">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Galeria de Clientes */}
      <section ref={galleryRef} className="px-4 py-16 text-center sm:px-6">
        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">Noivas Felizes</h2>
        <LazyLoadImage src={logo} alt="Coleção Exclusiva" className="mx-auto mt-4 max-h-24 w-auto" />
        <CustomerGallery />
      </section>

      {/* Call to Action */}
      <section ref={ctaRef} className="bg-bone px-4 py-16 text-center sm:px-6">
        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
          Pronta para Encontrar o Vestido dos Seus Sonhos?
        </h2>
        <p className="mt-2 font-body text-sm text-ink/70">
          Entre em contato e agende uma consultoria exclusiva.
        </p>
        <a href="https://wa.me/+5535998127656" target="_blank" rel="noopener noreferrer">
          <button className="mt-6 border border-accent bg-accent px-5 py-2 font-label text-xs uppercase tracking-wide text-bone transition-colors hover:bg-transparent hover:text-accent">
            Agendar Atendimento
          </button>
        </a>
      </section>
    </Layout>
  );
};

export default AboutUs;
```

- [ ] **Step 3: Rodar os testes e confirmar a mesma baseline**

Run: `npx jest --config=jest.config.js src/tests/AboutUs.test.js`
Expected: mesmo resultado do Step 1 — 4 de 5 testes passam, a falha do botão "Agendar Atendimento" continua (pré-existente, fora de escopo). Nenhum teste que passava antes pode passar a falhar.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/pages/AboutUs.js
git commit -m "feat: turn About 'Diferenciais' into a pinned chapter, add reveal to remaining sections"
```

---

### Task 10: `CollectionId.js` — parallax no banner da coleção

**Files:**
- Modify: `frontend/src/pages/CollectionId.js`
- Create: `frontend/src/tests/CollectionId.test.js`

**Interfaces:**
- Consumes: `useParallax` do Task 3.

- [ ] **Step 1: Escrever o teste que falha**

Criar `frontend/src/tests/CollectionId.test.js` (esta página ainda não tinha cobertura de teste):

```js
import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MoodboardProvider } from "../context/MoodboardContext";
import CollectionId from "../pages/CollectionId";

jest.mock("react-router-dom", () => ({
  useParams: () => ({ slug: "festa-glamour" }),
}));

jest.mock("../data/catalog", () => [
  {
    id: "festa-glamour",
    name: "Vestidos de Festa - Coleção Glamour",
    banner: "banner-festa-glamour.jpg",
    category: "festa",
    products: [
      { id: "festa-glamour-p1", name: "Vestido Longo Dourado", image: "p1.jpg" },
    ],
  },
]);

const renderPage = () =>
  render(
    <HelmetProvider>
      <MoodboardProvider>
        <CollectionId />
      </MoodboardProvider>
    </HelmetProvider>
  );

describe("CollectionId Page", () => {
  test("Renderiza o banner da coleção encontrada", () => {
    renderPage();
    expect(screen.getByAltText("Vestidos de Festa - Coleção Glamour")).toBeInTheDocument();
  });

  test("Renderiza os produtos da coleção", () => {
    renderPage();
    expect(screen.getByText("Vestido Longo Dourado")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar que falha**

Run: `npx jest --config=jest.config.js src/tests/CollectionId.test.js`
Expected: FAIL — sem o mock de `useParams` com `slug` válido aplicado ao componente atual, ou por falta de qualquer regra que quebre ao rodar pela primeira vez (confirma que o teste realmente exercita o componente antes de prosseguir).

- [ ] **Step 3: Atualizar o componente**

Editar `frontend/src/pages/CollectionId.js`, adicionando o import do hook e o `ref` na imagem do banner (resto do arquivo permanece igual):

```js
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import collections from "../data/catalog";
import { useMoodboard } from "../context/MoodboardContext";
import Layout from "../layout/Layout";
import { Helmet } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaHeart, FaShareAlt, FaWhatsapp, FaThumbsUp } from "react-icons/fa";
import { shareCurrentPage } from "../utils/shareCurrentPage";
import { shareSingleDress } from "../utils/shareSingleDress";
import FabricTag from "../components/FabricTag";
import { useParallax } from "../hooks/useParallax";

const Collection_ID = () => {
  const { slug: id } = useParams();
  const collection = collections.find((col) => col.id === id);
  const { moodboardItems, addToMoodboard, removeFromMoodboard } = useMoodboard();
  const gridRef = useRef(null);
  const bannerParallaxRef = useParallax({ distance: 40 });
  const [likedItems, setLikedItems] = useState({});
  const lastTapRef = useRef(0);

  const handleFavoriteClick = (product, event) => {
    event?.stopPropagation();
    const isFavorite = moodboardItems.some((item) => item.id === product.id);

    if (isFavorite) {
      removeFromMoodboard(product.id);
    } else {
      addToMoodboard(product);
      setLikedItems((prev) => ({ ...prev, [product.id]: true }));

      setTimeout(() => {
        setLikedItems((prev) => ({ ...prev, [product.id]: false }));
      }, 1000);
    }
  };

  const handleTouchStart = (product) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      handleFavoriteClick(product);
    }
    lastTapRef.current = now;
  };

  if (!collection) {
    return <h2 className="p-10 text-center font-display text-2xl text-ink">Coleção não encontrada!</h2>;
  }

  return (
    <Layout title={collection.name}>
      <Helmet>
        <title>Iara Noivas - Vestidos de Noiva </title>
      </Helmet>

      <div className="mx-auto max-w-6xl px-4 pt-8 text-center sm:px-6">
        <img
          ref={bannerParallaxRef}
          src={collection.banner}
          loading="lazy"
          alt={collection.name}
          className="mx-auto max-h-64 w-auto object-contain"
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
        {collection.products.map((product) => {
          const isFavorite = moodboardItems.some((item) => item.id === product.id);

          return (
            <div
              key={product.id}
              className="group text-center"
              onTouchStart={() => handleTouchStart(product)}
            >
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
                  className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-ink transition-colors hover:bg-surface ${
                    isFavorite ? "text-accent" : ""
                  }`}
                  onClick={(e) => handleFavoriteClick(product, e)}
                  aria-label="Favoritar"
                >
                  <FaHeart size={16} />
                </button>

                {likedItems[product.id] && (
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
                  onClick={(e) => handleFavoriteClick(product, e)}
                  aria-label="Curtir"
                >
                  <FaThumbsUp size={16} />
                </button>

                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-[#25D366] transition-colors hover:border-[#25D366]"
                  data-name={product.name}
                  onClick={shareSingleDress}
                  aria-label="Compartilhar no WhatsApp"
                >
                  <FaWhatsapp size={16} />
                </button>

                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:border-accent hover:text-accent"
                  onClick={() => shareCurrentPage()}
                  aria-label="Compartilhar"
                >
                  <FaShareAlt size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Collection_ID;
```

- [ ] **Step 4: Rodar o teste e confirmar que passa**

Run: `npx jest --config=jest.config.js src/tests/CollectionId.test.js`
Expected: PASS (2 testes)

- [ ] **Step 5: Commit**

```bash
git add frontend/src/pages/CollectionId.js frontend/src/tests/CollectionId.test.js
git commit -m "feat: add parallax to collection banner, add first test coverage for CollectionId"
```

---

### Task 11: `Contact.js` — revelação em todas as seções

**Files:**
- Modify: `frontend/src/pages/Contact.js`
- Create: `frontend/src/tests/Contact.test.js`

**Interfaces:**
- Consumes: `useReveal` do Task 2.

- [ ] **Step 1: Escrever o teste que falha**

Criar `frontend/src/tests/Contact.test.js` (página ainda sem cobertura de teste):

```js
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Contact from "../pages/Contact";

jest.mock("../context/MoodboardContext", () => ({
  useMoodboard: () => ({ moodboardItems: [] }),
}));

const renderPage = () =>
  render(
    <HelmetProvider>
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    </HelmetProvider>
  );

describe("Contact Page", () => {
  test("Renderiza as seções principais", () => {
    renderPage();

    expect(screen.getByRole("heading", { name: /vamos conversar/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /envie uma mensagem/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /dúvidas frequentes/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /nossa localização/i })).toBeInTheDocument();
  });

  test("SEO está configurado corretamente", async () => {
    renderPage();
    expect(document.title).toBe("Fale Conosco - Iara Noivas");
  });
});
```

- [ ] **Step 2: Rodar o teste e confirmar o estado atual**

Run: `npx jest --config=jest.config.js src/tests/Contact.test.js`
Expected: como `Contact.js` já renderiza esse conteúdo hoje, este teste deve **passar já no primeiro run** — ele existe para dar uma rede de segurança contra a próxima mudança estrutural (adicionar os `ref`s), não para expor um bug novo. Confirmar que passa antes de prosseguir.

- [ ] **Step 3: Atualizar o componente**

Editar `frontend/src/pages/Contact.js` (arquivo completo):

```js
// src/pages/Contact.js

import { Helmet } from "react-helmet-async";
import ContactForm from "../components/ContactForm";
import Layout from "../layout/Layout";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { useReveal } from "../hooks/useReveal";

const Contact = () => {
    const heroRef = useReveal();
    const infoRef = useReveal();
    const formRef = useReveal();
    const faqRef = useReveal();
    const mapRef = useReveal();

    return (
        <Layout>
            {/* 🔹 SEO para melhor indexação */}
            <Helmet>
                <title>Fale Conosco - Iara Noivas</title>
                <meta name="description" content="Entre em contato para saber mais sobre nossos vestidos de noiva e agendar um atendimento personalizado." />
                <meta property="og:title" content="Fale Conosco - Iara Noivas" />
                <meta property="og:description" content="Envie uma mensagem e fale diretamente com nossa equipe." />
                <meta property="og:url" content="https://www.iaranoivas.com/contact" />
                <meta property="og:type" content="website" />
            </Helmet>

            {/* 🔹 Hero Section com imagem impactante */}
            <section ref={heroRef} className="bg-ink px-4 py-16 text-center text-bone sm:px-6">
                <h1 className="font-display text-3xl font-medium sm:text-4xl">Vamos Conversar? 💍</h1>
                <p className="mt-3 font-body text-sm text-bone/80 sm:text-base">
                    Estamos prontos para ajudar você a encontrar o vestido perfeito!
                </p>
                <a
                    href="https://wa.me/5535998127656"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-xl text-bone transition-transform hover:scale-110"
                >
                    <FaWhatsapp />
                </a>
            </section>

            {/* 🔹 Seção de Informações de Contato */}
            <section ref={infoRef} className="mx-auto grid max-w-5xl grid-cols-1 gap-px bg-hairline px-4 py-12 sm:grid-cols-3 sm:px-6">
                <a
                    href="https://wa.me/5535998127656?text=Olá, gostaria de mais informações sobre os vestidos da Iara Noivas!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-surface p-8 text-center transition-colors hover:bg-bone"
                >
                    <FaPhone className="mx-auto mb-3 text-2xl text-accent" />
                    <h3 className="font-display text-lg font-medium text-ink">Telefone / WhatsApp</h3>
                    <p className="mt-1 font-body text-sm text-ink/70">(35) 99812-7656</p>
                </a>

                <a
                    href="mailto:iaranoivas2023@gmail.com?subject=Contato via site&body=Olá, estou entrando em contato através do site e gostaria de saber mais."
                    className="block bg-surface p-8 text-center transition-colors hover:bg-bone"
                >
                    <FaEnvelope className="mx-auto mb-3 text-2xl text-accent" />
                    <h3 className="font-display text-lg font-medium text-ink">E-mail</h3>
                    <p className="mt-1 font-body text-sm text-ink/70">iaranoivas2023@gmail.com</p>
                </a>

                <a
                    href="https://www.google.com/maps/search/?api=1&query=Rua+Dr+Lisboa+231+Pouso+Alegre+MG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-surface p-8 text-center transition-colors hover:bg-bone"
                >
                    <FaMapMarkerAlt className="mx-auto mb-3 text-2xl text-accent" />
                    <h3 className="font-display text-lg font-medium text-ink">Endereço</h3>
                    <p className="mt-1 font-body text-sm text-ink/70">Rua Doutor Lisboa, Nº 231 – Pouso Alegre, MG</p>
                </a>
            </section>

            {/* 🔹 Formulário de Contato */}
            <section ref={formRef} className="mx-auto max-w-2xl px-4 py-12 text-center sm:px-6">
                <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">Envie uma Mensagem</h2>
                <p className="mt-2 font-body text-sm text-ink/70">
                    Preencha o formulário abaixo e retornaremos o mais rápido possível.
                </p>
                <div className="mt-8 text-left">
                    <ContactForm />
                </div>
            </section>

            {/* 🔹 Seção de Perguntas Frequentes */}
            <section ref={faqRef} className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
                <h2 className="text-center font-display text-2xl font-medium text-ink sm:text-3xl">
                    Dúvidas Frequentes
                </h2>
                <div className="mt-8 space-y-6">
                    <div className="border-t border-hairline pt-4">
                        <h3 className="font-display text-base font-medium text-ink">
                            Como agendar uma prova de vestido?
                        </h3>
                        <p className="mt-1 font-body text-sm text-ink/70">
                            Entre em contato pelo WhatsApp ou pelo formulário para marcar um horário com nossa equipe.
                        </p>
                    </div>
                    <div className="border-t border-hairline pt-4">
                        <h3 className="font-display text-base font-medium text-ink">
                            Quais formas de pagamento são aceitas?
                        </h3>
                        <p className="mt-1 font-body text-sm text-ink/70">
                            Trabalhamos com cartão de crédito, PIX e parcelamento especial para noivas.
                        </p>
                    </div>
                    <div className="border-t border-hairline pt-4">
                        <h3 className="font-display text-base font-medium text-ink">
                            Preciso marcar horário para atendimento?
                        </h3>
                        <p className="mt-1 font-body text-sm text-ink/70">
                            Não, recomendamos o agendamento para pessoas interessadas em confeccionar seu vestido.
                        </p>
                    </div>
                </div>
            </section>

            {/* 🔹 Mapa Interativo */}
            <section ref={mapRef} className="mx-auto max-w-5xl px-4 pb-16 text-center sm:px-6">
                <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">Nossa Localização</h2>
                <iframe
                    title="Mapa Iara Noivas"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3693.2023503143873!2d-45.93750692380367!3d-22.232400014119477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cbc7b120bbe1f7%3A0x63ca96a50f887b5b!2sAv.%20Dr.%20Lisboa%2C%20231%20-%20Pouso%20Alegre%2C%20MG%2C%2037550-000!5e0!3m2!1spt-BR!2sbr!4v1738947504078!5m2!1spt-BR!2sbr"
                    className="mt-6 h-[450px] w-full max-w-2xl border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </section>
        </Layout>
    );
};

export default Contact;
```

- [ ] **Step 4: Rodar o teste e confirmar que continua passando**

Run: `npx jest --config=jest.config.js src/tests/Contact.test.js`
Expected: PASS (2 testes)

- [ ] **Step 5: Commit**

```bash
git add frontend/src/pages/Contact.js frontend/src/tests/Contact.test.js
git commit -m "feat: add scroll reveal to Contact page sections"
```

---

### Task 12: Suíte completa + verificação manual final

**Files:** nenhum arquivo novo — tarefa de verificação.

**Interfaces:** nenhuma (tarefa final de QA).

- [ ] **Step 1: Rodar a suíte completa**

Run: `npm test -- --silent` (dentro de `frontend/`)
Expected: `Test Suites: 2 failed, 10 passed, 12 total` / todos os testes novos (Tasks 2–11) passando, e exatamente as mesmas 2 falhas pré-existentes de `HomePage.test.js` (`instagram-widget`) e `AboutUs.test.js` (link do botão) descritas em "Global Constraints" — nenhuma falha nova.

- [ ] **Step 2: Rodar o build de produção**

Run: `npm run build` (dentro de `frontend/`)
Expected: build conclui sem erro (confirma que o novo código de animação não quebra a compilação Vite).

- [ ] **Step 3: Checklist manual no navegador (desktop)**

Rodar `npm run dev`, abrir `http://localhost:3000` em desktop (Chrome) e verificar:
- Home: seção "Por que Escolher" pina e alterna entre os 3 diferenciais ao rolar; demais seções (carrossel, depoimentos, CTA, formulário) aparecem com fade suave.
- Sobre: seção "Diferenciais" pina do mesmo jeito; timeline, galeria e CTA aparecem com fade.
- Coleções (`/collections`, `/collections/ternos`, `/collections/festa`): grid de produtos aparece com fade; passar o mouse sobre um card revela o rótulo.
- Uma coleção específica (`/collections/vestidos-petrova` ou similar): banner com leve parallax ao rolar.
- Contato: todas as seções aparecem com fade.
- Trocar de página pelo menu: a nova página faz um fade de entrada, sem corte seco.

- [ ] **Step 4: Checklist manual no navegador (mobile)**

No DevTools, emular um viewport de 375×812 (ou testar num celular real) e verificar:
- Hero: o vídeo não corta o assunto principal (rosto/vestido) fora do quadro. Se ainda cortar, voltar ao Step 5 da Task 6 e ajustar `object-[center_XX%]`.
- Cards de produto (Coleções): o nome do produto e o botão aparecem **sem precisar tocar** no card.
- A seção pinada ("Por que Escolher" / "Diferenciais") não trava nem fica "engasgada" ao rolar — se estiver ruim, ajustar `stepDistance` em `usePinnedChapter` (Task 4) para um valor maior (dá mais espaço de rolagem por item, movimento mais suave).

- [ ] **Step 5: Checklist de acessibilidade — `prefers-reduced-motion`**

No DevTools do Chrome, abrir o painel de Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce", recarregar a Home e o Sobre, e confirmar que todo o conteúdo aparece direto (sem pin, sem parallax, sem scrub) — apenas texto e imagens estáticos, sempre visíveis.

- [ ] **Step 6: Commit final (se algum ajuste manual dos Steps 3–5 tiver gerado mudanças)**

Se qualquer ajuste (ex: valor de `object-position`, `stepDistance`) foi feito durante a verificação manual:

```bash
git add -A
git commit -m "fix: tune scroll animation values based on manual QA"
```

Se nenhum ajuste foi necessário, não há o que commitar — a Task 12 é só verificação.

---

## Self-Review

**Cobertura do spec:**
- Revelação suave → `useReveal` (Task 2), aplicado em Hero (via parallax, que já cobre a entrada do vídeo), CollectionGrid, Sections (dual/CTA), AboutUs (intro/timeline/galeria/CTA), Contact (todas as seções). ✅
- Seções pinadas → `usePinnedChapter` (Task 4), aplicado em Sections "Por que Escolher" (Task 8) e AboutUs "Diferenciais" (Task 9) — exatamente 2 capítulos pinados no site, dentro do limite de "Global Constraints". ✅
- Parallax → `useParallax` (Task 3), aplicado no vídeo do Hero (Task 6) e no banner de coleção em `CollectionId.js` (Task 10). ✅
- Transição de página → `PageTransition` (Task 5), envolvendo `<Routes>` em `App.js`, uniforme em todo o site. ✅
- `prefers-reduced-motion` → tratado dentro de cada hook via `gsap.matchMedia`, verificado manualmente na Task 12 Step 5. ✅
- Cleanup de `ScrollTrigger` → `gsap.context().revert()` em todos os hooks, testado explicitamente nas Tasks 2, 3 e 4. ✅
- Mobile: vídeo do Hero → Task 6. Rótulo de produto sempre visível em touch → Task 7. Checklist mobile dedicado → Task 12 Step 4. ✅
- Pendência do Header (Ternos/Festa) → deliberadamente fora deste plano, conforme "Global Constraints" e o spec. ✅

**Placeholders:** nenhum "TBD"/"implementar depois" no plano. O único valor que depende de verificação visual humana (`object-[center_20%]` no Hero) tem um valor de partida concreto e um passo explícito de ajuste manual (Task 6, Step 5) — não é uma lacuna, é um passo de tuning documentado, com o mecanismo exato (`npm run dev`, viewport 375×812, o que ajustar).

**Consistência de tipos/assinaturas:** `useReveal(options?)`, `useParallax({ distance })`, `usePinnedChapter(itemCount, options?)` — usados de forma idêntica em todas as tarefas que os consomem (Tasks 6–11). `setItemRef(index)` retorna uma função de ref, usada da mesma forma em Sections.js e AboutUs.js.
