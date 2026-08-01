# Design: Experiência de Scroll Narrativo (Iara Noivas)

**Data:** 2026-08-01
**Status:** Aprovado para planejamento de implementação

## Contexto

A reformulação técnica e visual do site (migração para Vite, Tailwind, tokens de
design, novas categorias Ternos/Vestidos de Festa) já está substancialmente
implementada, mesmo sem commit — ver `PROMPT_REFORMULACAO.md`. Com essa base
pronta, o problema relatado ("o site parece estar faltando algo") não é mais
sobre tecnologia ou paleta: é sobre a impressão visual/emocional. Duas causas
específicas foram identificadas:

1. **Falta de movimento** — o site é hoje inteiramente estático fora do vídeo
   do Hero. Não há nenhuma biblioteca de animação instalada (o Framer Motion
   citado no README antigo foi removido durante a limpeza de dependências e
   nunca chegou a ser usado no código).
2. **Layout "de template"** — a estrutura Hero → 3 colunas → carrossel →
   depoimentos → CTA → formulário é a mesma fórmula de qualquer site feito em
   builder, sem nada que pareça único da marca.

## Objetivo

Introduzir uma experiência de **scroll narrativo** no site inteiro: a página
se revela e se transforma conforme o usuário rola, em vez de blocos estáticos
empilhados. Quatro comportamentos de movimento, todos aprovados:
revelação suave, seções pinadas ("capítulos"), parallax de imagem, e
transições entre páginas.

Isso precisa funcionar tão bem em celular quanto em desktop — é onde a
maioria das visitantes da loja acessa o site. Imagens e vídeo precisam
aparecer na proporção certa em tela pequena, não apenas serem "responsivas"
por padrão do CSS.

## Não-objetivos

- Não reescreve conteúdo/copy das seções (o problema identificado é de forma,
  não de mensagem).
- Não completa a navegação de categorias no `Header.js` (Ternos/Festa sem link
  direto no menu) — pendência da reformulação anterior, tratada à parte.
- Não introduz fotografia nova para Ternos/Vestidos de Festa — continuam com
  placeholder até haver fotos reais.
- Não altera dados/Firebase/rotas existentes.

## Escolha técnica: GSAP + ScrollTrigger

Avaliadas três opções:

- **Framer Motion** — integra melhor com React de forma declarativa, mas foi
  preterido pela escolha do usuário em favor de mais controle cinematográfico.
- **GSAP + ScrollTrigger (escolhido)** — padrão de mercado para seções
  pinadas e scroll-scrubbed; mais potente que Framer Motion especificamente
  para esse efeito. Trade-off: modelo imperativo (refs manuais) e exige
  cuidado extra com cleanup em SPA (ver "Casos extremos").
- **CSS scroll-driven animations (nativo)** — descartado: suporte de
  navegador ainda limitado fora de Chromium, risco alto para público
  majoritariamente mobile/iOS de uma loja de noivas.

## Arquitetura e Componentes

Novas dependências: `gsap` (core) + plugin `ScrollTrigger`.

### Camada de primitivos reutilizáveis

Local sugerido: `frontend/src/animations/`.

- **`useReveal(ref, options)`** — fade + leve deslocamento quando o elemento
  entra na tela. Usado na maioria das seções do site.
- **`useParallax(ref, options)`** — desloca imagem/vídeo em velocidade
  diferente do texto ao rolar. Usa `transform` (evita reflow).
- **`usePinnedChapter(ref, options)`** — fixa a seção na tela enquanto o
  conteúdo interno anima conforme o progresso do scroll. Uso restrito: 1-2
  capítulos por página, nunca em toda seção (custo de performance mobile).
- **`PageTransition`** — wrapper em torno de `<Routes>` em `App.js`,
  escutando `useLocation()` e disparando uma timeline GSAP (crossfade/wipe) a
  cada troca de rota. Ponto único de implementação garante consistência.

### Aplicação por página

