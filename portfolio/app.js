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
  function drawMetal(cv) {
    var W = cv.clientWidth, H = cv.clientHeight; if (!W || !H) return;
    var sc = Math.min(1.5, window.devicePixelRatio || 1);
    cv.width = Math.round(W * sc); cv.height = Math.round(H * sc);
    var c = cv.getContext("2d"), w = cv.width, h = cv.height, r = rng(20261), i, M = Math.max(w, h);
    c.fillStyle = "#8f8e8b"; c.fillRect(0, 0, w, h);
    function blob(x, y, rad, col, a) { var g = c.createRadialGradient(x, y, 0, x, y, rad); g.addColorStop(0, "rgba(" + col + "," + a + ")"); g.addColorStop(1, "rgba(" + col + ",0)"); c.fillStyle = g; c.fillRect(0, 0, w, h); }
    blob(w * .62, h * .25, M * .7, "238,237,233", .8);
    blob(w * .2, h * .15, M * .4, "215,214,210", .45);
    blob(w * .05, h * 1, M * .55, "45,45,43", .5);
    blob(w * .95, h * .95, M * .4, "70,69,66", .35);
    // escovado: riscos finos quase horizontais
    c.lineWidth = Math.max(1, sc * .6);
    for (i = 0; i < 900; i++) {
      var y = r() * h, x = r() * w, len = (r() * .25 + .05) * w, dy = (r() - .5) * h * .02;
      c.strokeStyle = r() < .5 ? "rgba(255,255,255," + (r() * .07) + ")" : "rgba(0,0,0," + (r() * .06) + ")";
      c.beginPath(); c.moveTo(x, y); c.lineTo(x + len, y + dy); c.stroke();
    }
    // arranhões de uso
    for (i = 0; i < 70; i++) {
      var x0 = r() * w, y0 = r() * h, a = r() * Math.PI, l = (r() * .12 + .02) * M;
      c.strokeStyle = "rgba(255,255,255," + (.12 + r() * .2) + ")";
      c.beginPath(); c.moveTo(x0, y0); c.lineTo(x0 + Math.cos(a) * l, y0 + Math.sin(a) * l); c.stroke();
      c.strokeStyle = "rgba(30,30,28," + (.08 + r() * .12) + ")";
      c.beginPath(); c.moveTo(x0 + 1, y0 + 1); c.lineTo(x0 + 1 + Math.cos(a) * l, y0 + 1 + Math.sin(a) * l); c.stroke();
    }
    // granulado
    var img = c.getImageData(0, 0, w, h), d = img.data;
    for (i = 0; i < d.length; i += 4) { var n = (r() - .5) * 26; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
    c.putImageData(img, 0, 0);
  }
  var metal = $(".plate__metal");
  drawMetal(metal);
  var rz; addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(function () { drawMetal(metal); }, 150); });

  // furinhos na placa (posições fixas, em %)
  $(".plate__holes").innerHTML = [[31, 12], [45, 8], [59, 11], [68, 14], [85, 15], [9, 33], [92, 36], [7, 68], [94, 72], [19, 90], [80, 91]]
    .map(function (p) { return '<i style="left:' + p[0] + '%;top:' + p[1] + '%"></i>'; }).join("");

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
  function catImages(c) { var o = []; c.projects.forEach(function (pid) { o = o.concat(imagesOf(pid)); }); return o; }
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
    return '<li><a href="#c/' + c.id + '" data-cat="' + c.id + '">' + esc(c.name) + '<small>' + (c.projects.length || "em breve") + '</small></a></li>';
  }).join("");
  // passar o mouse numa categoria troca a colagem pelas fotos dela
  var hoverT;
  $$("#cats a").forEach(function (a) {
    a.addEventListener("mouseenter", function () {
      clearTimeout(hoverT);
      var c = C.filter(function (x) { return x.id === a.dataset.cat; })[0], imgs = catImages(c);
      if (imgs.length) fillCollage(collage, split(imgs));
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
    if (imgs.length) fillCollage(cc, split(imgs)); else cc.remove();
    viewer.classList.add("is-dark");
    back.href = "#projetos"; back.textContent = "← projetos";
  }

  function figure(col, cap, contain) {
    var k = gallery.push({ srcs: col, cap: cap || "" }) - 1;
    return '<figure>' + seqHTML(col, contain ? "contain" : "", cap) +
      (cap ? '<figcaption>' + esc(cap) + '</figcaption>' : "") +
      '<button class="zoom" type="button" data-k="' + k + '" aria-label="Ampliar' + (cap ? " " + esc(cap) : "") + '"></button></figure>';
  }

  function renderRow(rw) {
    var h = "";
    if (rw.title || rw.text || rw.panels || rw.looks) {
      h += '<section class="block wrap">' + (rw.title ? '<h3>' + esc(rw.title) + '</h3>' : "");
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
      h += '<div class="row' + (rw.contain ? " row--contain" : "") + (wide ? " row--wide" : "") + '" style="--n:' + n + '">' +
        rw.cols.map(function (col, i) { return figure(col, rw.caps && rw.caps[i], rw.contain); }).join("") + '</div>';
    }
    return h;
  }

  function renderProj(pid) {
    var p = P[pid], c = catOf(pid);
    gallery = [];
    var h = '<article class="proj">';
    if (p.band && p.band.length) h += '<div class="band" style="--n:' + Math.min(p.band.length, 4) + '">' + p.band.map(function (col) { return seqHTML(col, p.bandContain ? "contain" : "", p.title); }).join("") + '</div>';
    else h += '<div class="band band--empty"><span>imagens a enviar</span></div>';
    h += '<header class="head phead wrap"><div class="head__main"><h1 class="wide">' + esc(p.title) + '</h1>' +
      '<p class="meta">' + esc([p.year, p.ctx].filter(Boolean).join(" · ")) + '</p>' +
      '<p>' + esc(p.desc) + '</p>' + (p.site ? '<a class="btn" href="' + p.site + '" target="_blank" rel="noopener">ver o site da coleção ↗</a>' : "") + '</div>' +
      '<ul class="skills">' + (p.skills || []).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join("") + '</ul></header>';
    if (p.pending) h += '<p class="todo">Imagens a enviar: mande as fotos deste projeto que esta página ganha faixa em stop motion e galeria como a do IN-CONCRETO.</p>';
    h += (p.rows || []).map(renderRow).join("");
    var others = c ? c.projects.filter(function (x) { return x !== pid; }) : [];
    h += '<nav class="pnav wrap"><p class="label">' + (others.length ? "mais em " + esc(c.name.toLowerCase()) : "projetos") + '</p>' +
      (others.length ? plist(c, pid) : '<ol class="plist">' + C.map(function (x) { return '<li><a href="#c/' + x.id + '"><b>' + esc(x.name) + '</b><span>' + x.projects.length + '</span></a></li>'; }).join("") + '</ol>') + '</nav>';
    h += '</article>';
    body.innerHTML = h;
    viewer.classList.remove("is-dark");
    back.href = c ? "#c/" + c.id : "#projetos"; back.textContent = "← " + (c ? c.name.toLowerCase() : "projetos");
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
    var b = e.target.closest(".zoom"); if (!b) return;
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
