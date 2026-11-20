/* IN-CONCRETO — stop motion seco + contato. Sem dependências. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------------- STOP MOTION ----------------
     <section class="stage" data-stopmotion data-fps="6">
       <div class="stage__frames"> <img …> <img …> <img …> </div>
       <div class="stage__ui"> <button data-frame="0">… <button data-toggle>… </div>
     </section>
     Troca seca entre quadros (opacity 0/1, sem transição).
     Toca só quando o palco está na tela; com reduced-motion fica parado no 1º quadro. */
  function StopMotion(el) {
    this.el = el;
    this.frames = Array.prototype.slice.call(el.querySelectorAll(".stage__frames img"));
    this.fps = Math.min(8, Math.max(4, parseFloat(el.dataset.fps) || 6));
    this.i = 0;
    this.timer = null;
    this.userPaused = reduce.matches;
    this.visible = false;
    this.angleBtns = Array.prototype.slice.call(el.querySelectorAll("[data-frame]"));
    this.toggleBtn = el.querySelector("[data-toggle]");
    this.counter = el.querySelector(".stage__count");
    this.bind();
    this.show(0);
    this.syncToggle();
  }

  StopMotion.prototype.bind = function () {
    var self = this;
    this.angleBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        self.userPaused = true;
        self.stop();
        self.show(parseInt(b.dataset.frame, 10));
        self.syncToggle();
      });
    });
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener("click", function () {
        self.userPaused = !self.userPaused;
        self.syncToggle();
        self.userPaused ? self.stop() : self.play();
      });
    }
  };

  StopMotion.prototype.show = function (n) {
    var prev = this.frames[this.i];
    this.i = (n + this.frames.length) % this.frames.length;
    if (prev) prev.classList.remove("is-on");
    this.frames[this.i].classList.add("is-on");
    var i = this.i;
    this.angleBtns.forEach(function (b) {
      b.setAttribute("aria-pressed", String(parseInt(b.dataset.frame, 10) === i));
    });
    if (this.counter) this.counter.textContent = String(i + 1).padStart(2, "0") + " / " + String(this.frames.length).padStart(2, "0");
  };

  StopMotion.prototype.preload = function () {
    this.frames.forEach(function (img) {
      if (img.loading === "lazy") img.loading = "eager";
    });
  };

  StopMotion.prototype.play = function () {
    if (this.timer || this.userPaused || !this.visible) return;
    var self = this;
    this.timer = setInterval(function () { self.show(self.i + 1); }, 1000 / this.fps);
  };

  StopMotion.prototype.stop = function () {
    clearInterval(this.timer);
    this.timer = null;
  };

  StopMotion.prototype.syncToggle = function () {
    if (!this.toggleBtn) return;
    this.toggleBtn.textContent = this.userPaused ? "▶ tocar" : "❚❚ pausar";
    this.toggleBtn.setAttribute("aria-label", this.userPaused ? "tocar sequência" : "pausar sequência");
  };

  var players = Array.prototype.map.call(document.querySelectorAll("[data-stopmotion]"), function (el) {
    return new StopMotion(el);
  });

  if ("IntersectionObserver" in window && players.length) {
    // 1) pré-carrega os quadros da sequência que vai entrar na tela
    var near = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target._sm.preload(); near.unobserve(e.target); }
      });
    }, { rootMargin: "150% 0px" });

    // 2) toca quando o look ocupa a tela, pausa quando sai
    var onScreen = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var p = e.target._sm;
        p.visible = e.isIntersecting;
        p.visible ? p.play() : p.stop();
      });
    }, { threshold: 0.6 });

    players.forEach(function (p) {
      p.el._sm = p;
      near.observe(p.el);
      onScreen.observe(p.el);
    });
  }

  reduce.addEventListener && reduce.addEventListener("change", function () {
    players.forEach(function (p) {
      p.userPaused = reduce.matches;
      p.syncToggle();
      reduce.matches ? (p.stop(), p.show(0)) : p.play();
    });
  });

  document.addEventListener("visibilitychange", function () {
    players.forEach(function (p) { document.hidden ? p.stop() : p.play(); });
  });

  /* ---------------- CONTATO ---------------- */
  var dlg = document.getElementById("contato");
  if (dlg) {
    document.querySelectorAll("[data-open-contact]").forEach(function (b) {
      b.addEventListener("click", function (ev) {
        if (typeof dlg.showModal === "function") { ev.preventDefault(); dlg.showModal(); }
      });
    });
    dlg.addEventListener("click", function (ev) { if (ev.target === dlg) dlg.close(); });
  }
})();
