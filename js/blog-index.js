(function () {
  const BLOG_RAW_BASE = "https://raw.githubusercontent.com/NullCipherr/portfolio-blog/main";
  const INDEX_URL = `${BLOG_RAW_BASE}/posts/index.json`;

  const statusEl = document.getElementById("blog-status");
  const featuredEl = document.getElementById("featured-article");
  const gridEl = document.getElementById("articles-grid");
  const guideEl = document.getElementById("guide-list");

  if (!statusEl || !featuredEl || !gridEl || !guideEl) {
    return;
  }

  function setStatus(message, isError) {
    statusEl.textContent = message;
    statusEl.classList.toggle("is-error", Boolean(isError));
  }

  function formatDate(isoDate) {
    if (!isoDate) {
      return "Data não informada";
    }
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) {
      return isoDate;
    }
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  }

  function postUrl(slug) {
    return `./post.html?slug=${encodeURIComponent(slug)}`;
  }

  function renderFeatured(post) {
    const tags = Array.isArray(post.tags) ? post.tags : [];
    const tagHtml = tags.map((tag) => `<span>${tag}</span>`).join("");
    const meta = `${post.project || "Projeto"} / ${post.readingTime || "Leitura livre"} / ${formatDate(post.publishedAt)}`;

    featuredEl.innerHTML = `
      <p class="kicker">ARTIGO PRINCIPAL</p>
      <h2>${post.title}</h2>
      <p class="featured-date">${meta}</p>
      <p>${post.excerpt || ""}</p>
      <div class="featured-meta">${tagHtml}</div>
      <a class="featured-link" href="${postUrl(post.slug)}">Ler artigo em destaque</a>
    `;
  }

  function renderCards(posts) {
    gridEl.innerHTML = posts
      .map((post, index) => {
        const meta = `Projeto: ${post.project || "N/A"} • Leitura: ${post.readingTime || "N/A"}`;
        return `
          <article class="card">
            <span class="card-index">${String(index + 1).padStart(2, "0")}</span>
            <p class="meta">${meta}</p>
            <h3>${post.title}</h3>
            <p>${post.excerpt || ""}</p>
            <a href="${postUrl(post.slug)}">Ler artigo</a>
          </article>
        `;
      })
      .join("");
  }

  function renderGuide(posts) {
    guideEl.innerHTML = posts
      .slice(0, 3)
      .map((post) => `<li><span>${post.project || post.title}</span><small>${formatDate(post.publishedAt)}</small></li>`)
      .join("");
  }

  function validatePosts(payload) {
    if (!payload || !Array.isArray(payload.posts)) {
      return [];
    }
    return payload.posts.filter((post) => post && post.slug && post.title && post.rawPath);
  }

  async function loadPosts() {
    const response = await fetch(`${INDEX_URL}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Falha ao carregar índice de posts (${response.status}).`);
    }
    return response.json();
  }

  async function bootstrap() {
    try {
      const payload = await loadPosts();
      const posts = validatePosts(payload);
      if (!posts.length) {
        throw new Error("Índice de posts vazio ou inválido.");
      }

      const featured = posts.find((post) => post.featured) || posts[0];
      renderFeatured(featured);
      renderCards(posts);
      renderGuide(posts);
      setStatus(`CMS sincronizado: ${posts.length} artigos publicados em portfolio-blog.`, false);
    } catch (error) {
      featuredEl.innerHTML = "<p>Não foi possível carregar o artigo em destaque neste momento.</p>";
      gridEl.innerHTML = "";
      guideEl.innerHTML = "<li>CMS indisponível temporariamente.</li>";
      setStatus("Erro ao carregar posts do portfolio-blog. Verifique index.json e permissões do repositório.", true);
      console.error("[blog-index]", error);
    }
  }

  bootstrap();
})();
