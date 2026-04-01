/**
 * menu.js
 * Maneja la apertura/cierre del panel hamburguesa.
 * Al hacer clic en un link del menú, el panel se cierra.
 */
export default function hamburgerMenu(panelBtnSel, panelSel, menuLinkSel) {
  const d = document;

  d.addEventListener('click', (e) => {
    const btn   = d.querySelector(panelBtnSel);
    const panel = d.querySelector(panelSel);

    if (e.target.matches(panelBtnSel) || e.target.matches(`${panelBtnSel} *`)) {
      panel.classList.toggle('is-active');
      btn.classList.toggle('is-active');
    }

    if (e.target.matches(menuLinkSel)) {
      panel.classList.remove('is-active');
      btn.classList.remove('is-active');
    }
  });
}
