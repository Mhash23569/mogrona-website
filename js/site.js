/* =====================================================================
   MOGRONA — site engine
   You should not need to edit this file. All text, products, recipes
   and shops are in js/data.js.
   ===================================================================== */
(function () {
  'use strict';

  var D = window.MOGRONA;
  var S = D.site;
  var P0 = D.products[0];

  /* ---------- small helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function param(key) { return new URLSearchParams(window.location.search).get(key); }
  function find(list, id) { return list.filter(function (x) { return x.id === id; })[0]; }
  function unique(list) { return list.filter(function (x, i) { return list.indexOf(x) === i; }); }
  function fullName(p) { return p.pack ? p.name + ' — ' + p.pack : p.name; }
  function niceDate(iso) {
    var d = new Date(iso + 'T00:00:00');
    return isNaN(d) ? '' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  /* 0.5 -> "½", 1.5 -> "1½", 6 -> "6" */
  function qty(n) {
    var whole = Math.floor(n), frac = Math.round((n - whole) * 100) / 100;
    if (frac === 0) return String(whole);
    if (frac === 0.5) return (whole ? whole : '') + '½';
    return String(Math.round(n * 10) / 10);
  }
  function num(n) { return Number(n).toLocaleString('en-US', { maximumFractionDigits: 1 }); }

  var LEAF = '<svg class="leaf" viewBox="0 0 48 32" aria-hidden="true"><path d="M23 31C10 28 3 18 4 3c12 2 20 10 19 28z" fill="#7CC043"/><path d="M25 31c13-3 20-13 19-28-12 2-20 10-19 28z" fill="#3F9E3C"/></svg>';
  var ICON_SEARCH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>';
  var PLACEHOLDER = '<div class="slot__ph">' + LEAF + '<span>Photo coming soon</span></div>';

  /* ---------- picture slots ----------
     slot() writes an empty frame with a fixed shape. mountSlots() then
     loads the picture into it. Any picture, any size, fits the frame.
     Missing picture -> tidy placeholder instead of a broken image.     */
  function slot(src, alt, cls, fallback) {
    return '<div class="slot ' + cls + '" data-img="' + esc(src) + '" data-alt="' + esc(alt) + '"' +
      (fallback ? ' data-fallback="' + esc(fallback) + '"' : '') + '></div>';
  }
  function mountSlots(root) {
    $$('[data-img]', root).forEach(function (el) {
      if (el.getAttribute('data-mounted')) return;
      el.setAttribute('data-mounted', '1');
      var src = el.getAttribute('data-img');
      var fallback = el.getAttribute('data-fallback');
      var img = new Image();
      img.alt = el.getAttribute('data-alt') || '';
      img.decoding = 'async';
      img.onerror = function () {
        if (fallback) { var f = fallback; fallback = null; img.src = f; return; }
        el.classList.add('is-empty');
        el.title = 'Add this picture: ' + src;
        el.innerHTML = PLACEHOLDER;
      };
      el.appendChild(img);
      img.src = src;
    });
  }

  /* ---------- buy button ---------- */
  function waLink(text) {
    return 'https://wa.me/' + String(S.whatsapp).replace(/\D/g, '') + '?text=' + encodeURIComponent(text);
  }
  function buyButton(p, cls) {
    cls = cls || 'btn';
    if (p.buyUrl) return '<a class="' + cls + '" href="' + esc(p.buyUrl) + '" target="_blank" rel="noopener">Buy Now</a>';
    if (S.whatsapp) return '<a class="' + cls + '" href="' + esc(waLink('Hello, I would like to order ' + fullName(p) + '.')) + '" target="_blank" rel="noopener">Order on WhatsApp</a>';
    return '<a class="' + cls + '" href="where-to-buy.html">Where to Buy</a>';
  }

  /* ---------- header + footer ---------- */
  function wordmark() {
    return '<span class="wordmark">' + LEAF + esc(S.name) + '<small>' + esc(S.tagline) + '</small></span>';
  }
  function renderHeader() {
    var page = document.body.getAttribute('data-page') || '';
    function act(names) { return names.split(' ').indexOf(page) > -1 ? ' class="is-active"' : ''; }
    var cats = unique(D.recipes.map(function (r) { return r.category; }));
    var html =
      '<a class="skip" href="#main">Skip to main content</a>' +
      '<div class="announce"><a href="quiz.html">' + esc(S.announcement) + ' <span aria-hidden="true">→</span></a></div>' +
      '<header class="header"><div class="wrap header__in">' +
        '<a class="logo" href="index.html" aria-label="' + esc(S.name) + ' home">' + wordmark() + '</a>' +
        '<button class="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>' +
        '<nav class="nav" id="nav" aria-label="Main menu"><ul class="nav__list">' +
          '<li class="has-sub"><a href="products.html"' + act('products product') + '>Products</a><ul class="sub">' +
            D.products.map(function (p) { return '<li><a href="product.html?id=' + esc(p.id) + '">' + esc(fullName(p)) + '</a></li>'; }).join('') +
            '<li><a href="products.html">All products</a></li></ul></li>' +
          '<li class="has-sub"><a href="recipes.html"' + act('recipes recipe') + '>Recipes</a><ul class="sub">' +
            cats.map(function (c) { return '<li><a href="recipes.html?category=' + encodeURIComponent(c) + '">' + esc(c) + '</a></li>'; }).join('') +
            '<li><a href="recipes.html">All recipes</a></li></ul></li>' +
          '<li><a href="where-to-buy.html"' + act('where') + '>Where to Buy</a></li>' +
          '<li><a href="health.html"' + act('health') + '>Health</a></li>' +
          '<li><a href="story.html"' + act('story') + '>Our Story</a></li>' +
          '<li><a href="blog.html"' + act('blog post') + '>Blog</a></li>' +
          '<li><a href="faq.html"' + act('faq') + '>FAQ</a></li>' +
          '<li class="nav__search"><button class="icon-btn" type="button" aria-label="Search" aria-expanded="false">' + ICON_SEARCH + '</button>' +
            '<form class="search" action="search.html" method="get" role="search"><input type="search" name="q" placeholder="Search the site" aria-label="Search the site" required><button class="btn btn--green btn--sm" type="submit">Go</button></form></li>' +
          '<li class="nav__cta">' + buyButton(P0, 'btn btn--sm') + '</li>' +
        '</ul></nav>' +
      '</div></header>';
    $('#header').innerHTML = html;

    /* real logo file, if the client has added one */
    var logo = new Image();
    logo.onload = function () { $('.logo').innerHTML = ''; logo.alt = S.name; $('.logo').appendChild(logo); };
    logo.src = S.logo;

    var burger = $('.burger'), nav = $('#nav');
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    var sBtn = $('.nav__search .icon-btn'), sForm = $('.search');
    sBtn.addEventListener('click', function () {
      var open = sForm.classList.toggle('open');
      sBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) $('input', sForm).focus();
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav__search')) { sForm.classList.remove('open'); sBtn.setAttribute('aria-expanded', 'false'); }
    });
  }

  function renderFooter() {
    var soc = Object.keys(S.social).filter(function (k) { return S.social[k]; }).map(function (k) {
      return '<a href="' + esc(S.social[k]) + '" target="_blank" rel="noopener">' + k.charAt(0).toUpperCase() + k.slice(1) + '</a>';
    }).join('');
    $('#footer').innerHTML =
      '<footer class="footer"><div class="wrap">' +
        '<div class="footer__grid">' +
          '<div class="footer__about">' + wordmark() +
            '<p><b>Marketed by</b><br>' + esc(S.company) + '<br>' + esc(S.address) + '</p>' +
            (S.manufacturer ? '<p><b>Manufactured by</b><br>' + esc(S.manufacturer) + '</p>' : '') +
            (soc ? '<div class="social">' + soc + '</div>' : '') +
          '</div>' +
          '<div><h4>Products</h4><ul>' +
            D.products.map(function (p) { return '<li><a href="product.html?id=' + esc(p.id) + '">' + esc(fullName(p)) + '</a></li>'; }).join('') +
            '<li><a href="where-to-buy.html">Where to Buy</a></li></ul></div>' +
          '<div><h4>Explore</h4><ul>' +
            '<li><a href="recipes.html">Recipes</a></li><li><a href="health.html">Health</a></li>' +
            '<li><a href="blog.html">Blog</a></li><li><a href="quiz.html">Sweet Swap Quiz</a></li></ul></div>' +
          '<div><h4>Company</h4><ul>' +
            '<li><a href="story.html">Our Story</a></li><li><a href="faq.html">FAQ</a></li>' +
            '<li><a href="contact.html">Contact Us</a></li></ul></div>' +
        '</div>' +
        '<div class="footer__bottom"><p>© ' + new Date().getFullYear() + ' ' + esc(S.company) + '. All rights reserved.</p>' +
        '<p>The information on this website is general and is not medical advice.</p></div>' +
      '</div></footer>';
  }

  /* ---------- reusable pieces ---------- */
  function productCard(p) {
    var url = 'product.html?id=' + esc(p.id);
    return '<article class="card"><a class="card__media" href="' + url + '" tabindex="-1" aria-hidden="true">' + slot(p.images[0] || '', '', 'r-1x1 contain') + '</a>' +
      '<div class="card__body">' + (p.pack ? '<span class="tag">' + esc(p.pack) + '</span>' : '') +
      '<h3><a href="' + url + '">' + esc(p.name) + '</a></h3><p>' + esc(p.short) + '</p>' +
      '<a class="btn btn--green btn--sm" href="' + url + '">View product</a></div></article>';
  }
  function productSpotlight(p) {
    var url = 'product.html?id=' + esc(p.id);
    return '<div class="split"><div>' + slot(p.images[0] || '', fullName(p), 'r-1x1 contain') + '</div><div>' +
      (p.pack ? '<p class="eyebrow">' + esc(p.pack) + '</p>' : '') +
      '<h3 style="font-size:2rem;text-transform:uppercase">' + esc(p.name) + '</h3><p>' + esc(p.short) + '</p>' +
      '<ul class="facts">' + p.facts.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' +
      '<p class="sweetness">' + esc(p.sweetness) + '</p>' +
      '<div class="btns"><a class="btn btn--green" href="' + url + '">View product</a>' + buyButton(p, 'btn btn--outline') + '</div></div></div>';
  }
  function recipeCard(r) {
    var url = 'recipe.html?id=' + esc(r.id);
    return '<article class="card"><a class="card__media" href="' + url + '" tabindex="-1" aria-hidden="true">' + slot(r.image, '', 'r-4x3') + '</a>' +
      '<div class="card__body"><span class="tag">' + esc(r.category) + ' · ' + esc(r.time) + '</span>' +
      '<h3><a href="' + url + '">' + esc(r.title) + '</a></h3><p>' + esc(r.intro) + '</p></div></article>';
  }
  function postCard(p) {
    var url = 'post.html?id=' + esc(p.id);
    return '<article class="card"><a class="card__media" href="' + url + '" tabindex="-1" aria-hidden="true">' + slot(p.image, '', 'r-16x9') + '</a>' +
      '<div class="card__body"><span class="tag">' + esc(niceDate(p.date)) + '</span>' +
      '<h3><a href="' + url + '">' + esc(p.title) + '</a></h3><p>' + esc(p.summary) + '</p>' +
      '<a class="btn btn--outline btn--sm" href="' + url + '">Read article</a></div></article>';
  }
  function nutritionPanel(p) {
    var n = p.nutrition;
    if (!n) return '';
    return '<div class="nf"><h3>Nutrition Facts</h3><p>' + esc(n.servings) + '</p>' +
      '<div class="nf__row"><b>Serving size</b><b>' + esc(n.servingSize) + '</b></div>' +
      '<div class="nf__row nf__cal"><span>Calories</span><span>' + esc(n.calories) + '</span></div>' +
      '<div class="nf__row nf__dv">% Daily Value</div>' +
      n.rows.map(function (r) { return '<div class="nf__row"><span><b>' + esc(r[0]) + '</b> ' + esc(r[1]) + '</span><b>' + esc(r[2]) + '</b></div>'; }).join('') +
      '</div>';
  }
  function conversionTable(p) {
    var per = p.sachetTsp || 2;
    var rows = [['1 teaspoon', 1], ['2 teaspoons', 2], ['1 tablespoon', 3], ['¼ cup', 12], ['⅓ cup', 16], ['½ cup', 24], ['1 cup', 48]];
    return '<table class="chart"><thead><tr><th>Sugar</th><th>' + esc(S.name) + ' sachets</th></tr></thead><tbody>' +
      rows.map(function (r) { var s = r[1] / per; return '<tr><td>' + r[0] + '</td><td>' + qty(s) + (s > 1 ? ' sachets' : ' sachet') + '</td></tr>'; }).join('') +
      '</tbody></table>';
  }
  function notFound(what, link, label) {
    return '<section class="section"><div class="wrap center"><h1>' + what + ' not found</h1><p>Sorry, we could not find that page.</p><div class="btns"><a class="btn btn--green" href="' + link + '">' + label + '</a></div></div></section>';
  }

  /* ---------- blocks that pages ask for with data-render="..." ---------- */
  var R = {};

  R['hero-image'] = function () { return slot(S.heroImage, fullName(P0), 'r-1x1 contain bare', P0.images[0]); };

  R['badges'] = function () {
    return '<ul class="badges">' + S.badges.map(function (b) { return '<li><strong>' + esc(b[0]) + '</strong><span>' + esc(b[1]) + '</span></li>'; }).join('') + '</ul>';
  };

  R['featured-products'] = function () {
    if (D.products.length === 1) return productSpotlight(P0);
    return '<div class="grid">' + D.products.map(productCard).join('') + '</div>';
  };
  R['all-products'] = R['featured-products'];

  R['recipes-preview'] = function () { return '<div class="grid">' + D.recipes.slice(0, 3).map(recipeCard).join('') + '</div>'; };
  R['posts-preview'] = function () { return '<div class="grid">' + D.posts.slice(0, 3).map(postCard).join('') + '</div>'; };
  R['posts'] = function () { return '<div class="grid">' + D.posts.map(postCard).join('') + '</div>'; };

  R['recipes'] = function () {
    var cat = param('category');
    var cats = unique(D.recipes.map(function (r) { return r.category; }));
    if (cats.indexOf(cat) === -1) cat = null;
    var list = cat ? D.recipes.filter(function (r) { return r.category === cat; }) : D.recipes;
    return '<div class="chips"><a class="chip' + (cat ? '' : ' is-active') + '" href="recipes.html">All</a>' +
      cats.map(function (c) { return '<a class="chip' + (c === cat ? ' is-active' : '') + '" href="recipes.html?category=' + encodeURIComponent(c) + '">' + esc(c) + '</a>'; }).join('') +
      '</div><div class="grid">' + list.map(recipeCard).join('') + '</div>';
  };

  R['calculator'] = function () {
    return '<div class="calc"><div>' +
      '<label>Sweet cups or servings a day<input type="number" class="calc__cups" min="1" max="30" step="1" value="3" inputmode="numeric"></label>' +
      '<label>Teaspoons of sugar in each<input type="number" class="calc__tsp" min="0.5" max="10" step="0.5" value="2" inputmode="decimal"></label>' +
      '</div><div class="calc__out" aria-live="polite">' +
      '<div><strong data-out="sachets"></strong><span>' + esc(S.name) + ' sachets a day</span></div>' +
      '<div><strong data-out="grams"></strong><span>grams of sugar swapped out each day</span></div>' +
      '<div><strong data-out="kg"></strong><span>kilograms of sugar a year</span></div>' +
      '<div><strong data-out="kcal"></strong><span>sugar calories avoided each day</span></div>' +
      '</div><p class="note">Estimate only, based on one level teaspoon of sugar being about 4 g and 16 calories, and one sachet replacing ' + (P0.sachetTsp || 2) + ' teaspoons of sugar.</p></div>';
  };

  R['faq'] = function () {
    return '<div class="faq">' + D.faqs.map(function (f) { return '<details><summary>' + esc(f[0]) + '</summary><p>' + esc(f[1]) + '</p></details>'; }).join('') + '</div>';
  };

  R['conversion'] = function () { return conversionTable(P0); };

  R['stores'] = function () {
    if (!D.stores.length) {
      return '<div class="empty"><h2>Coming soon to a shop near you</h2><p>Mogrona is launching across Pakistan, and our list of shops and online stores will appear here.</p>' +
        '<div class="btns" style="justify-content:center">' +
        (S.whatsapp ? '<a class="btn btn--green" href="' + esc(waLink('Hello, I would like to order Mogrona.')) + '" target="_blank" rel="noopener">Order on WhatsApp</a>' : '') +
        '<a class="btn btn--outline" href="contact.html">Contact us</a></div></div>';
    }
    function group(type, title) {
      var list = D.stores.filter(function (s) { return s.type === type; });
      if (!list.length) return '';
      return '<h2>' + title + '</h2><div class="stores" style="margin-bottom:44px">' + list.map(function (s) {
        return '<div class="store"><h3>' + esc(s.name) + '</h3><p>' + esc(s.city || (type === 'online' ? 'Delivery' : '')) + '</p>' +
          (s.url ? '<a class="btn btn--green btn--sm" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + (type === 'online' ? 'Shop online' : 'Visit website') + '</a>' : '') + '</div>';
      }).join('') + '</div>';
    }
    return group('online', 'Buy online') + group('store', 'Find in store');
  };

  R['contact-details'] = function () {
    return '<ul class="contact-list">' +
      '<li><b>Company</b>' + esc(S.company) + '</li>' +
      '<li><b>Address</b>' + esc(S.address) + '</li>' +
      (S.phone ? '<li><b>Phone</b><a href="tel:' + esc(S.phone.replace(/[^\d+]/g, '')) + '">' + esc(S.phone) + '</a></li>' : '') +
      (S.email ? '<li><b>Email</b><a href="mailto:' + esc(S.email) + '">' + esc(S.email) + '</a></li>' : '') +
      (S.whatsapp ? '<li><b>WhatsApp</b><a href="' + esc(waLink('Hello, I have a question about Mogrona.')) + '" target="_blank" rel="noopener">Message us on WhatsApp</a></li>' : '') +
      '</ul>';
  };

  R['contact-form'] = function () {
    if (!S.email) {
      return '<div class="panel"><h2>Write to us</h2><p>You can reach us by post at the address shown here. More ways to get in touch are coming soon.</p></div>';
    }
    return '<form class="form panel" id="contact-form"><h2>Send us a message</h2>' +
      '<label>Your name<input type="text" name="name" required autocomplete="name"></label>' +
      '<label>Your message<textarea name="message" required></textarea></label>' +
      '<button class="btn btn--green" type="submit">Send message</button>' +
      '<p class="note" style="margin-top:14px">This opens your email app with the message ready to send.</p></form>';
  };

  R['product'] = function () {
    var id = param('id');
    var p = id ? find(D.products, id) : P0;
    if (!p) return notFound('Product', 'products.html', 'See all products');
    document.title = fullName(p) + ' | ' + S.name;
    var made = D.recipes.slice(0, 3);
    return '<div class="wrap"><p class="crumbs"><a href="index.html">Home</a> › <a href="products.html">Products</a> › ' + esc(p.name) + '</p>' +
      '<div class="product">' +
        '<div class="gallery" data-gallery="' + esc(JSON.stringify(p.images)) + '" data-alt="' + esc(fullName(p)) + '">' +
          '<div class="slot r-1x1 contain gallery__main"></div><div class="gallery__thumbs"></div></div>' +
        '<div class="product__info"><h1>' + esc(p.name) + '</h1>' +
          (p.pack ? '<p class="product__pack">' + esc(p.pack) + '</p>' : '') +
          (p.price ? '<p class="product__price">' + esc(p.price) + '</p>' : '') +
          p.description.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
          (p.size ? '<p><strong>Pack size:</strong> ' + esc(p.size) + '</p>' : '') +
          '<ul class="facts">' + p.facts.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' +
          '<div class="btns">' + buyButton(p, 'btn btn--green') + '<a class="btn btn--outline" href="recipes.html">View recipes</a></div>' +
          '<p class="sweetness">' + esc(p.sweetness) + '</p>' +
        '</div></div></div>' +
      '<section class="section section--peach"><div class="wrap"><div class="detail-grid">' +
        '<div class="panel"><h2>Ingredients</h2><p>' + esc(p.ingredients) + '</p>' +
          (p.storage ? '<h2 style="margin-top:1.4em">Storage</h2><p>' + esc(p.storage) + '</p>' : '') + '</div>' +
        (p.nutrition ? '<div class="panel"><h2>Nutrition</h2>' + nutritionPanel(p) + '</div>' : '') +
        '<div class="panel"><h2>Sugar to ' + esc(S.name) + '</h2>' + conversionTable(p) + '</div>' +
      '</div></div></section>' +
      '<section class="section"><div class="wrap"><div class="section__head"><p class="eyebrow">Made with ' + esc(S.name) + '</p><h2>Try it in a recipe</h2></div>' +
        '<div class="grid">' + made.map(recipeCard).join('') + '</div>' +
        '<div class="section__foot"><a class="btn btn--green" href="recipes.html">See all recipes</a></div></div></section>';
  };

  R['recipe'] = function () {
    var r = find(D.recipes, param('id'));
    if (!r) return notFound('Recipe', 'recipes.html', 'See all recipes');
    document.title = r.title + ' | ' + S.name + ' Recipes';
    var more = D.recipes.filter(function (x) { return x.id !== r.id; }).slice(0, 3);
    return '<section class="page-hero"><div class="wrap"><p class="eyebrow">' + esc(r.category) + '</p><h1>' + esc(r.title) + '</h1><p>' + esc(r.intro) + '</p></div></section>' +
      '<section class="section"><div class="wrap"><div class="recipe">' +
        '<div>' + slot(r.image, r.title, 'r-4x3') +
          '<ul class="meta" style="margin-top:22px"><li><b>Time</b>' + esc(r.time) + '</li><li><b>Serves</b>' + esc(r.serves) + '</li></ul>' +
          '<div class="btns"><a class="btn btn--green btn--sm" href="product.html?id=' + esc(P0.id) + '">Made with ' + esc(S.name) + '</a></div></div>' +
        '<div><h2>Ingredients</h2><ul>' + r.ingredients.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' +
          '<h2>Method</h2><ol>' + r.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol></div>' +
      '</div></div></section>' +
      '<section class="section section--peach"><div class="wrap"><div class="section__head"><h2>More recipes</h2></div><div class="grid">' + more.map(recipeCard).join('') + '</div></div></section>';
  };

  R['post'] = function () {
    var p = find(D.posts, param('id'));
    if (!p) return notFound('Article', 'blog.html', 'See all articles');
    document.title = p.title + ' | ' + S.name + ' Blog';
    var body = p.body.map(function (b) {
      if (typeof b === 'string') return '<p>' + esc(b) + '</p>';
      if (b[0] === 'h') return '<h2>' + esc(b[1]) + '</h2>';
      if (b[0] === 'ul') return '<ul>' + b[1].map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
      return '';
    }).join('');
    return '<section class="page-hero"><div class="wrap"><p class="eyebrow">' + esc(niceDate(p.date)) + '</p><h1>' + esc(p.title) + '</h1></div></section>' +
      '<section class="section"><div class="wrap wrap--narrow prose">' + slot(p.image, p.title, 'r-16x9') + body +
      '<div class="btns"><a class="btn btn--outline" href="blog.html">← All articles</a></div></div></section>';
  };

  R['search'] = function () {
    var q = (param('q') || '').trim();
    var head = '<form class="form" action="search.html" method="get" role="search" style="display:flex;gap:10px;margin-bottom:32px">' +
      '<input type="search" name="q" value="' + esc(q) + '" placeholder="Search the site" aria-label="Search the site" style="margin:0" required>' +
      '<button class="btn btn--green" type="submit">Search</button></form>';
    if (!q) return head;
    var needle = q.toLowerCase();
    function has() { return Array.prototype.slice.call(arguments).join(' ').toLowerCase().indexOf(needle) > -1; }
    var hits = [];
    D.products.forEach(function (p) { if (has(p.name, p.pack, p.short, p.description.join(' '), p.ingredients, p.facts.join(' '))) hits.push(['Product', fullName(p), p.short, 'product.html?id=' + p.id]); });
    D.recipes.forEach(function (r) { if (has(r.title, r.category, r.intro, r.ingredients.join(' '))) hits.push(['Recipe', r.title, r.intro, 'recipe.html?id=' + r.id]); });
    D.posts.forEach(function (p) { if (has(p.title, p.summary, p.body.map(function (b) { return typeof b === 'string' ? b : [].concat(b[1]).join(' '); }).join(' '))) hits.push(['Article', p.title, p.summary, 'post.html?id=' + p.id]); });
    D.faqs.forEach(function (f) { if (has(f[0], f[1])) hits.push(['FAQ', f[0], f[1], 'faq.html']); });
    if (!hits.length) return head + '<div class="empty"><h2>No results</h2><p>We could not find anything for “' + esc(q) + '”. Try a different word.</p></div>';
    return head + '<p class="muted">' + hits.length + (hits.length === 1 ? ' result' : ' results') + ' for “' + esc(q) + '”</p><div class="stores">' +
      hits.map(function (h) { return '<div class="store"><span class="tag">' + h[0] + '</span><h3><a href="' + esc(h[3]) + '">' + esc(h[1]) + '</a></h3><p>' + esc(h[2]) + '</p></div>'; }).join('') + '</div>';
  };

  R['quiz'] = function () { return '<div class="quiz" id="quiz"></div>'; };

  /* ---------- interactive parts ---------- */
  function initGallery() {
    var g = $('[data-gallery]');
    if (!g) return;
    var list = JSON.parse(g.getAttribute('data-gallery'));
    var alt = g.getAttribute('data-alt');
    var main = $('.gallery__main', g), thumbs = $('.gallery__thumbs', g);
    var good = new Array(list.length), pending = list.length;
    function show(src) { main.innerHTML = '<img src="' + esc(src) + '" alt="' + esc(alt) + '">'; }
    function empty() { main.classList.add('is-empty'); main.innerHTML = PLACEHOLDER; }
    function finish() {
      var ok = good.filter(Boolean);
      if (!ok.length) return empty();
      show(ok[0]);
      if (ok.length > 1) {
        thumbs.innerHTML = ok.map(function (s, i) {
          return '<button type="button" class="thumb' + (i ? '' : ' is-active') + '" data-src="' + esc(s) + '" aria-label="Show picture ' + (i + 1) + '"><img src="' + esc(s) + '" alt=""></button>';
        }).join('');
      }
    }
    if (!pending) return empty();
    list.forEach(function (src, i) {
      var im = new Image();
      im.onload = function () { good[i] = src; if (--pending === 0) finish(); };
      im.onerror = function () { if (--pending === 0) finish(); };
      im.src = src;
    });
    thumbs.addEventListener('click', function (e) {
      var b = e.target.closest('.thumb');
      if (!b) return;
      $$('.thumb', thumbs).forEach(function (t) { t.classList.remove('is-active'); });
      b.classList.add('is-active');
      show(b.getAttribute('data-src'));
    });
  }

  function initCalculators() {
    $$('.calc').forEach(function (c) {
      var cups = $('.calc__cups', c), tsp = $('.calc__tsp', c), per = P0.sachetTsp || 2;
      function clamp(v, lo, hi, def) { v = parseFloat(v); if (isNaN(v)) return def; return Math.min(hi, Math.max(lo, v)); }
      function update() {
        var total = clamp(cups.value, 1, 30, 1) * clamp(tsp.value, 0.5, 10, 0.5);
        $('[data-out="sachets"]', c).textContent = qty(Math.round(total / per * 2) / 2);
        $('[data-out="grams"]', c).textContent = num(total * 4) + ' g';
        $('[data-out="kg"]', c).textContent = num(total * 4 * 365 / 1000) + ' kg';
        $('[data-out="kcal"]', c).textContent = num(total * 16);
      }
      cups.addEventListener('input', update);
      tsp.addEventListener('input', update);
      update();
    });
  }

  function initQuiz() {
    var box = $('#quiz');
    if (!box) return;
    var Q = [
      { key: 'use', q: 'What do you sweeten most often?', opts: [
        ['Chai or tea', 'karak-chai'], ['Coffee', 'iced-coffee'], ['Cold drinks and juices', 'mint-lemonade'], ['Breakfast and desserts', 'overnight-oats']] },
      { key: 'tsp', q: 'How much sugar do you usually add to each cup or serving?', opts: [
        ['1 teaspoon', 1], ['2 teaspoons', 2], ['3 teaspoons', 3], ['4 teaspoons or more', 4]] },
      { key: 'cups', q: 'How many sweetened cups or servings do you have a day?', opts: [
        ['1', 1], ['2', 2], ['3', 3], ['4 or more', 4]] },
      { key: 'goal', q: 'What matters most to you?', opts: [
        ['Cutting down on sugar', 'sugar'], ['Watching my weight', 'weight'], ['Watching my blood sugar', 'blood'], ['Choosing plant-based sweetness', 'plant']] }
    ];
    var GOAL = {
      sugar: 'Swapping the sugar in the cups you already drink is one of the simplest ways to cut down.',
      weight: 'Mogrona has zero calories, so your favourite drinks stay sweet without the sugar calories.',
      blood: 'Mogrona contains no sugar. If you have diabetes, ask your doctor or dietitian how it fits into your plan.',
      plant: 'Mogrona is plant based, sweetened with monk fruit extract and contains no stevia.'
    };
    var step = 0, ans = {};

    function draw() {
      if (step >= Q.length) return result();
      var s = Q[step];
      box.innerHTML = '<div class="quiz__bar"><i style="width:' + (step / Q.length * 100) + '%"></i></div>' +
        '<p class="quiz__step">Question ' + (step + 1) + ' of ' + Q.length + '</p><h2 tabindex="-1">' + esc(s.q) + '</h2>' +
        '<div class="quiz__opts">' + s.opts.map(function (o, i) { return '<button type="button" class="quiz__opt" data-i="' + i + '">' + esc(o[0]) + '</button>'; }).join('') + '</div>' +
        (step ? '<button type="button" class="quiz__back">← Back</button>' : '');
    }
    function result() {
      var p = P0, per = p.sachetTsp || 2;
      var each = ans.tsp / per, total = ans.tsp * ans.cups;
      var r = find(D.recipes, ans.use) || D.recipes[0];
      box.innerHTML = '<div class="quiz__bar"><i style="width:100%"></i></div>' +
        '<p class="quiz__step">Your sweet swap</p><h2 tabindex="-1">' + esc(fullName(p)) + '</h2>' +
        '<div class="result">' + slot(p.images[0] || '', fullName(p), 'r-1x1 contain') + '<div>' +
          '<p>' + esc(GOAL[ans.goal]) + '</p>' +
          '<p class="result__stat">Use <strong>' + qty(each) + (each > 1 ? ' sachets' : ' sachet') + '</strong> in each cup or serving in place of ' + ans.tsp + (ans.tsp > 1 ? ' teaspoons' : ' teaspoon') + ' of sugar.</p>' +
          '<p class="result__stat">That swaps out about <strong>' + num(total * 4) + ' g</strong> of sugar a day, or roughly <strong>' + num(total * 4 * 365 / 1000) + ' kg</strong> a year.</p>' +
        '</div></div>' +
        (r ? '<p><strong>A recipe to try:</strong> <a href="recipe.html?id=' + esc(r.id) + '">' + esc(r.title) + '</a></p>' : '') +
        '<div class="btns"><a class="btn btn--green" href="product.html?id=' + esc(p.id) + '">View product</a>' + buyButton(p, 'btn btn--outline') + '</div>' +
        '<button type="button" class="quiz__back" data-restart="1">Start again</button>' +
        '<p class="note" style="margin-top:18px">Estimate based on one level teaspoon of sugar being about 4 g.</p>';
      mountSlots(box);
    }
    box.addEventListener('click', function (e) {
      var o = e.target.closest('.quiz__opt'), b = e.target.closest('.quiz__back');
      if (o) { ans[Q[step].key] = Q[step].opts[+o.getAttribute('data-i')][1]; step++; }
      else if (b) { if (b.getAttribute('data-restart')) { step = 0; ans = {}; } else { step--; } }
      else return;
      draw();
      var h = $('h2', box); if (h) h.focus({ preventScroll: true });
    });
    draw();
  }

  function initContactForm() {
    var f = $('#contact-form');
    if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = f.elements.name.value.trim(), msg = f.elements.message.value.trim();
      window.location.href = 'mailto:' + S.email + '?subject=' + encodeURIComponent('Website enquiry from ' + name) + '&body=' + encodeURIComponent(msg + '\n\n' + name);
    });
  }

  /* ---------- start ---------- */
  renderHeader();
  renderFooter();
  $$('[data-render]').forEach(function (el) {
    var fn = R[el.getAttribute('data-render')];
    if (fn) el.innerHTML = fn();
  });
  mountSlots(document);
  initGallery();
  initCalculators();
  initQuiz();
  initContactForm();
})();
