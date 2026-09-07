// IA na Educação — interações básicas (menu mobile + revelação suave ao rolar)

document.addEventListener('DOMContentLoaded', function () {
  // --- Menu mobile ---
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');

  if (toggle && links) {
    var closeMenu = function () {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', function (event) {
      if (!links.classList.contains('is-open')) return;
      if (links.contains(event.target) || toggle.contains(event.target)) return;
      closeMenu();
    });
  }

  // --- Revelação suave das seções ao rolar ---
  var revealTargets = document.querySelectorAll('.section-block');

  if ('IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach(function (el) { el.classList.add('reveal'); });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(function (el) { observer.observe(el); });
  }

  // --- Novidades do blog (categoria Inteligência Artificial) ---
  var POSTS_CONFIG = {
    siteUrl: 'academiaisidoro.wordpress.com',
    category: 'inteligencia-artificial',
    limit: 6,
    fallbackImage: 'https://academiaisidoro.wordpress.com/wp-content/uploads/2020/07/wp-1595090344379.jpg'
  };

  var postsContainer = document.getElementById('container-novidades');
  var latestPosts = []; // guarda os posts completos (com HTML) para abrir no modal sem nova requisição

  function cleanExcerpt(html, limit) {
    var doc = new DOMParser().parseFromString(html || '', 'text/html');
    var text = doc.body.textContent || '';
    return text.length > limit ? text.slice(0, limit).trim() + '…' : text.trim();
  }

  function formatPostDate(iso) {
    var date = new Date(iso);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  function buildPostCard(post, index) {
    var image = post.featured_image || POSTS_CONFIG.fallbackImage;
    var excerpt = cleanExcerpt(post.excerpt || post.content, 130);
    var date = formatPostDate(post.date);

    return (
      '<article class="post-card">' +
        '<img class="post-thumb" src="' + image + '" alt="" loading="lazy" onerror="this.src=\'' + POSTS_CONFIG.fallbackImage + '\';">' +
        '<div class="post-body">' +
          '<span class="category-pill">Inteligência Artificial</span>' +
          '<h3 class="post-title">' +
            '<button type="button" class="post-title-btn" data-post-index="' + index + '">' + post.title + '</button>' +
          '</h3>' +
          '<p class="post-excerpt">' + excerpt + '</p>' +
          '<span class="post-date">' + date + '</span>' +
          '<button type="button" class="card-link article-open-btn" data-post-index="' + index + '">Ler aqui <span aria-hidden="true">&rarr;</span></button>' +
        '</div>' +
      '</article>'
    );
  }

  function loadLatestPosts() {
    if (!postsContainer) return;

    var endpoint = 'https://public-api.wordpress.com/rest/v1.1/sites/' + POSTS_CONFIG.siteUrl +
      '/posts/?category=' + POSTS_CONFIG.category + '&number=' + POSTS_CONFIG.limit;

    fetch(endpoint)
      .then(function (response) {
        if (!response.ok) throw new Error('Falha ao consultar a API do blog.');
        return response.json();
      })
      .then(function (data) {
        if (!data.posts || data.posts.length === 0) {
          postsContainer.innerHTML = '<div class="posts-empty">Nenhuma publicação por aqui ainda. <a href="https://' + POSTS_CONFIG.siteUrl + '/category/' + POSTS_CONFIG.category + '/" target="_blank" rel="noopener noreferrer">Veja a categoria completa no blog &rarr;</a></div>';
          return;
        }
        latestPosts = data.posts;
        postsContainer.innerHTML = data.posts.map(buildPostCard).join('');
      })
      .catch(function () {
        postsContainer.innerHTML = '<div class="posts-error">Não foi possível carregar as publicações agora. <a href="https://' + POSTS_CONFIG.siteUrl + '/category/' + POSTS_CONFIG.category + '/" target="_blank" rel="noopener noreferrer">Veja no blog &rarr;</a></div>';
      });
  }

  // --- Modal de leitura (abre o post completo, com vídeos e imagens, sem sair do site) ---
  var articleModal = document.getElementById('article-modal');
  var articleModalBody = document.getElementById('article-modal-body');
  var articleModalClose = document.getElementById('article-modal-close');

  function openArticleModal(post) {
    if (!articleModal || !articleModalBody) return;

    var date = formatPostDate(post.date);
    var image = post.featured_image;

    articleModalBody.innerHTML =
      '<span class="category-pill">Inteligência Artificial</span>' +
      '<h2 class="article-title">' + post.title + '</h2>' +
      '<span class="post-date article-date">' + date + '</span>' +
      (image ? '<img class="article-cover" src="' + image + '" alt="">' : '') +
      '<div class="article-body">' + post.content + '</div>' +
      '<a class="card-link article-source-link" href="' + post.URL + '" target="_blank" rel="noopener noreferrer">Ver publicação original no blog <span aria-hidden="true">&rarr;</span></a>';

    // Torna vídeos incorporados (YouTube, etc.) responsivos, envolvendo cada iframe
    articleModalBody.querySelectorAll('iframe').forEach(function (iframe) {
      if (iframe.parentElement.classList.contains('article-embed')) return;
      var wrapper = document.createElement('div');
      wrapper.className = 'article-embed';
      iframe.parentNode.insertBefore(wrapper, iframe);
      wrapper.appendChild(iframe);
    });

    articleModal.classList.add('is-open');
    document.body.classList.add('modal-open');
    articleModalBody.scrollTop = 0;
  }

  function closeArticleModal() {
    if (!articleModal) return;
    articleModal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  }

  if (postsContainer) {
    postsContainer.addEventListener('click', function (event) {
      var trigger = event.target.closest('[data-post-index]');
      if (!trigger) return;
      var post = latestPosts[Number(trigger.getAttribute('data-post-index'))];
      if (post) openArticleModal(post);
    });
  }

  if (articleModalClose) articleModalClose.addEventListener('click', closeArticleModal);

  if (articleModal) {
    articleModal.addEventListener('click', function (event) {
      if (event.target === articleModal) closeArticleModal();
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeArticleModal();
  });

  loadLatestPosts();
});
