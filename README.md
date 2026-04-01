# Mecánica Automotriz — Apuntes Personales

## ¿Qué es este proyecto?

Sitio web estático de apuntes personales sobre mecánica automotriz.
El objetivo es tener un lugar centralizado, accesible desde cualquier dispositivo (celular, tablet, PC),
donde guardar conocimientos, procedimientos, tablas de referencia y diagnósticos relacionados al tema.

El sitio está pensado para subirse a **GitHub Pages** (hosting gratuito) y abrirlo desde cualquier navegador
sin instalar nada adicional.

---

## Stack Tecnológico

- **HTML5** — estructura de la página
- **CSS3** — estilos con variables CSS (`:root`), responsive con media queries
- **JavaScript ES Modules** (Vanilla, sin frameworks) — lógica del sitio
- **Sin npm, sin bundler, sin dependencias** — el proyecto es una carpeta estática
- **CDN externo**: solo la librería de estilos del botón hamburguesa (hamburgers.css de jonsuh.com)
- **Sin APIs externas** — todo el contenido (texto, imágenes) se almacena localmente en el proyecto

---

## Estructura de Carpetas

```
mecanica/
├── index.html                          ← Entrada principal del sitio (requerida por GitHub Pages)
├── README.md                           ← Este archivo
├── css/
│   ├── main.css                        ← Variables, reset, layout, cards, tablas, botones
│   └── menu.css                        ← Panel hamburguesa y menú de navegación
├── js/
│   ├── main.js                         ← Entry point (type="module"): wiring de todos los módulos
│   ├── section-loader.js               ← Lazy loading con IntersectionObserver
│   ├── menu.js                         ← Lógica del panel hamburguesa
│   └── dark-theme.js                   ← Modo oscuro con persistencia en localStorage
├── secciones/
│   ├── motor/
│   │   ├── 1-partes-del-motor.html     ← Componentes del motor de combustión interna
│   │   └── 2-diagnostico-motor.html    ← Códigos OBD-II, síntomas y diagnóstico
│   └── frenos/
│       ├── 1-tipos-de-frenos.html      ← Disco, tambor, ABS, regenerativos
│       └── 2-mantenimiento-frenos.html ← Cambio de pastillas, sangrado, líquido DOT
└── img/
    └── (guardar acá imágenes, diagramas y fotos)
```

---

## Cómo Correr el Proyecto Localmente

El proyecto usa `fetch()` para cargar las secciones, por lo que **no funciona abriendo `index.html` directamente** desde el explorador de archivos (`file://`).

**Opción 1 — VS Code con Live Server (recomendada):**
1. Abrir la carpeta `mecanica/` en VS Code
2. Instalar la extensión **Live Server** (ritwickdey.liveserver)
3. Clic derecho en `index.html` → "Open with Live Server"
4. El sitio abre en `http://127.0.0.1:5500`

**Opción 2 — Python (si tenés Python instalado):**
```bash
cd mecanica
python -m http.server 5500
```
Luego abrir `http://localhost:5500` en el navegador.

---

## Cómo Agregar Nueva Sección

### 1. Crear el archivo HTML de la sección

Crear un archivo en la carpeta de la categoría correspondiente.
Los archivos son **fragmentos HTML** (sin `<html>`, `<head>` ni `<body>`):

```
secciones/suspension/1-tipos-de-suspension.html
```

El contenido debe usar las clases CSS ya definidas:

```html
<div class="seccion-contenido">
  <div class="seccion-header">
    <h2>🚗 Título de la Sección</h2>
    <p>Descripción breve</p>
  </div>

  <div class="cards-grid">
    <article class="card">
      <div class="card-icono">🔧</div>
      <h3>Título</h3>
      <p>Descripción...</p>
    </article>
  </div>
</div>
```

### 2. Agregar la sección vacía en `index.html`

Dentro de `<main>`, agregar:
```html
<section id="s-suspension-tipos" class="section" data-seccion="Tipos de Suspensión"></section>
```

### 3. Registrar en el menú (`index.html`)

