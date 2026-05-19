Housify 🏠

> A premium, interactive online rental marketplace frontend designed for the Indian housing market. Built with modern HTML5, semantic CSS3 custom properties, and vanilla JavaScript (ES6+).

Housify delivers a visually stunning and incredibly smooth user experience for discovering verified rental properties. It includes unique custom filters tailored to user requirements (such as occupant count and rent duration) alongside seamless transitions and interactive components.

🎯 **Live Demo:** [houseiify.netlify.app]

---

## ✨ Core Interactive Features

* **Dynamic Advanced Search Engine:** A multi-tab configuration (`Rent`, `Buy`, `PG / Hostel`) built with field validations, budget handling, and localized search notifications.
* **Real-time Category Filtering:** Instant property filtering logic via JS data attributes—smoothly filtering between Apartments, Villas, Studios, and PGs without reloading.
* **Interactive Dynamic Modal Overlay:** Clicking any property card generates a structured modal layout displaying granular property specs (BHK, bathrooms, area, and max guests) alongside a built-in "Request a Visit" client scheduling form.
* **Asynchronous Scroll-Reveal Animations:** Utilizes the high-performance **JavaScript Intersection Observer API** to trigger cascading reveal transitions on cards and structural sections.
* **Live Counter Animations:** Numbers dynamically tick up from `0` to their final values (e.g., *12,000+ Active Listings*) when users scroll down to the statistics section.
* **Contextual Toast System:** Custom CSS-animated notification system giving user feedback for actions like favoring properties, error validation, and successful form submissions.
* **100% Mobile Responsive Layout:** Custom multi-tiered `@media` query breakpoints featuring a sliding hamburger mobile drawer menu overlay.

---

## 🛠️ Technology Architecture

* **HTML5:** Semantic architecture including structured section elements (`<nav>`, `<section>`, `<footer>`), custom `data-*` configurations, and inline SVG asset management.
* **CSS3 Custom Variables:** Managed through a localized `:root` state to handle dynamic color palettes (`--primary: #1a3c2e`, `--accent: #d4a853`), micro-shadow elevations (`--shadow-lg`), and custom cubic-bezier timing functions (`--transition`).
* **Vanilla ES6+ JavaScript:** Event delegators, intersection observers, smooth scroll API configuration, dynamic DOM content strings, and native browser state management.
* **Typography & Media:** Integrated with Google Fonts (*Playfair Display* & *DM Sans*) coupled with high-resolution, lazy-loaded visual assets via Unsplash.

---

## 📁 File Structure

```text
housify/
├── index.html     # Main structural layout & dynamic modal markup
├── style.css      # Core stylesheet, animations, global variables & media queries
└── script.js      # Intersection observers, category filters, and component logic
