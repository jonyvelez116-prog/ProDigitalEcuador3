# CONTEXTO DEL PROYECTO: SITIO WEB CORPORATIVO — PRO DIGITAL

## 1. OBJETIVO DEL PROYECTO
Desarrollar una landing page profesional de alto rendimiento, optimizada para SEO y 100% responsiva (Mobile-First) para el lanzamiento de la agencia de desarrollo web. El objetivo comercial absoluto es captar clientes a nivel nacional en todo Ecuador y generar conversiones directas (ventas/cotizaciones) hacia WhatsApp.

## 2. INSTRUCCIONES DEL SISTEMA (AI SYSTEM PROMPTS)
- **Idioma del Código:** Estructuras HTML, nombres de clases CSS y variables técnicas en INGLÉS (Buenas prácticas de la industria).
- **Idioma del Contenido:** Todo el texto visible para el usuario (títulos, descripciones, botones) debe estar estrictamente en ESPAÑOL.
- **Filosofía de Diseño:** Estética premium, modo oscuro (dark mode) tecnológico, alto contraste, efectos visuales modernos (estilo Stitch) y accesibilidad garantizada.
- **Estándares:** Indentación limpia de 2 espacios y comentarios breves explicativos en secciones clave.

## 3. PERFIL COMERCIAL Y ENTIDAD
- **Nombre de la Marca:** Pro Digital - Desarrollo Web Profesional
- **Alcance Comercial:** Todo Ecuador (Con base física principal en Manta para reuniones presenciales o soporte local).
- **Enfoque de Negocio:** Hiper-especialización en creación de sitios web de alta velocidad, posicionamiento digital y provisión de hosting/servidores estables para empresas, profesionales y PYMEs.
- **Canal de Conversión:** Botón de Llamada a la Acción (CTA) principal configurado hacia WhatsApp con un mensaje pre-llenado profesional.

## 4. ARQUITECTURA DE INFORMACIÓN (SECCIONES REQUERIDAS)
El sitio será una Single-Page Application (`index.html`) estructurada en los siguientes bloques semánticos:

1. **Cabecera / Navegación (`<header>`):**
   - Logo de texto limpio: "Pro Digital".
   - Menú de navegación con scroll suave: Inicio, Servicios, Nosotros, Cotizar.
   - Menú hamburguesa interactivo y animado para dispositivos móviles.

2. **Sección Principal / Hero (`<section id="home">`):**
   - Título Impactante (H1): Enfocado en la creación de páginas web profesionales que venden y cargan al instante en todo Ecuador.
   - Subtítulo: Propuesta de valor clara (Desarrollo con código limpio desde cero + hosting ultra rápido, sin plantillas lentas).
   - Botón CTA Principal: "Cotizar mi Proyecto Web" (Enlace a WhatsApp).

3. **Servicios Core / Especialización (`<section id="services">`):**
   Grid de 2 Columnas con Tarjetas Visuales Premium (Diseño Stitch):
   - *Tarjeta 1: Desarrollo Web Profesional a Medida.* Landing pages de alta conversión, sitios corporativos, portafolios y aplicaciones web optimizadas utilizando código puro (Vanilla), sin intermediarios lentos. Velocidad de carga menor a 2 segundos.
   - *Tarjeta 2: Hosting Premium & Servidores.* Almacenamiento web ultra rápido en la nube, correos corporativos estables, certificados de seguridad SSL gratuitos y mantenimiento web garantizado para que el sitio nunca se caiga.

4. **Sobre Nosotros / Diferenciadores (`<section id="about">`):**
   - Breve biografía que destaca la obsesión por el código limpio, la puntualidad en las entregas, la comunicación directa (sin agencias intermediarias lentas) y el soporte post-entrega garantizado en el país.

5. **Pie de Página (`<footer>`):**
   - Enlaces de navegación rápida, enlaces de redes sociales (Facebook), información de derechos reservados de Pro Digital y créditos del desarrollador.

## 5. REQUISITOS TÉCNICOS
- **HTML5:** Marcado semántico estricto (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **CSS3 Moderno:** - Uso obligatorio de Variables CSS (`:root`) para controlar la paleta de colores y efectos.
  - Diseño responsivo basado ÚNICAMENTE en CSS Flexbox y CSS Grid.
  - Cero frameworks externos (Ni Bootstrap, ni Tailwind). Todo el diseño es CSS nativo.
  - Inclusión obligatoria del Reset / Modern Normalize en las primeras líneas para asegurar que la estructura jamás se deforme en celulares iPhone (Safari iOS) o Android (Chrome).
- **JavaScript (Vanilla JS):** Archivo `js/script.js` enfocado en el menú móvil, navbar interactivo y animaciones de scroll.