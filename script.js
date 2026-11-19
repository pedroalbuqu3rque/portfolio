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

window.addEventListener("scroll", updateNavigation, { passive: true });
window.addEventListener("resize", updateNavigation);
updateNavigation();

for (const card of document.querySelectorAll(".area")) {
  const front = card.querySelector(".area-front");
  const back = card.querySelector(".area-back");
  const show = front.querySelector("button");
  const hide = back.querySelector("button");

  function flip(open) {
    card.classList.toggle("is-flipped", open);
    front.inert = open;
    back.inert = !open;
    show.setAttribute("aria-expanded", String(open));
    (open ? hide : show).focus({ preventScroll: true });
  }

  front.addEventListener("click", () => flip(true));
  hide.addEventListener("click", () => flip(false));
  back.addEventListener("keydown", (event) => {
    if (event.key === "Escape") flip(false);
  });
}

const experienceList = document.querySelector("#experiencias");
const previous = document.querySelector("#previous-experience");
const next = document.querySelector("#next-experience");

function updateExperienceControls() {
  previous.disabled = experienceList.scrollLeft <= 2;
  next.disabled = experienceList.scrollLeft >= experienceList.scrollWidth - experienceList.clientWidth - 2;
}

function moveExperience(forward) {
  const origin = experienceList.firstElementChild.offsetLeft;
  const positions = [...experienceList.children].map(card => card.offsetLeft - origin);
  const current = experienceList.scrollLeft;
  const target = forward
    ? positions.find(position => position > current + 2)
    : positions.findLast(position => position < current - 2);
  experienceList.scrollTo({ left: target ?? (forward ? experienceList.scrollWidth : 0) });
}

previous.addEventListener("click", () => moveExperience(false));
next.addEventListener("click", () => moveExperience(true));
experienceList.addEventListener("scroll", updateExperienceControls, { passive: true });
new ResizeObserver(updateExperienceControls).observe(experienceList);
updateExperienceControls();

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
