// ---------- Tech logos: inject Simple Icons + per-item color var ----------
const ICON_BASE = "https://cdn.simpleicons.org";

// Slugs not in Simple Icons (Java is excluded by license; Delta Lake has no entry).
const CUSTOM_LOGOS = {
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  deltalake: "https://github.com/delta-io.png",
};

function isDarkHex(hex) {
  if (!hex) return false;
  const h = hex.replace(/^#/, "");
  if (h.length !== 6) return false;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  // Perceived luminance (Rec. 709). Below ~50 we consider the logo "dark".
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 50;
}

document.querySelectorAll("[data-icons] li").forEach((li) => {
  const slug = li.dataset.icon;
  const color = li.dataset.color;
  if (!slug) return;

  if (color) li.style.setProperty("--tech-color", `#${color}`);
  if (isDarkHex(color)) li.classList.add("dark-logo");

  const img = document.createElement("img");
  img.src = CUSTOM_LOGOS[slug]
    || `${ICON_BASE}/${slug}/${color || ""}`.replace(/\/$/, "");
  img.alt = "";
  img.loading = "lazy";
  img.decoding = "async";
  img.width = 22;
  img.height = 22;
  img.onerror = () => {
    img.remove();
    li.style.opacity = "0.55";
  };

  li.prepend(img);

  li.addEventListener("pointermove", (e) => {
    const r = li.getBoundingClientRect();
    li.style.setProperty("--mx", `${e.clientX - r.left}px`);
    li.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

// ---------- Projects ----------
const PROJECTS = [
  {
    name: "forja",
    badge: "PyPI v1.0.1",
    blurb:
      "CLI en Python para scaffolding inteligente de proyectos de datos. Clasificador sklearn de dominio, wizard interactivo y tres arquitecturas: ETL, hexagonal y ML.",
    tags: ["Python", "Click", "scikit-learn", "Pydantic", "PyPI"],
    links: [
      { label: "GitHub", href: "https://github.com/Panthera0nca/forja" },
      { label: "PyPI", href: "https://pypi.org/project/forja/" },
      { label: "Docs", href: "https://panthera0nca.github.io/forja/" },
    ],
  },
  {
    name: "forja-lakehouse",
    badge: "PyPI v0.2.0",
    blurb:
      "Plugin de forja con arquitectura Lakehouse medallion (bronze/silver/gold) sobre DuckDB, Delta Lake y Polars. Validación con Pandera.",
    tags: ["DuckDB", "Delta Lake", "Polars", "Pandera"],
    links: [
      { label: "GitHub", href: "https://github.com/Panthera0nca/forja-lakehouse" },
      { label: "PyPI", href: "https://pypi.org/project/forja-lakehouse/" },
    ],
  },
  {
    name: "forja-streaming",
    badge: "PyPI v0.1.0",
    blurb:
      "Plugin de forja con arquitectura streaming sobre Apache Kafka. Templates de productores, consumidores y pipelines event-driven.",
    tags: ["Kafka", "Python", "Streaming"],
    links: [
      { label: "GitHub", href: "https://github.com/Panthera0nca/forja-streaming" },
      { label: "PyPI", href: "https://pypi.org/project/forja-streaming/" },
    ],
  },
  {
    name: "forja-infra",
    badge: "PyPI v0.1.1",
    blurb:
      "Plugin de forja para infraestructura como código con Ansible. Roles y playbooks listos para servidores de datos.",
    tags: ["Ansible", "IaC", "Jinja"],
    links: [
      { label: "GitHub", href: "https://github.com/Panthera0nca/forja-infra" },
      { label: "PyPI", href: "https://pypi.org/project/forja-infra/" },
    ],
  },
  {
    name: "forja-console",
    badge: "TUI",
    blurb:
      "Master console TUI para orquestar todos los proyectos forja desde una sola interfaz de terminal interactiva.",
    tags: ["Python", "Textual", "TUI"],
    links: [
      { label: "GitHub", href: "https://github.com/Panthera0nca/forja-console" },
    ],
  },
  {
    name: "forja-sdd",
    badge: "Plugin",
    blurb:
      "Spec-Driven Development para forja: define specs, genera stubs y mide cobertura entre especificación e implementación.",
    tags: ["Python", "Specs", "Testing"],
    links: [
      { label: "GitHub", href: "https://github.com/Panthera0nca/forja-sdd" },
    ],
  },
  {
    name: "ConcesionarioVehiculos",
    badge: "Java",
    blurb:
      "Sistema de gestión de ventas para concesionario con interfaz gráfica Swing, generación de facturas en PDF con iText 9 y arquitectura POO.",
    tags: ["Java 17", "Swing", "Maven", "iText"],
    links: [
      { label: "GitHub", href: "https://github.com/Panthera0nca/ConcesionarioVehiculos" },
    ],
  },
  {
    name: "ForiVive",
    badge: "Full-stack",
    blurb:
      "Plataforma full-stack con backend Express + cliente web. Experimento de arquitectura cliente/servidor con CORS y middleware propio.",
    tags: ["Node.js", "Express", "JavaScript"],
    links: [
      { label: "GitHub", href: "https://github.com/Panthera0nca/ForiVive" },
    ],
  },
];

const grid = document.getElementById("projects-grid");
if (grid) {
  const frag = document.createDocumentFragment();
  PROJECTS.forEach((p) => {
    const card = document.createElement("article");
    card.className = "project";
    card.innerHTML = `
      <div class="project-head">
        <h3>${p.name}</h3>
        <span class="badge">${p.badge}</span>
      </div>
      <p>${p.blurb}</p>
      <div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      <div class="links">
        ${p.links
          .map(
            (l) =>
              `<a href="${l.href}" target="_blank" rel="noopener">${l.label} →</a>`
          )
          .join("")}
      </div>
    `;
    frag.appendChild(card);
  });
  grid.appendChild(frag);
}

// ---------- Theme toggle ----------
const root = document.documentElement;
const stored = localStorage.getItem("theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
if (stored) root.dataset.theme = stored;
else if (prefersLight) root.dataset.theme = "light";

document.getElementById("theme-toggle")?.addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
});

// ---------- Footer year ----------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
