(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var C = window.CATEGORIES, P = window.PROJECTS;
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  /* ---------- capa: tira de fotos do desfile ---------- */
  $("#hero-strip").innerHTML = window.HERO.map(function (src, i) {
    return '<div class="hero__ph" style="--i:' + i + '"><img src="' + src + '" alt="" ' + (i < 2 ? "" : 'loading="lazy" ') + 'decoding="async"></div>';
  }).join("");

  /* ---------- lista de categorias ---------- */
  $("#cats").innerHTML = C.map(function (c, i) {
    var n = c.projects.length;
    return '<li><a class="cat" href="#c/' + c.id + '"><span class="cat__n mono">' + pad(i + 1) + '</span>' +
      '<span class="cat__name title">' + esc(c.name) + '</span>' +
      '<span class="cat__count mono">' + n + (n === 1 ? " projeto" : " projetos") + '</span><span class="cat__arrow" aria-hidden="true">→</span></a></li>';
  }).join("");

  /* ---------- páginas internas ---------- */
  var viewer = $("#viewer"), body = $("#viewer-body"), back = $("#back"), home = $("#home");
  var gallery = []; // imagens da página aberta, para o modo ampliado

  function catOf(pid) { for (var i = 0; i < C.length; i++) if (C[i].projects.indexOf(pid) > -1) return C[i]; return null; }

  function projList(c, current) {
    return '<ol class="plist">' + c.projects.map(function (pid, i) {
      var p = P[pid]; if (!p) return "";
      return '<li><a href="#p/' + pid + '"' + (pid === current ? ' aria-current="page"' : "") + '>' +
        '<span class="plist__n mono">' + pad(i + 1) + '</span>' +
        '<span class="plist__t">' + esc(p.title) + (p.sub ? ' <em>' + esc(p.sub) + '</em>' : "") + '</span>' +
        '<span class="plist__y mono">' + esc(p.year || "") + (p.pending ? " · em breve" : "") + '</span></a></li>';
    }).join("") + '</ol>';
  }

  function fig(it, extra) {
    var k = gallery.push({ src: it.src, cap: it.cap || it.t || "" }) - 1;
    return '<figure class="fig' + (extra || "") + '"><button type="button" class="fig__btn" data-k="' + k + '" aria-label="Ampliar ' + esc(it.cap || it.t || "imagem") + '">' +
      '<img src="' + it.src + '" alt="' + esc(it.cap || it.t || "") + '" loading="lazy" decoding="async"></button>' +
      (it.cap ? '<figcaption class="mono">' + esc(it.cap) + '</figcaption>' : "") + '</figure>';
  }

  function paras(arr) { return (arr || []).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join(""); }

  function step(s, i) {
    var h = '<section class="step"><h3 class="step__t"><span class="mono">' + pad(i + 1) + '</span> ' + esc(s.title) + '</h3>';
    if (s.text) h += '<div class="step__text">' + paras(s.text) + '</div>';
    if (s.quote) h += '<blockquote class="quote"><p>“' + esc(s.quote[0]) + '”</p><cite class="mono">' + esc(s.quote[1]) + '</cite></blockquote>';
    var it = s.items || [];
    if (s.layout === "grid") {
      h += '<div class="grid' + (s.wide ? " grid--wide" : "") + (s.fit === "contain" ? " grid--draw" : "") + '">' + it.map(function (x) { return fig(x); }).join("") + '</div>';
    } else if (s.layout === "panels") {
      h += it.map(function (x) {
        return '<div class="panel">' + fig(x, " fig--panel") + '<div class="panel__text"><h4 class="title">' + esc(x.t) + '</h4>' + paras(x.text) + '</div></div>';
      }).join("");
    } else if (s.layout === "pairs") {
      h += '<div class="pairs">' + it.map(function (pr) { return '<div class="pair">' + fig(pr[0]) + fig(pr[1]) + '</div>'; }).join("") + '</div>';
    } else if (s.layout === "looks") {
      h += '<div class="looks">' + it.map(function (x) {
        return '<div class="look">' + fig({ src: x.src, t: "look " + x.t }) + '<h4 class="title">' + esc(x.t) + '</h4><p>' + esc(x.cap) + '</p></div>';
      }).join("") + '</div>';
    }
    return h + '</section>';
  }

  function renderCat(c) {
    gallery = [];
    var i = C.indexOf(c);
    body.innerHTML = '<div class="wrap vhead"><p class="eyebrow mono">categoria ' + pad(i + 1) + '</p><h1 class="title vtitle">' + esc(c.name) + '</h1>' +
      '<p class="vdesc">' + esc(c.desc) + '</p>' + projList(c) + '</div>' +
      '<div class="wrap covers">' + c.projects.map(function (pid) {
        var p = P[pid]; if (!p) return "";
        return '<a class="cover" href="#p/' + pid + '">' +
          (p.cover ? '<img src="' + p.cover + '" alt="" loading="lazy" decoding="async"' + (p.fitCover ? ' class="is-draw"' : "") + '>' : '<span class="cover__ph tex mono">imagens a enviar</span>') +
          '<span class="cover__cap"><b class="title">' + esc(p.title) + '</b><span class="mono">' + esc([p.year, p.ctx].filter(Boolean).join(" · ")) + '</span></span></a>';
      }).join("") + '</div>';
    back.href = "#projetos"; back.textContent = "← projetos";
  }

  function renderProj(pid) {
    var p = P[pid], c = catOf(pid);
    gallery = [];
    var h = '<article class="proj">';
    h += '<header class="wrap phead">' +
      (c ? '<p class="eyebrow mono"><a href="#c/' + c.id + '">' + esc(c.name) + '</a></p>' : "") +
      '<h1 class="title vtitle">' + esc(p.title) + '</h1>' +
      (p.sub ? '<p class="phead__sub">' + esc(p.sub) + '</p>' : "") +
      '<dl class="facts">' +
      (p.year ? '<div><dt class="mono">ano</dt><dd>' + esc(p.year) + '</dd></div>' : "") +
      (p.ctx ? '<div><dt class="mono">contexto</dt><dd>' + esc(p.ctx) + '</dd></div>' : "") +
      (p.role ? '<div><dt class="mono">trabalho</dt><dd>' + esc(p.role) + '</dd></div>' : "") + '</dl>' +
      '<p class="pdesc">' + esc(p.desc) + '</p>' +
      (p.site ? '<p><a class="btn mono" href="' + p.site + '" target="_blank" rel="noopener">ver o site da coleção ↗</a></p>' : "") +
      '</header>';
    if (p.cover && !p.fitCover) h += '<div class="pcover"><img src="' + p.cover + '" alt="' + esc(p.title) + '" decoding="async"></div>';
    h += '<div class="wrap">';
    if (p.pending) h += '<div class="todo mono">imagens a enviar — mande as fotos deste projeto que eu monto esta página no mesmo formato do IN-CONCRETO.</div>';
    h += (p.steps || []).map(step).join("");
    if (c && c.projects.length > 1) h += '<nav class="more"><p class="eyebrow mono">mais em ' + esc(c.name) + '</p>' + projList(c, pid) + '</nav>';
    h += '</div></article>';
    body.innerHTML = h;
    back.href = c ? "#c/" + c.id : "#projetos"; back.textContent = "← " + (c ? c.name.toLowerCase() : "projetos");
  }

  var lastHomeY = 0;
  function route() {
    var m = location.hash.match(/^#([cp])\/([\w-]+)/);
    var c = m && m[1] === "c" && C.filter(function (x) { return x.id === m[2]; })[0];
    var p = m && m[1] === "p" && P[m[2]];
    if (c || p) {
      if (viewer.hidden) lastHomeY = scrollY;
      c ? renderCat(c) : renderProj(m[2]);
      document.title = (c ? c.name : p.title) + " — Sofia Marinho · morman";
      viewer.hidden = false; home.setAttribute("aria-hidden", "true");
      document.documentElement.classList.add("in-viewer");
      viewer.scrollTop = 0;
    } else {
      var wasOpen = !viewer.hidden;
      viewer.hidden = true; home.removeAttribute("aria-hidden");
      document.documentElement.classList.remove("in-viewer");
      document.title = "Sofia Marinho — Portfólio morman";
      var t = location.hash && document.getElementById(location.hash.slice(1));
      if (t) t.scrollIntoView(); else if (wasOpen) scrollTo(0, lastHomeY);
    }
  }
  addEventListener("hashchange", route);
  route();

  /* ---------- imagem ampliada ---------- */
  var lb = $("#lb"), lbImg = $("#lb-img"), lbCap = $("#lb-cap"), cur = 0;
  function show(k) {
    cur = (k + gallery.length) % gallery.length;
    lbImg.src = gallery[cur].src; lbImg.alt = gallery[cur].cap; lbCap.textContent = gallery[cur].cap + "  ·  " + (cur + 1) + "/" + gallery.length;
  }
  function closeLb() { lb.hidden = true; }
  body.addEventListener("click", function (e) {
    var b = e.target.closest(".fig__btn"); if (!b) return;
    show(+b.dataset.k); lb.hidden = false; $(".lb__x").focus();
  });
  $(".lb__x").addEventListener("click", closeLb);
  $(".lb__prev").addEventListener("click", function () { show(cur - 1); });
  $(".lb__next").addEventListener("click", function () { show(cur + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  var x0 = null;
  lb.addEventListener("pointerdown", function (e) { x0 = e.clientX; });
  lb.addEventListener("pointerup", function (e) { if (x0 === null) return; var d = e.clientX - x0; x0 = null; if (Math.abs(d) > 50) show(cur + (d < 0 ? 1 : -1)); });
  addEventListener("keydown", function (e) {
    if (lb.hidden) { if (e.key === "Escape" && !viewer.hidden) location.hash = back.getAttribute("href"); return; }
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowRight") show(cur + 1);
    if (e.key === "ArrowLeft") show(cur - 1);
  });
})();
