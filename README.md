# Portfólio | Andrei Roberto da Costa

Site de portfólio bilíngue (PT-BR/EN) desenvolvido com HTML5, CSS3 e JavaScript Vanilla, com foco em performance, acessibilidade, SEO técnico e crescimento orgânico.

## Objetivo

Apresentar competências, experiência e canais de contato de forma profissional, com navegação clara e base escalável para evolução de conteúdo.

## Stack

- HTML5 semântico
- CSS3 (design system com variáveis)
- JavaScript Vanilla (menu, scroll, animações e i18n)
- GitHub Pages (deploy estático)

## Estrutura de pastas

- `index.html`: página principal
- `blog/index.html`: hub de conteúdo técnico
- `blog/artigos/`: artigos pilar por área de atuação
- `404.html`: fallback para rotas inexistentes
- `css/style.css`: estilos globais da home
- `css/blog.css`: estilos do blog e artigos
- `js/script.js`: interações do front-end
- `locales/`: dicionários de tradução (`pt-br.json`, `en.json`)
- `assets/`: imagens e vídeo do hero
- `docs/roadmap.md`: plano de evolução técnica e de produto
- `docs/calendario-editorial.md`: planejamento de conteúdo e rotina de publicação
- `robots.txt` e `sitemap.xml`: base de indexação para mecanismos de busca

## Execução local

Como o projeto é estático, basta servir os arquivos via HTTP local.

```bash
python3 -m http.server 8080
```

Acesse `http://localhost:8080`.

## Deploy

Deploy recomendado: GitHub Pages.

1. Publicar branch principal no repositório.
2. Ativar GitHub Pages apontando para a branch de produção.
3. Validar URL pública, `robots.txt`, `sitemap.xml` e `404.html`.

## I18n (PT-BR / EN)

- O idioma é controlado em `js/script.js`.
- As traduções ficam em `locales/*.json`.
- A preferência do usuário é salva em `localStorage` (`preferred-lang`).

## SEO e conteúdo (Fase 4)

- Home com seção de conteúdo técnico e interlinks para artigos.
- Blog com artigos pilar em front-end, Python/dados e games.
- Interlink estratégico entre home, projetos, blog e CTA de contato.
- Calendário editorial inicial em `docs/calendario-editorial.md`.

## Manutenção contínua

- Atualizar periodicamente experiência, skills, artigos e links de contato.
- Revisar metadados SEO (title, description, OG, canonical) a cada novo conteúdo.
- Executar revisão quinzenal de interlinks e performance.
- Otimizar novos assets antes de publicar (imagens e vídeo).
- Executar checklist de acessibilidade em toda alteração de layout/interação.

## Checklist de release

- Estrutura semântica e landmarks preservados.
- Navegação por teclado funcional.
- Metadados SEO e dados estruturados válidos.
- `sitemap.xml` e `robots.txt` atualizados.
- Links externos, interlinks e CTAs testados.

## Roadmap

O roadmap técnico e de refinamento está em [`docs/roadmap.md`](docs/roadmap.md).
