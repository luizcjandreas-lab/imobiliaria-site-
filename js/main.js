/* =========================================================
   Berilo Brokers — scripts do site
   Para trocar o número ou a mensagem do WhatsApp, edite só
   o bloco CONFIG abaixo: todos os botões são atualizados.
   ========================================================= */
const CONFIG = {
  whatsapp: "5511945517748", // DDI + DDD + número, só dígitos
  mensagem: "Olá! Conheci a imobiliária pelo site e gostaria de receber mais informações.",
  video: "assets/video/institucional.mp4"
};

(function () {
  "use strict";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* WhatsApp: todos os links com data-wa */
  const waUrl = "https://wa.me/" + CONFIG.whatsapp.replace(/\D/g, "") + "?text=" + encodeURIComponent(CONFIG.mensagem);
  document.querySelectorAll("[data-wa]").forEach(a => { a.href = waUrl; });

  /* Menu no celular */
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("menu");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }));
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); toggle.focus();
      }
    });
  }

  /* Destaca no menu a seção visível */
  const links = [...document.querySelectorAll('.nav a[href^="#"]')];
  if ("IntersectionObserver" in window && links.length) {
    const byId = new Map(links.map(a => [a.getAttribute("href").slice(1), a]));
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          links.forEach(l => l.removeAttribute("aria-current"));
          const l = byId.get(en.target.id); if (l) l.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    byId.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* Animação suave ao rolar: só para o que ainda está abaixo da tela */
  if (!reduceMotion && "IntersectionObserver" in window) {
    const items = [...document.querySelectorAll(".reveal")].filter(el => el.getBoundingClientRect().top > window.innerHeight);
    if (items.length) {
      document.documentElement.classList.add("reveal-ready");
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
      }, { rootMargin: "0px 0px -8% 0px" });
      document.querySelectorAll(".reveal").forEach(el => {
        if (items.includes(el)) io.observe(el); else el.classList.add("is-visible");
      });
    }
  }

  /* Mapa: carrega o iframe só quando a seção se aproxima da tela */
  const map = document.querySelector(".map[data-map]");
  if (map) {
    const loadMap = () => {
      if (map.querySelector("iframe")) return;
      const f = document.createElement("iframe");
      f.src = map.dataset.map;
      f.title = "Mapa: Imobiliária Berilo Brokers, R. Santa Luzia, 48, Liberdade, São Paulo";
      f.loading = "lazy";
      f.referrerPolicy = "no-referrer-when-downgrade";
      f.allowFullscreen = true;
      map.appendChild(f);
    };
    if ("IntersectionObserver" in window) {
      const mo = new IntersectionObserver(e => { if (e[0].isIntersecting) { loadMap(); mo.disconnect(); } }, { rootMargin: "400px" });
      mo.observe(map);
    } else { loadMap(); }
  }

  /* Vídeo institucional: só é ativado se o arquivo existir. Sem vídeo, a foto continua. */
  const video = document.querySelector(".hero-video");
  if (video && CONFIG.video && !reduceMotion && location.protocol !== "file:") {
    fetch(CONFIG.video, { method: "HEAD" }).then(r => {
      if (!r.ok) return;
      video.src = CONFIG.video;
      video.hidden = false;
      video.play().catch(() => {});
    }).catch(() => {});
  }

  /* Ano no rodapé */
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
