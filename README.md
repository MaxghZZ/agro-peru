# 🌿 AgroPerú — Sitio Web Corporativo (Grupo IAP Invernaderos)

Sitio web corporativo completo para **AgroPerú / Grupo IAP Invernaderos**, empresa peruana especializada en la fabricación y comercialización de estructuras para agricultura protegida de alta tecnología.

---

## 📁 Estructura de Archivos

```
Agro_peru_web_v2/
├── index.html                ← Página principal completa
├── css/
│   └── styles.css            ← Todos los estilos (sistema de diseño completo)
├── js/
│   └── main.js               ← Todas las funcionalidades JS
├── images/
│   ├── LogoAgroPeru.png        ← Logo principal
│   ├── favicon.png             ← Favicon del sitio
│   ├── hero-1.jpg              ← Poster del hero (fallback)
│   ├── videoPortada.mp4        ← Video de fondo del hero
│   ├── img1.jpg … img6.jpg     ← Imágenes de categorías de productos
│   ├── img_2.jpg               ← Invernadero Multitunel
│   ├── img_AgroFilm.jpg        ← Agro Film LDPE
│   ├── img_malla.jpg           ← Malla Antiáfida
│   ├── img-accesorio.jpg       ← Accesorios de fijación
│   ├── img-accesorios.jpg      ← Accesorios estructurales
│   ├── img-mecanico.jpg        ← Componentes mecánicos
│   └── proyects/
│       ├── proyecto-01…06.jpg  ← Fotos reales de proyectos ejecutados
│       └── video-01…07.mp4     ← Videos del reel de proyectos
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
- [x] **Navbar sticky** — Scroll con sombra y cambio de color
- [x] **Menú hamburguesa** — Mobile con panel lateral animado
- [x] **Dropdown de Productos** — Con hover animation
- [x] **Lightbox** — Galería con navegación por teclado
- [x] **Filtro de productos** — Todos / Invernaderos / Plásticos / Mallas / Accesorios
- [x] **Smooth scroll** — Navegación suave por secciones
- [x] **Botón WhatsApp flotante** — Con animación pulse y tooltip
- [x] **Validación de formulario** — Con mensajes de error amigables
- [x] **Back to Top** — Botón visible al hacer scroll
- [x] **Card animations** — IntersectionObserver entrada suave
- [x] **Video Reel** — Carrusel infinito auto-scroll con videos de proyectos
- [x] **Galería de Proyectos** — Fotos reales con lightbox

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
- [ ] **Dominio canonical:** Actualizar meta tag en `<head>`

---

## 📦 Dependencias Externas (CDN)

- **Font Awesome 6.5** — Iconos
- **Google Fonts** — Montserrat + Open Sans

**No se requiere npm, webpack ni ningún framework.** El sitio es 100% HTML/CSS/JS vanilla.

---

© 2026 AgroPerú / Grupo IAP Invernaderos. Desarrollado con ❤️ para el agro peruano.
