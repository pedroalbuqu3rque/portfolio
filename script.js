// Abertura de marca na primeira tela; respeita acessibilidade e não depende da rede.
const intro = document.querySelector('#intro-screen');
const prefersLessMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (intro && document.documentElement.classList.contains("intro-enabled")) {
  if (prefersLessMotion) {
    document.documentElement.classList.add('intro-finished');
    intro.remove();
  } else {
    window.setTimeout(() => {
      document.documentElement.classList.add('intro-finished');
      window.setTimeout(() => intro.remove(), 750);
    }, 2150);
  }
} else if (intro) {
  intro.remove();
}

// Se o JavaScript não carregar, os links continuam acessíveis sem menu expansível.
document.documentElement.classList.add("js");

const menuToggle = document.querySelector("#menu-toggle");
const menuPanel = document.querySelector("#site-navigation");
const menuBackdrop = document.querySelector("#menu-backdrop");
const mobileMenu = window.matchMedia("(max-width: 48rem)");
const pageBody = document.body;

function setMenu(open, { restoreFocus = false } = {}) {
  const active = Boolean(open && mobileMenu.matches);
  pageBody.classList.toggle("menu-open", active);
  menuToggle.setAttribute("aria-expanded", String(active));
  menuToggle.setAttribute("aria-label", active ? "Fechar menu de navegação" : "Abrir menu de navegação");
  menuPanel.inert = mobileMenu.matches && !active;
  if (!active && restoreFocus && mobileMenu.matches) menuToggle.focus({ preventScroll: true });
}

menuToggle.addEventListener("click", () => {
  const opening = menuToggle.getAttribute("aria-expanded") !== "true";
  setMenu(opening);
});
menuBackdrop.addEventListener("click", () => setMenu(false, { restoreFocus: true }));
menuPanel.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", () => setMenu(false));
});
document.querySelector(".logo").addEventListener("click", () => setMenu(false));

// Esc e Tab respeitam o menu expansível, inclusive para teclado/leitor de tela.
document.addEventListener("keydown", event => {
  if (!pageBody.classList.contains("menu-open")) return;
  if (event.key === "Escape") {
    event.preventDefault();
    setMenu(false, { restoreFocus: true });
  } else if (event.key === "Tab") {
    const items = [menuToggle, ...menuPanel.querySelectorAll("a")];
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

function syncMenu() { setMenu(false); }
mobileMenu.addEventListener("change", syncMenu);
syncMenu();

const navigation = [...document.querySelectorAll(".site-header nav a")];
const sections = navigation.map(link => document.querySelector(link.hash));
const header = document.querySelector(".sticky-header");

function updateNavigation() {
  const marker = Math.max(header.offsetHeight + 40, window.innerHeight * 0.35);
  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  const active = atBottom ? sections.at(-1) : sections.findLast(
    section => section.getBoundingClientRect().top <= marker
  ) || sections[0];

  for (const link of navigation) {
    if (link.hash === "#" + active.id) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
}

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
  updateNavigation();
}, { passive: true });
window.addEventListener("resize", updateNavigation);
updateNavigation();

for (const card of document.querySelectorAll(".area")) {
  const front = card.querySelector(".area-front");
  const back = card.querySelector(".area-back");
  const show = front.querySelector("button");

  back.tabIndex = 0;

  function flip(open, { restoreFocus = true } = {}) {
    card.classList.toggle("is-flipped", open);
    front.inert = open;
    back.inert = !open;
    show.setAttribute("aria-expanded", String(open));

    if (restoreFocus) {
      (open ? back : show).focus({ preventScroll: true });
    }
  }

  front.addEventListener("click", () => flip(true));
  back.addEventListener("click", () => flip(false));
  show.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    flip(true);
  });
  back.addEventListener("keydown", event => {
    if (["Escape", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      flip(false);
    }
  });
}

const experienceList = document.querySelector("#experiencias");
let isDraggingExperience = false;
let draggedExperience = false;
let experienceStartX = 0;
let experienceStartScroll = 0;

function stopExperienceDrag() {
  if (!isDraggingExperience) return;
  isDraggingExperience = false;
  experienceList.classList.remove("is-dragging");
}

experienceList.addEventListener("pointerdown", event => {
  if (event.pointerType === "touch" || event.button !== 0) return;
  isDraggingExperience = true;
  draggedExperience = false;
  experienceStartX = event.clientX;
  experienceStartScroll = experienceList.scrollLeft;
  experienceList.classList.add("is-dragging");
  experienceList.setPointerCapture?.(event.pointerId);
});

experienceList.addEventListener("pointermove", event => {
  if (!isDraggingExperience) return;
  const delta = event.clientX - experienceStartX;
  if (Math.abs(delta) > 3) draggedExperience = true;
  experienceList.scrollLeft = experienceStartScroll - delta;
});

["pointerup", "pointercancel", "lostpointercapture", "mouseleave"].forEach(type => {
  experienceList.addEventListener(type, stopExperienceDrag);
});

experienceList.addEventListener("click", event => {
  if (!draggedExperience) return;
  event.preventDefault();
  event.stopPropagation();
  draggedExperience = false;
}, true);

experienceList.addEventListener("wheel", event => {
  if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
  experienceList.scrollLeft += event.deltaY;
  event.preventDefault();
}, { passive: false });

const contactDialog = document.querySelector("#contact-dialog");
const contactButton = document.querySelector("#open-contact");

contactButton.addEventListener("click", () => contactDialog.showModal());
contactDialog.addEventListener("close", () => contactButton.focus());
contactDialog.addEventListener("click", (event) => {
  if (event.target !== contactDialog) return;
  const bounds = contactDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom) {
    contactDialog.close();
  }
});

// Entrada suave e progressiva: sem dependência externa e sem esconder conteúdo
// de usuários que preferem movimento reduzido.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const targets = document.querySelectorAll(
    ".availability, .hero-copy, .portrait, .area, .page-section > .eyebrow, .page-section > .section-title, .page-section > .section-intro, .project, .about-copy, .about-photo, .about-experiences, .contact"
  );
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08, rootMargin: "0px 0px 24px 0px" });
  targets.forEach((element, index) => {
    element.classList.add("reveal");
    if (index < 3) element.style.setProperty("--reveal-delay", `${index * 70}ms`);
    revealObserver.observe(element);
  });
}

// Faz o download efetivo do currículo sem abrir uma aba com o visualizador de PDF.
// Atributo download no HTML é mantido como fallback quando JavaScript não estiver ativo.
for (const link of document.querySelectorAll("[data-download-cv]")) {
  link.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(link.href, { credentials: "same-origin" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const pdf = await response.blob();
      const header = new Uint8Array(await pdf.slice(0, 5).arrayBuffer());
      const signature = String.fromCharCode(...header);
      if (signature !== "%PDF-") throw new Error("O arquivo retornado não é um PDF.");
      const objectUrl = URL.createObjectURL(pdf);
      const temporaryLink = document.createElement("a");
      temporaryLink.href = objectUrl;
      temporaryLink.download = link.download || "Pedro-Albuquerque-Curriculo.pdf";
      document.body.append(temporaryLink);
      temporaryLink.click();
      temporaryLink.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);
    } catch (error) {
      console.error("Não foi possível baixar o currículo:", error);
      window.alert("Não foi possível baixar o currículo. Verifique se o PDF está disponível e tente novamente.");
    }
  });
}
