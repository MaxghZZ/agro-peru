# 🌿 AgroPerú — Sitio Web Corporativo

Sitio web corporativo completo para **AgroPerú**, empresa peruana especializada en la fabricación y comercialización de estructuras para agricultura protegida de alta tecnología.

---

## 📁 Estructura de Archivos

```
Agro_peru_web_v2/
├── index.html              ← Página principal completa
├── css/
│   └── styles.css          ← Todos los estilos (sistema de diseño completo)
├── js/
│   └── main.js             ← Todas las funcionalidades JS
├── images/
│   ├── logo.png
│   ├── videoPortada.mp4      ← Video de fondo del hero
│   ├── hero-1.jpg            ← Poster del hero (fallback mientras carga)
│   ├── cat-invernadero-alta.jpg
│   ├── cat-invernadero-media.jpg
│   ├── cat-casa-malla.jpg
│   ├── cat-macro-tunel.jpg
│   ├── cat-plastico.jpg
│   ├── cat-mallas.jpg
│   └── cat-accesorios.jpg
└── README.md
```

---

## 🚀 Cómo Visualizar el Sitio

### Opción 1 — Python (recomendado)
```bash
cd Agro_peru_web_v2
python -m http.server 8080
# Abrir: http://localhost:8080
```

### Opción 2 — VS Code Live Server
Instalar extensión **Live Server** y hacer clic en "Go Live"

### Opción 3 — Abrir directamente
Doble clic en `index.html` (algunas funciones pueden no andar sin servidor)

---

## 🎨 Sistema de Diseño

| Token | Valor | Uso |
|---|---|---|
| `--color-primary` | `#2E7D32` | Verde oscuro principal |
| `--color-primary-light` | `#4CAF50` | Verde hover |
| `--color-accent` | `#F59E0B` | Ámbar — CTAs y acentos |
| `--color-bg` | `#FFFFFF` | Fondo blanco |
| `--color-bg-alt` | `#F5F5F0` | Fondo crema secciones alternas |

**Fuentes:** Montserrat (títulos) + Open Sans (cuerpo) — Google Fonts

---

## ✅ Funcionalidades Implementadas

- [x] **Hero con video de fondo** — mp4 autoplay en bucle (muted + playsinline), overlay para legibilidad y poster de respaldo
- [x] **Contadores animados** — IntersectionObserver activado por scroll
- [x] **Navbar sticky** — Scroll con sombra
- [x] **Menú hamburguesa** — Mobile con panel lateral animado
- [x] **Dropdown de Productos** — Con hover animation
- [x] **Lightbox** — Galería con navegación por teclado y touch
- [x] **Filtro de productos** — Todos / Invernaderos / Plásticos / Mallas / Accesorios
- [x] **Smooth scroll** — Navegación suave por secciones
- [x] **Botón WhatsApp flotante** — Con animación pulse y tooltip
- [x] **Validación de formulario** — Con mensajes de error amigables
- [x] **Back to Top** — Botón visible al hacer scroll
- [x] **Card animations** — IntersectionObserver entrada suave

---

## 📱 Responsive Breakpoints

| Pantalla | Layout |
|---|---|
| Desktop 1440px+ | 3 columnas, layout completo |
| Desktop 1024–1439px | 3 columnas, ajustes menores |
| Tablet 768–1023px | 2 columnas, menú condensado |
| Mobile < 768px | 1 columna, menú hamburguesa |

---

## 🔧 Personalización Pendiente

Para publicar el sitio, reemplazar los siguientes datos de contacto placeholder:

- [ ] **Teléfono:** `+51 987 654 321` → número real
- [ ] **WhatsApp:** `https://wa.me/51987654321` → número real
- [ ] **Email:** `ventas@agroperuperu.com` → email real
- [ ] **Dirección:** `Av. La Agricultura 123, Ate Vitarte, Lima` → dirección real
- [ ] **Mapa:** Actualizar coordenadas del `<iframe>` de Google Maps
- [ ] **Redes sociales:** Actualizar links de Facebook e Instagram
- [ ] **Imágenes de galería** (picsum.photos) → fotos reales de proyectos
- [ ] **Logo:** Reemplazar con logo vectorial oficial
- [ ] **Dominio canonical:** Actualizar meta tag en `<head>`

---

## 📦 Dependencias Externas (CDN)

- **Font Awesome 6.5** — Iconos
- **Google Fonts** — Montserrat + Open Sans
- **Picsum Photos** — Imágenes placeholder (reemplazar con fotos reales)

**No se requiere npm, webpack ni ningún framework.** El sitio es 100% HTML/CSS/JS vanilla.

---

© 2025 AgroPerú. Desarrollado con ❤️ para el agro peruano.
