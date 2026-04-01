/**
 * dark-theme.js
 * Alterna el modo oscuro/claro.
 * Guarda la preferencia en localStorage con la clave 'mecanica-tema'.
 */
export default function darkTheme(btnSel, darkClass) {
  const CLAVE = 'mecanica-tema';
  const body  = document.body;

  if (localStorage.getItem(CLAVE) === 'oscuro') {
    body.classList.add(darkClass);
  }

  const btn = document.querySelector(btnSel);
  if (!btn) return;

  btn.addEventListener('click', () => {
    body.classList.toggle(darkClass);
    const tema = body.classList.contains(darkClass) ? 'oscuro' : 'claro';
    localStorage.setItem(CLAVE, tema);
  });
}
