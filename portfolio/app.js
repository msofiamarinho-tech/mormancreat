(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var C = window.CATEGORIES, P = window.PROJECTS;
  var calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  function rng(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }

  /* ================= STOP MOTION =================
     Cada .seq tem várias <img>; um relógio único troca a foto visível (troca seca),
     só nas sequências que estão na tela. */
  var FPS = 2.6, live = new Set();
  function seqHTML(srcs, cls, alt) {
    return '<div class="seq' + (cls ? " " + cls : "") + '">' + srcs.map(function (s, i) {
      return '<img src="' + s + '" alt="' + (i === 0 ? esc(alt || "") : "") + '"' + (i === 0 ? ' class="on"' : "") + ' loading="lazy" decoding="async">';
    }).join("") + '</div>';
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) live.add(e.target); else live.delete(e.target); });
  }, { rootMargin: "100px" });
  function watch(root) {
    $$(".seq", root).forEach(function (s, k) {
      if (s._w || s.children.length < 2) return;
      s._w = 1; s._i = 0; s._skip = k % 3; io.observe(s);
    });
  }
  var tick = 0;
  if (!calm) setInterval(function () {
    if (document.hidden) return;
    tick++;
    live.forEach(function (s) {
      if ((tick + s._skip) % 1) return;
      var imgs = s.children; imgs[s._i].classList.remove("on");
      s._i = (s._i + 1) % imgs.length; imgs[s._i].classList.add("on");
    });
  }, 1000 / FPS);

  /* ================= CAPA: placa de metal ================= */
  /* placa: a própria imagem da capa, ampliada e desfocada, cobre a tela toda;
     a imagem nítida fica por cima com as bordas esmaecidas, sem emenda */
  var plateImg = new Image(); plateImg.src = "media/capa.webp";
  function drawMetal(cv) {
    var W = cv.clientWidth, H = cv.clientHeight; if (!W || !H) return;
    if (!plateImg.complete || !plateImg.naturalWidth) { plateImg.onload = function () { drawMetal(cv); }; return; }
    var sc = Math.min(1.5, window.devicePixelRatio || 1);
    cv.width = Math.round(W * sc); cv.height = Math.round(H * sc);
    var c = cv.getContext("2d"), w = cv.width, h = cv.height, r = rng(20261), i;
    var k = Math.max(w / plateImg.naturalWidth, h / plateImg.naturalHeight) * 1.15;
    var iw = plateImg.naturalWidth * k, ih = plateImg.naturalHeight * k;
    c.filter = "blur(" + Math.round(60 * sc) + "px)";
    c.drawImage(plateImg, (w - iw) / 2, (h - ih) / 2, iw, ih);
    c.filter = "none";
    // grão fino do metal fosco
    var img = c.getImageData(0, 0, w, h), d = img.data;
    for (i = 0; i < d.length; i += 4) { var n = (r() - .5) * 18; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
    c.putImageData(img, 0, 0);
  }


  var metal = $(".plate__metal");
  drawMetal(metal);
  var rz; addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(function () { drawMetal(metal); }, 150); });

  // furinhos na placa (posições fixas, em %)


  // menu aparece depois da capa
  var top = $("#top");
  new IntersectionObserver(function (es) { top.classList.toggle("on", !es[0].isIntersecting); }, { threshold: .08 }).observe($(".plate"));

  /* ================= PROJETOS: lista + colagem ================= */
  function imagesOf(pid) {
    var p = P[pid], out = []; if (!p) return out;
    (p.band || []).forEach(function (col) { col.forEach(function (s) { out.push(s); }); });
    (p.rows || []).forEach(function (rw) { if (rw.cols && !rw.contain) rw.cols.forEach(function (col) { col.forEach(function (s) { out.push(s); }); }); });
    return out.filter(function (s, i, a) { return a.indexOf(s) === i; });
  }
  function catImages(c) { if (c.collage) return [].concat.apply([], c.collage); var o = []; c.projects.forEach(function (pid) { o = o.concat(imagesOf(pid)); }); return o; }
  function split(list) { // reparte as fotos em 3 camadas
    var L = [[], [], []]; list.forEach(function (s, i) { L[i % 3].push(s); });
    return L.map(function (l, i) { return l.length ? l : list.slice(i, i + 1); }).filter(function (l) { return l.length; });
  }
  var SQ = [[34, 2], [92, 14], [2, 54], [78, 97]];
  function collageHTML(layers) {
    return layers.map(function (l) { return seqHTML(l); }).join("") +
      SQ.map(function (p) { return '<i class="sq" style="left:' + p[0] + '%;top:' + p[1] + '%"></i>'; }).join("");
  }
  function fillCollage(el, layers) { live.forEach(function (s) { if (el.contains(s)) live.delete(s); }); el.innerHTML = collageHTML(layers); watch(el); }

  var collage = $("#collage");
  fillCollage(collage, window.COLLAGE);
  $("#cats").innerHTML = C.map(function (c) {
    return '<li><a href="' + (c.projects.length === 1 ? "#p/" + c.projects[0] : "#c/" + c.id) + '" data-cat="' + c.id + '">' + esc(c.name) + '<small>' + (c.projects.length || "em breve") + '</small></a></li>';
  }).join("");
  // passar o mouse numa categoria troca a colagem pelas fotos dela
  var hoverT;
  $$("#cats a").forEach(function (a) {
    a.addEventListener("mouseenter", function () {
      clearTimeout(hoverT);
      var c = C.filter(function (x) { return x.id === a.dataset.cat; })[0], imgs = catImages(c);
      if (imgs.length) fillCollage(collage, c.collage || split(imgs));
    });
  });
  $("#cats").addEventListener("mouseleave", function () { hoverT = setTimeout(function () { fillCollage(collage, window.COLLAGE); }, 250); });

  watch(document);

  /* ================= PÁGINAS INTERNAS ================= */
  var viewer = $("#viewer"), body = $("#viewer-body"), back = $("#back"), home = $("#home");
  var gallery = [];
  function catOf(pid) { for (var i = 0; i < C.length; i++) if (C[i].projects.indexOf(pid) > -1) return C[i]; return null; }

  function plist(c, except) {
    return '<ol class="plist">' + c.projects.filter(function (pid) { return pid !== except && P[pid]; }).map(function (pid) {
      var p = P[pid];
      return '<li><a href="#p/' + pid + '"><b>' + esc(p.title) + '</b><span>' + esc([p.year, p.pending ? "em breve" : ""].filter(Boolean).join(" · ")) + '</span></a></li>';
    }).join("") + '</ol>';
  }

  function renderCat(c) {
    var imgs = catImages(c);
    body.innerHTML = '<section class="catpage dark"><div class="index"><div><p class="label">categoria</p><h1>' + esc(c.name) + '</h1>' + (c.projects.length ? plist(c) : '<p class="label" style="opacity:.5">em breve: imagens a enviar</p>') + '</div>' +
      '<div class="collage" id="cat-collage" aria-hidden="true"></div></div></section>';
    var cc = $("#cat-collage");
    if (imgs.length) fillCollage(cc, c.collage || split(imgs)); else cc.remove();
    viewer.classList.add("is-dark");
    back.href = "#projetos"; back.textContent = "← projetos";
  }

  function figure(col, cap, contain) {
    var k = gallery.push({ srcs: col, cap: cap || "" }) - 1;
    return '<figure>' + seqHTML(col, contain ? "contain" : "", cap) +
      (cap ? '<figcaption>' + esc(cap) + '</figcaption>' : "") +
      '<button class="zoom" type="button" data-k="' + k + '" aria-label="Ampliar' + (cap ? " " + esc(cap) : "") + '"></button></figure>';
  }

  /* vitrine de looks: fila de recortes + coleção em grade */
  function renderDisplay(d) {
    var h = '<section class="ld">';
    h += '<div class="ld__bar" aria-hidden="true"><span>Look display</span><span>Look display</span><span>Look display</span><span>Look display</span></div>';
    h += '<div class="ld__row" role="list">' + d.figures.map(function (src, i) {
      var k = gallery.push({ srcs: [src], cap: "look " + src.match(/(\d\d)-(frente|costas)/).slice(1).join(" · ") }) - 1;
      return '<button type="button" class="ld__fig zoom-in" role="listitem" data-k="' + k + '" aria-label="Ampliar ' + esc(gallery[k].cap) + '"><img src="' + src + '" alt="' + esc(gallery[k].cap) + '" loading="lazy" decoding="async"></button>';
    }).join("") + '</div></section>';
    h += '<section class="ld ld--grid"><div class="ld__bar" aria-hidden="true"><span>Look display</span><span>Look display</span></div><div class="ld__split">';
    h += '<div class="ld__about"><h3>' + esc(d.name) + '</h3><p>' + esc(d.tagline) + '</p>' +
      '<figure class="ld__hero"><img src="' + d.hero + '" alt="" loading="lazy" decoding="async">' +
      '<figcaption class="ld__note ld__note--a">About<br>–<br>look display</figcaption><figcaption class="ld__note ld__note--b">' + esc(d.season) + '.</figcaption></figure></div>';
    h += '<div class="ld__col"><p class="ld__season">【 ' + esc(d.season.toUpperCase()) + ' 】</p><ol class="ld__looks">' + d.looks.map(function (l) {
      var k = gallery.push({ srcs: [l.src], cap: "look " + l.n + " · " + l.t }) - 1;
      return '<li><p class="ld__lab">LOOK ' + l.n + '<br><span>' + esc(l.t) + '</span></p><button type="button" class="zoom-in" data-k="' + k + '" aria-label="Ampliar look ' + l.n + '"><img src="' + l.src + '" alt="Look ' + l.n + ', ' + esc(l.t) + '" loading="lazy" decoding="async"></button><p class="ld__txt">' + esc(l.text) + '</p></li>';
    }).join("") + '</ol></div></div></section>';
    return h;
  }

  /* prancha de processo: fotos soltas com anotações à mão; peça pronta na coluna da direita */
  function renderBoard(b) {
    var h = '<section class="board board--' + (b.layout || b.steps.length) + '"><div class="board__proc">';
    b.steps.forEach(function (s, i) {
      var k = gallery.push({ srcs: [s.src], cap: s.note || "processo" }) - 1;
      h += '<figure class="bp bp--' + (i + 1) + '"><i class="tape" aria-hidden="true"></i>' +
        '<button type="button" class="zoom-in" data-k="' + k + '" aria-label="Ampliar: ' + esc(s.note || "processo") + '"><img src="' + s.src + '" alt="' + esc(s.note) + '" loading="lazy" decoding="async"></button>' +
        (s.note ? '<figcaption class="hand">' + esc(s.note) + '</figcaption>' : "") + '</figure>';
    });
    h += '</div><div class="board__final"><p class="hand board__tag">' + esc(b.tag || "peça pronta") + ' →</p>';
    b.final.forEach(function (src) {
      var k = gallery.push({ srcs: [src], cap: b.tag || "peça pronta" }) - 1;
      h += '<button type="button" class="zoom-in" data-k="' + k + '" aria-label="Ampliar peça pronta"><img src="' + src + '" alt="Peça pronta" loading="lazy" decoding="async"></button>';
    });
    return h + '</div></section>';
  }
  /* estudos de moulage: grupos de fotos soltas com título à mão, sem peça pronta */
  function renderStudies(groups) {
    var h = '<section class="studies">', n = 0;
    groups.forEach(function (g) {
      h += '<div class="study study--' + g.photos.length + '" id="s-' + slug(g.t) + '"><p class="hand study__t">' + esc(g.t) + '</p><div class="study__ph">';
      g.photos.forEach(function (src) {
        var k = gallery.push({ srcs: [src], cap: g.t }) - 1; n++;
        h += '<figure class="bp" style="--r:' + ([-2, 1.5, -1, 2, -1.5, 1][n % 6]) + 'deg"><i class="tape" aria-hidden="true"></i><button type="button" class="zoom-in" data-k="' + k + '" aria-label="Ampliar ' + esc(g.t) + '"><img src="' + src + '" alt="' + esc(g.t) + '" loading="lazy" decoding="async"></button></figure>';
      });
      h += '</div></div>';
    });
    return h + '</section>';
  }
  function slug(t) { return String(t).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function renderRow(rw) {
    var h = "";
    if (rw.hidden) return "";
    if (rw.display) return renderDisplay(rw.display);
    if (rw.board) return renderBoard(rw.board);
    if (rw.studies) return renderStudies(rw.studies);
    if (rw.sub) h += '<h4 class="subhead wrap">' + esc(rw.sub) + '</h4>';
    if (rw.title || rw.text || rw.panels || rw.looks) {
      h += '<section class="block wrap"' + (rw.title ? ' id="s-' + slug(rw.title) + '"' : "") + '>' + (rw.title ? '<h3>' + esc(rw.title) + '</h3>' : "");
      (rw.text || []).forEach(function (t) { h += '<p>' + esc(t) + '</p>'; });
      if (rw.quote) h += '<blockquote class="quote"><p>“' + esc(rw.quote[0]) + '”</p><cite>' + esc(rw.quote[1]) + '</cite></blockquote>';
      if (rw.panels) h += '<div class="panels">' + rw.panels.map(function (pn) {
        var k = gallery.push({ srcs: [pn.src], cap: pn.t }) - 1;
        return '<div class="panel"><figure style="margin:0;position:relative">' + seqHTML([pn.src], "", pn.t) + '<button class="zoom" type="button" data-k="' + k + '" aria-label="Ampliar ' + esc(pn.t) + '"></button></figure>' +
          '<div><h4>' + esc(pn.t) + '</h4><p>' + esc(pn.text) + '</p></div></div>';
      }).join("") + '</div>';
      if (rw.looks) h += '<div class="looks">' + rw.looks.map(function (l) { return '<div><b>' + esc(l.t) + '</b><span>' + esc(l.text) + '</span></div>'; }).join("") + '</div>';
      h += '</section>';
    }
    if (rw.cols) {
      var n = rw.cols.length, wide = rw.contain && n === 2 && /tecnico/.test(rw.cols[0][0]);
      h += '<div class="row' + (rw.contain ? " row--contain" : "") + (wide ? " row--wide" : "") + (rw.narrow ? " row--narrow" : "") + (rw.mid ? " row--mid" : "") + '" style="--n:' + n + (rw.ratio ? ';--ar:' + rw.ratio : "") + '">' +
        rw.cols.map(function (col, i) { return figure(col, rw.caps && rw.caps[i], rw.contain); }).join("") + '</div>';
    }
    return h;
  }

  function renderProj(pid) {
    var p = P[pid], c = catOf(pid);
    gallery = [];
    var h = '<article class="proj">';
    if (p.band && p.band.length) h += '<div class="band" style="--n:' + Math.min(p.band.length, 4) + '">' + p.band.map(function (col) { return seqHTML(col, p.bandContain ? "contain" : "", p.title); }).join("").replace(/<img /g, p.bandPos ? '<img style="object-position:' + p.bandPos + '" ' : "<img ") + '</div>';
    else if (!p.noBand) h += '<div class="band band--empty"><span>imagens a enviar</span></div>';
    h += '<header class="head phead wrap"><div class="head__main"><h1 class="wide">' + esc(p.title) + '</h1>' +
      '<p class="meta">' + esc([p.year, p.ctx].filter(Boolean).join(" · ")) + '</p>' +
      '<p>' + esc(p.desc) + '</p>' + (p.credits ? '<p class="credits">' + esc(p.credits) + '</p>' : "") + (p.site ? '<a class="btn" href="' + p.site + '" target="_blank" rel="noopener">ver o site da coleção ↗</a>' : "") + '</div>' +
      '<ul class="skills">' + (p.skills || []).map(function (s) { return typeof s === "string" ? '<li>' + esc(s) + '</li>' : '<li><a class="jump" href="#" data-to="s-' + slug(s.to) + '">' + esc(s.t) + ' <span aria-hidden="true">↓</span></a></li>'; }).join("") + '</ul></header>';
    if (p.pending) h += '<p class="todo">Imagens a enviar: mande as fotos deste projeto que esta página ganha faixa em stop motion e galeria como a do IN-CONCRETO.</p>';
    h += (p.rows || []).map(renderRow).join("");
    var others = c ? c.projects.filter(function (x) { return x !== pid; }) : [];
    h += '<nav class="pnav wrap"><p class="label">' + (others.length ? "mais em " + esc(c.name.toLowerCase()) : "projetos") + '</p>' +
      (others.length ? plist(c, pid) : '<ol class="plist">' + C.map(function (x) { return '<li><a href="#c/' + x.id + '"><b>' + esc(x.name) + '</b><span>' + x.projects.length + '</span></a></li>'; }).join("") + '</ol>') + '</nav>';
    h += '</article>';
    body.innerHTML = h;
    viewer.classList.remove("is-dark");
    var solo = c && c.projects.length === 1;
    back.href = c && !solo ? "#c/" + c.id : "#projetos"; back.textContent = "← " + (c && !solo ? c.name.toLowerCase() : "projetos");
  }

  var homeY = 0;
  function route() {
    var m = location.hash.match(/^#([cp])\/([\w-]+)/);
    var c = m && m[1] === "c" && C.filter(function (x) { return x.id === m[2]; })[0];
    var p = m && m[1] === "p" && P[m[2]];
    live.forEach(function (s) { if (viewer.contains(s)) live.delete(s); });
    if (c || p) {
      if (viewer.hidden) homeY = scrollY;
      c ? renderCat(c) : renderProj(m[2]);
      watch(body);
      document.title = (c ? c.name : p.title) + " — Sofia Marinho";
      viewer.hidden = false; home.setAttribute("aria-hidden", "true"); top.hidden = true;
      document.documentElement.classList.add("in-viewer");
      viewer.scrollTop = 0;
    } else {
      var was = !viewer.hidden;
      viewer.hidden = true; body.innerHTML = ""; home.removeAttribute("aria-hidden"); top.hidden = false;
      document.documentElement.classList.remove("in-viewer");
      document.title = "Sofia Marinho — Portfólio 2026";
      var t = location.hash && document.getElementById(location.hash.slice(1));
      if (t) t.scrollIntoView(); else if (was) scrollTo(0, homeY);
    }
  }
  addEventListener("hashchange", route);
  route();

  /* ================= IMAGEM AMPLIADA ================= */
  var lb = $("#lb"), lbImg = $("#lb-img"), lbCap = $("#lb-cap"), cur = 0, sub = 0;
  function show(k, s) {
    cur = (k + gallery.length) % gallery.length; var g = gallery[cur]; sub = s || 0;
    lbImg.src = g.srcs[sub]; lbImg.alt = g.cap; lbCap.textContent = (g.cap ? g.cap + "  ·  " : "") + (cur + 1) + "/" + gallery.length;
  }
  body.addEventListener("click", function (e) {
    var j = e.target.closest(".jump");
    if (j) { e.preventDefault(); var t = document.getElementById(j.dataset.to); if (t) viewer.scrollTo({ top: t.offsetTop - 40, behavior: calm ? "auto" : "smooth" }); return; }
    var b = e.target.closest(".zoom, .zoom-in"); if (!b) return;
    var seq = b.parentNode.querySelector(".seq"), on = seq ? Math.max(0, Array.prototype.indexOf.call(seq.children, seq.querySelector(".on"))) : 0;
    show(+b.dataset.k, on); lb.hidden = false; $(".lb__x").focus();
  });
  function closeLb() { lb.hidden = true; }
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
