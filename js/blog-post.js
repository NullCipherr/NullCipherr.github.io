(function () {
  const BLOG_RAW_BASE = "https://raw.githubusercontent.com/NullCipherr/portfolio-blog/main";
  const INDEX_URL = `${BLOG_RAW_BASE}/posts/index.json`;

  const titleEl = document.getElementById("post-title");
  const projectEl = document.getElementById("post-project");
  const metaEl = document.getElementById("post-meta");
  const contentEl = document.getElementById("post-content");

  if (!titleEl || !projectEl || !metaEl || !contentEl) {
    return;
  }

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function parseInline(text) {
    let html = escapeHtml(text);
    html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    return html;
  }

  function removeFirstH1(markdown) {
    const lines = markdown.split("\n");
    if (!lines.length) {
      return markdown;
    }
    if (/^#\s+/.test(lines[0])) {
      lines.shift();
      if (lines[0] === "") {
        lines.shift();
      }
    }
    return lines.join("\n");
  }

  function markdownToHtml(markdown) {
    const lines = markdown.split("\n");
    const html = [];

    let paragraph = [];
    let inCode = false;
    let codeLines = [];
    let listType = null;

    function flushParagraph() {
      if (paragraph.length) {
        html.push(`<p>${parseInline(paragraph.join(" "))}</p>`);
        paragraph = [];
      }
    }

    function closeList() {
      if (listType === "ul") {
        html.push("</ul>");
      } else if (listType === "ol") {
        html.push("</ol>");
      }
      listType = null;
    }

    for (const line of lines) {
      if (inCode) {
        if (line.startsWith("```")) {
          html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
          codeLines = [];
          inCode = false;
          continue;
        }
        codeLines.push(line);
        continue;
      }

      if (line.startsWith("```")) {
        flushParagraph();
        closeList();
        inCode = true;
        continue;
      }

      if (!line.trim()) {
        flushParagraph();
        closeList();
        continue;
      }

      if (/^###\s+/.test(line)) {
        flushParagraph();
        closeList();
        html.push(`<h3>${parseInline(line.replace(/^###\s+/, ""))}</h3>`);
        continue;
      }

      if (/^##\s+/.test(line)) {
        flushParagraph();
        closeList();
        html.push(`<h2>${parseInline(line.replace(/^##\s+/, ""))}</h2>`);
        continue;
      }

      if (/^#\s+/.test(line)) {
        flushParagraph();
        closeList();
        html.push(`<h1>${parseInline(line.replace(/^#\s+/, ""))}</h1>`);
        continue;
      }

      if (/^-\s+/.test(line)) {
        flushParagraph();
        if (listType !== "ul") {
          closeList();
          html.push("<ul>");
          listType = "ul";
        }
        html.push(`<li>${parseInline(line.replace(/^-\s+/, ""))}</li>`);
        continue;
      }

      if (/^\d+\.\s+/.test(line)) {
        flushParagraph();
        if (listType !== "ol") {
          closeList();
          html.push("<ol>");
          listType = "ol";
        }
        html.push(`<li>${parseInline(line.replace(/^\d+\.\s+/, ""))}</li>`);
        continue;
      }

      paragraph.push(line.trim());
    }

    flushParagraph();
    closeList();

    if (inCode && codeLines.length) {
      html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
    }

    return html.join("\n");
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

  function getSlug() {
    const params = new URLSearchParams(window.location.search);
    const querySlug = params.get("slug");
    if (querySlug) {
      return querySlug;
    }

    const datasetSlug = document.body.getAttribute("data-blog-slug");
    return datasetSlug || "";
  }

  function updateSeo(post) {
    const title = `${post.title} | Andrei Costa`;
    const description = post.excerpt || "Artigo técnico do blog de Andrei Costa.";

    document.title = title;

    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute("content", description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const safeSlug = encodeURIComponent(post.slug);
      canonical.setAttribute("href", `https://nullcipherr.github.io/blog/post.html?slug=${safeSlug}`);
    }
  }

  async function fetchIndex() {
    const response = await fetch(`${INDEX_URL}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Falha ao carregar índice de posts (${response.status}).`);
    }
    return response.json();
  }

  async function fetchMarkdown(rawPath) {
    const response = await fetch(`${BLOG_RAW_BASE}/${rawPath}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Falha ao carregar conteúdo do post (${response.status}).`);
    }
    return response.text();
  }

  async function bootstrap() {
    const slug = getSlug();

    if (!slug) {
      titleEl.textContent = "Slug do artigo não informado";
      metaEl.textContent = "Use /blog/post.html?slug=nome-do-artigo.";
      contentEl.innerHTML = "<p>Não foi possível identificar qual artigo deve ser carregado.</p>";
      return;
    }

    try {
      const payload = await fetchIndex();
      const posts = Array.isArray(payload.posts) ? payload.posts : [];
      const post = posts.find((item) => item.slug === slug);

      if (!post) {
        throw new Error(`Post não encontrado para slug: ${slug}`);
      }

      const markdown = await fetchMarkdown(post.rawPath);
      const cleanMarkdown = removeFirstH1(markdown);

      projectEl.textContent = `PROJETO: ${(post.project || "BLOG").toUpperCase()}`;
      titleEl.textContent = post.title;
      metaEl.textContent = `Publicado em ${formatDate(post.publishedAt)} • Leitura estimada: ${post.readingTime || "N/A"}`;
      contentEl.innerHTML = markdownToHtml(cleanMarkdown);
      updateSeo(post);
    } catch (error) {
      titleEl.textContent = "Não foi possível carregar este artigo";
      metaEl.textContent = "Verifique o repositório portfolio-blog e tente novamente.";
      contentEl.innerHTML = "<p>Erro ao consumir conteúdo remoto do CMS.</p>";
      console.error("[blog-post]", error);
    }
  }

  bootstrap();
})();
