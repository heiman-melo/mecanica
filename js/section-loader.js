/**
 * section-loader.js
 * Carga secciones de forma lazy usando IntersectionObserver.
 * Cada sección solo se descarga cuando el usuario está por llegar a ella (rootMargin 250px).
 * Muestra un esqueleto animado mientras carga.
 *
 * También intercepta clics en enlaces del menú (#hash) para cargar bajo demanda
 * todas las secciones intermedias y la sección destino antes de hacer scroll.
 */

const sectionRegistry = new Map();
const loadedSections = new Set();

function mostrarSkeleton(section) {
  section.innerHTML = `
    <div class="skeleton">
      <div class="skeleton-titulo"></div>
      <div class="skeleton-linea"></div>
      <div class="skeleton-linea"></div>
      <div class="skeleton-linea corta"></div>
    </div>
  `;
}

async function loadSection(id) {
  if (loadedSections.has(id)) return;

  const config = sectionRegistry.get(id);
  if (!config) return;

  const { section, path, observer } = config;

  if (observer) observer.disconnect();

  const res = await fetch(path, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`HTTP ${res.status} al cargar ${path}`);

  section.innerHTML = await res.text();
  loadedSections.add(id);
}

async function loadSectionsUpTo(targetId) {
  const allIds = [...sectionRegistry.keys()];
  const targetIndex = allIds.indexOf(targetId);
  if (targetIndex === -1) return;

  const idsToLoad = allIds
    .slice(0, targetIndex + 1)
    .filter((id) => !loadedSections.has(id));

  await Promise.all(
    idsToLoad.map((id) => loadSection(id).catch(console.error))
  );
}

export function observeSection(id, path) {
  const section = document.getElementById(id);
  if (!section) {
    console.warn(`[section-loader] No se encontró la sección con id "${id}".`);
    return;
  }

  mostrarSkeleton(section);

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        loadSection(id).catch((err) => {
          console.error('[section-loader]', err);
          section.innerHTML = `<p class="error-carga">⚠️ Error al cargar el contenido: ${err.message}<br><small>Asegurate de abrir el proyecto con un servidor local (Live Server en VS Code).</small></p>`;
        });
      }
    },
    { rootMargin: '250px 0px' }
  );

  sectionRegistry.set(id, { section, path, observer });
  observer.observe(section);
}

export function observeSections(lista) {
  lista.forEach(({ id, path }) => observeSection(id, path));
  setupHashNavigation();
}

function setupHashNavigation() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute("href").slice(1);
    if (!sectionRegistry.has(targetId)) return;
    if (loadedSections.has(targetId)) return;

    e.preventDefault();
    loadSectionsUpTo(targetId)
      .then(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      })
      .catch(console.error);
  });

  if (location.hash) {
    const targetId = location.hash.slice(1);
    if (sectionRegistry.has(targetId) && !loadedSections.has(targetId)) {
      loadSectionsUpTo(targetId)
        .then(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
        })
        .catch(console.error);
    }
  }
}
