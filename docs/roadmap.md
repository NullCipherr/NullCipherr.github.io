# Roadmap de Aprimoramento do Portfólio

## Visão geral

Este roadmap organiza as melhorias por fase, priorizando impacto em conversão, UX, performance, SEO e manutenção.

## Fase 1 - Fundação técnica e qualidade (implementada)

- SEO técnico essencial:
  - canonical
  - Open Graph e Twitter Cards
  - theme-color, robots meta e hreflang
  - favicon
- Dados estruturados (JSON-LD):
  - `Person`
  - `WebSite`
- Acessibilidade base:
  - skip link para conteúdo principal
  - foco visível em navegação por teclado
  - landmarks e labels de navegação/menu/idioma
- Estrutura e manutenção:
  - remoção de estilos inline do HTML
  - criação de `robots.txt`, `sitemap.xml` e `404.html`
  - README profissional com guia de manutenção

## Fase 2 - Performance e UX (implementada)

- Otimização de mídia no hero:
  - vídeo comprimido (`Background-optimized.mp4`) com alternativa WebM (`Background.webm`)
  - poster em WebP e carregamento progressivo via `data-src`
  - fallback automático para imagem em dispositivos móveis, conexões com economia de dados e usuários com `prefers-reduced-motion`
- Imagens com prioridade/formato:
  - geração de `Background.webp` e `hero-bg.webp`
  - preload de imagem principal no `head`
  - `image-set` com preferência para WebP
- Acessibilidade de movimento:
  - suporte completo a `prefers-reduced-motion` no CSS e no JS
  - desativação de animações/transições e scroll suave quando necessário
- Menu mobile assistivo:
  - fechamento com `Esc`
  - controle de foco por teclado (focus trap) quando menu está aberto
  - foco inicial no primeiro item do menu
- Legibilidade mobile refinada:
  - ajustes de tipografia, espaçamento e densidade visual em breakpoints de `850px` e `520px`

## Fase 3 - Conversão e autoridade (implementada)

- Hero reforçado para conversão:
  - adição de proposta de valor objetiva
  - inclusão de selos de credibilidade (formação, tempo de experiência e stack)
  - CTA adicional para navegação direta em projetos
- Seção de projetos em destaque:
  - 3 cards com contexto, stack e impacto por projeto
  - estrutura pronta para evoluir com links de cases completos
- Bloco de prova social:
  - seção dedicada a credibilidade profissional e formação
  - reforço de autoridade sem depender de depoimentos fictícios
- CTAs por objetivo:
  - contato por e-mail
  - CTA de networking técnico via GitHub
- FAQ implementado:
  - 4 perguntas cobrindo escopo, processo, integrações e início de projeto

## Fase 4 - Conteúdo e SEO orgânico (implementada)

- Base de blog técnico criada:
  - `blog/index.html` como hub editorial
  - `blog/artigos/*.html` com estrutura semântica e metadados por página
- Artigos pilar publicados por área de atuação:
  - front-end e SEO técnico
  - backend Python e dados
  - games e arquitetura multiplayer
- Estratégia de interlink implementada:
  - links entre home, projetos e artigos
  - artigos conectados entre si e com CTA de contato
- Calendário editorial estruturado:
  - `docs/calendario-editorial.md`
  - planejamento de 12 semanas com trilhas temáticas e checklist de publicação

## Fase 5 - Observabilidade e melhoria contínua

- Configurar analytics orientado a eventos de conversão
- Monitorar Core Web Vitals e score Lighthouse
- Adotar checklist de release técnico
- Realizar ciclos quinzenais de revisão e refinamento

## Prioridade recomendada

1. Consolidar Fase 1 e validar em produção.
2. Executar Fase 2 para ganho de performance e UX.
3. Avançar para Fase 3 com foco em conversão.
4. Escalar conteúdo com Fase 4.
5. Sustentar evolução com Fase 5.