Dentro del `<nav class="menu">`, agregar un nuevo grupo o un link en el grupo correspondiente:
```html
<div class="menu-grupo">
  <span class="menu-grupo-titulo">🚗 Suspensión</span>
  <a href="#s-suspension-tipos">Tipos de Suspensión</a>
</div>
```

### 4. Registrar en `js/main.js`

Agregar al array de `observeSections`:
```javascript
{ id: 's-suspension-tipos', path: './secciones/suspension/1-tipos-de-suspension.html' },
```

---

## Clases CSS Disponibles

### Cards

```html
<div class="cards-grid">                          <!-- grilla responsive: 1/2/3 columnas -->
  <article class="card">                          <!-- borde superior rojo (por defecto) -->
  <article class="card card--naranja">            <!-- borde superior naranja -->
  <article class="card card--verde">              <!-- borde superior verde -->
  <article class="card card--azul">               <!-- borde superior azul -->
```

### Cajas de información

```html
<div class="info-box">      <!-- azul — información general -->
<div class="advertencia">   <!-- rojo — advertencia o peligro -->
<div class="tip">           <!-- verde — consejo o truco -->
<div class="procedimiento"> <!-- naranja — pasos o procesos -->
```

### Tablas

```html
<div class="tabla-wrapper">
  <table class="tabla">
    <thead><tr><th>...</th></tr></thead>
    <tbody><tr><td>...</td></tr></tbody>
  </table>
</div>
```

### Pasos numerados

```html
<ol class="pasos-lista">
  <li>Primer paso...</li>
  <li>Segundo paso...</li>
</ol>
```

### Badges (etiquetas)

```html
<span class="badge badge--rojo">Alta</span>
<span class="badge badge--naranja">Media</span>
<span class="badge badge--verde">Baja</span>
<span class="badge badge--azul">Info</span>
```

---

## Cómo Subir a GitHub Pages

1. Crear un repositorio público en GitHub llamado `mecanica-automotriz`
2. Desde la carpeta `mecanica/`, inicializar git y subir:
   ```bash
   git init
   git add .
   git commit -m "primer commit"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/mecanica-automotriz.git
   git push -u origin main
   ```
3. En el repositorio de GitHub → **Settings → Pages → Branch: main → Save**
4. URL: `https://TU-USUARIO.github.io/mecanica-automotriz/`

Cada vez que agregues contenido nuevo:
```bash
git add .
git commit -m "agrego sección suspensión"
git push
```
GitHub Pages actualiza el sitio automáticamente en ~1 minuto.

---

## Patrones de Código

### Lazy Loading (section-loader.js)

Cada sección se carga solo cuando el usuario está a 250px de verla.
Muestra un esqueleto animado mientras carga.
Si hay un error (sin servidor local), muestra un mensaje claro.

```javascript
observeSections([
  { id: 'id-de-la-seccion', path: './secciones/categoria/archivo.html' },
]);
```

### Modo Oscuro (dark-theme.js)

Guarda la preferencia en `localStorage` con la clave `mecanica-tema`.
Agrega/quita la clase `dark-mode` al `<body>`.
Las variables CSS en `body.dark-mode` reemplazan las de `:root`.

### Menú Hamburguesa (menu.js)

Al hacer clic en el botón hamburguesa, agrega/quita `.is-active` en el panel y el botón.
Al hacer clic en cualquier link del menú, cierra el panel.

---

## Convenciones de Nomenclatura

- IDs de secciones: `s-[categoria]-[nombre]` (ej: `s-motor-partes`, `s-frenos-tipos`)
- Archivos de secciones: `[numero]-[nombre-con-guiones].html` dentro de la carpeta de categoría
- Categorías de carpetas: nombre en minúsculas sin espacios (`motor`, `frenos`, `suspension`, `electricidad`)

---

## Secciones Planeadas (futuras)

- `secciones/suspension/` — tipos de suspensión, amortiguadores, alineación
- `secciones/electricidad/` — sistema de carga, batería, diagnóstico eléctrico
- `secciones/transmision/` — caja manual, automática, CVT, diferencial
- `secciones/herramientas/` — herramientas básicas y especiales, torquímetro

---

*Proyecto iniciado: 2026 — Mecánica Automotriz, apuntes personales*
