import { observeSections }  from './section-loader.js';
import hamburgerMenu        from './menu.js';
import darkTheme            from './dark-theme.js';

const d = document;

d.addEventListener('DOMContentLoaded', () => {

  // Menú hamburguesa
  hamburgerMenu('.panel-btn', '.panel', '.menu a');

  // Modo oscuro
  darkTheme('.dark-theme-btn', 'dark-mode');

  // Lazy loading: cada sección carga cuando el usuario se acerca a ella
  observeSections([
    { id: 's-motor-partes',         path: './secciones/motor/1-partes-del-motor.html' },
    { id: 's-motor-diagnostico',    path: './secciones/motor/2-diagnostico-motor.html' },
    { id: 's-motor-sensores',       path: './secciones/motor/3-sensores-motor.html' },
    { id: 's-frenos-tipos',         path: './secciones/frenos/1-tipos-de-frenos.html' },
    { id: 's-frenos-mantenimiento', path: './secciones/frenos/2-mantenimiento-frenos.html' },
  ]);

  // Botón scroll al inicio
  const scrollBtn = d.querySelector('.scroll-top-btn');
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('hidden', window.scrollY < 350);
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 50, behavior: 'smooth' });
  });

});