| Página | Tratamento |
|---|---|
| Home | Capítulos pinados (`usePinnedChapter`) na seção "Por que Escolher a Iara Noivas" — os 3 pontos se revelam um a um conforme o progresso do scroll, em vez de 3 caixas estáticas lado a lado. Demais seções (coleções, depoimentos, CTA, contato) usam `useReveal`. |
| Sobre | Página de marca/emoção — reestruturada em capítulos narrativos com `usePinnedChapter`, mesma lógica da Home. |
| Coleções | Página funcional (tarefa: ver produto). Só `useReveal` + `useParallax` leve no banner de categoria. Sem pin. |
| Contato | Página funcional (tarefa: enviar mensagem). Só `useReveal`. Sem pin, sem parallax. |
| Todas | `PageTransition` uniforme na troca de rota. |

## Comportamento e Casos Extremos

- **`prefers-reduced-motion`**: detectado via `gsap.matchMedia()`. Usuárias
  com essa preferência ativada recebem apenas fades simples — sem pin, sem
  parallax, sem scrub. Requisito de acessibilidade, não opcional.
- **Cleanup de instâncias**: todo `ScrollTrigger` criado é destruído
  (`.kill()`) no unmount do componente, dentro dos próprios hooks — quem usa
  os hooks não precisa lembrar de fazer isso manualmente. Necessário porque,
  numa SPA, triggers órfãos de páginas anteriores quebram o scroll da página
  seguinte.
- **Troca de rota**: após a `PageTransition`, chama-se
  `ScrollTrigger.refresh()` para recalcular posições, já que a página nova
  pode ter alturas diferentes da anterior.
- **Performance mobile**: pin e scroll-scrub são os efeitos mais caros — por
  isso restritos a poucos capítulos por página, e parallax implementado via
  `transform` (comportamento padrão do GSAP).

## Adequação Mobile (imagens e vídeo)

Levantamento no código atual mostrou dois problemas concretos que este
design precisa corrigir, não só "levar em conta":

- **Vídeo do Hero (`Hero.js`)**: hoje um único vídeo landscape (`videoCerto.webm`
  / `videoLoja.mp4`) é exibido com `object-cover` em qualquer tela, inclusive
  celular em retrato. Um corte pensado para tela larga pode cortar o assunto
  principal (ex. o vestido/casal) fora do enquadramento em tela estreita.
  Tratamento: usar `object-position` ajustado para manter o centro de
  interesse visível em retrato e, se o enquadramento ainda ficar ruim,
  disponibilizar uma fonte de vídeo alternativa (ou imagem estática de
  fallback) para viewport mobile via media query, em vez de depender só de
  `object-fit`.
- **Cards de produto (`CollectionGrid.js`)**: o nome do produto e o rótulo
  ("Ver Vestidos" etc.) só aparecem hoje em `group-hover`, que não existe em
  touch — ou seja, em celular essa informação nunca é exibida. Tratamento:
  em telas sem hover (`@media (hover: none)` ou breakpoint mobile), o rótulo
  fica **sempre visível por padrão, sem exigir toque/clique** — a pessoa vê o
  nome do produto e o botão assim que o card aparece na tela, igual a como um
  card normal de e-commerce se comporta em celular.
- **Verificação geral de crops**: como o design adiciona parallax e capítulos
  pinados sobre essas mesmas imagens, a checagem de proporção/corte em mobile
  (banners de categoria, imagens de coleção, Hero) entra como item explícito
  da passada manual descrita em "Testes" — não é suficiente testar só em
  desktop.

## Testes

- A suíte Jest (ambiente jsdom) não expõe as APIs de scroll/layout que
  GSAP/ScrollTrigger esperam do navegador real. `gsap` e `ScrollTrigger` serão
  mockados em `jest.setup.js` — componentes continuam testados normalmente
  (texto, cliques, navegação), a animação em si vira no-op no ambiente de
  teste.
- Fluidez de scroll e comportamento com `prefers-reduced-motion` não são
  verificáveis de forma significativa por teste automatizado: o plano inclui
  uma passada manual no navegador (desktop + mobile, Chrome e Safari) antes de
  considerar a feature pronta — incluindo os itens de "Adequação Mobile"
  acima (corte de vídeo/imagens, visibilidade dos rótulos sem hover).

## Pendência registrada (fora de escopo)

O `Header.js` ainda não tem links diretos para as categorias Ternos e
Vestidos de Festa (só um item genérico "Coleção"), conforme previsto no
`PROMPT_REFORMULACAO.md` original. Fica registrado aqui para tratamento
separado, sem relação com este design de movimento/scroll.
