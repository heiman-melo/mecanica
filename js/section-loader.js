/**
 * section-loader.js
 * Carga secciones de forma lazy usando IntersectionObserver.
 * Cada sección solo se descarga cuando el usuario está por llegar a ella (rootMargin 250px).
 * Muestra un esqueleto animado mientras carga.
 */

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

        fetch(path)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP ${response.status} al cargar ${path}`);
            }
            return response.text();
          })
          .then((html) => {
            section.innerHTML = html;
          })
          .catch((err) => {
            console.error('[section-loader]', err);
            section.innerHTML = `<p class="error-carga">⚠️ Error al cargar el contenido: ${err.message}<br><small>Asegurate de abrir el proyecto con un servidor local (Live Server en VS Code).</small></p>`;
          });
      }
    },
    { rootMargin: '250px 0px' }
  );

  observer.observe(section);
}

export function observeSections(lista) {
  lista.forEach(({ id, path }) => observeSection(id, path));
}
