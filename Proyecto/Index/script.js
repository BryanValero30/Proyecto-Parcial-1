const items = document.querySelectorAll('.sidebar li');
const mainContent = document.getElementById('mainContent');
const sidebar = document.getElementById('sidebar');

items.forEach(item => {
  item.addEventListener('click', () => {
    const section = item.getAttribute('data-section');
    let title = '';
    let text = '';
   // Carga el html de la sección de estudiantes 
    switch (section) {
      case 'estudiantes':
        cargarSeccion('../Estudiantes/estudiante.html');
        break;
   // Falta Carga el html
      case 'materias':
       cargarSeccion('../Materias/materia.html');
        break;
  // FaltaCarga el html
      case 'profesores':
        cargarSeccion('../Profesores/profesor.html');
        break;
  // FaltaCarga el html
      case 'calificaciones':
        cargarSeccion('../Calificaciones/calificaciones.html');
        break;

 // Configuracion de Colores no es necesario modificar 
      case 'config':
        title = 'Configuración';
        text = `
        <p>Elige un color para el menú lateral:</p>
     <div class="color-options">
  <button class="color-blue" title="Azul"></button>
  <button class="color-green" title="Verde"></button>
  <button class="color-red" title="Rojo"></button>
  <button class="color-purple" title="Morado"></button>
  <button class="color-orange" title="Naranja"></button>
  <button class="color-teal" title="Turquesa"></button>
  <button class="color-pink" title="Rosado"></button>
  <button class="color-yellow" title="Amarillo"></button>
  <button class="color-gray" title="Gris"></button>
  <button class="color-black" title="Negro"></button>
  <button class="color-sky" title="Celeste"></button>
  <button class="color-lime" title="Lima"></button>
  <button class="color-maroon" title="Marrón Oscuro"></button>
  <button class="color-navy" title="Azul Marino"></button>
  <button class="color-coral" title="Coral"></button>
  <button class="color-brown" title="Café"></button>
  <button class="color-olive" title="Oliva"></button>
  <button class="color-cyan" title="Cian"></button>
  <button class="color-magenta" title="Magenta"></button>
  <button class="color-gold" title="Dorado"></button>
  <button class="color-silver" title="Plateado"></button>
  <button class="color-indigo" title="Índigo"></button>
  <button class="color-crimson" title="Carmesí"></button>
  <button class="color-mint" title="Menta"></button>
  <button class="color-peach" title="Durazno"></button>
  <button class="color-rose" title="Rosa Fucsia"></button>
  <button class="color-charcoal" title="Carbón"></button>
</div>


        `;
        mainContent.innerHTML = `<h1>${title}</h1>${text}`;
        agregarListenersColor(); 
        return;
    }
    mainContent.innerHTML = `<h1>${title}</h1><p>${text}</p>`;
  });
});

function agregarListenersColor() {
  const colores = {
    "color-blue": "#2957b9",
    "color-green": "#27ae60",
    "color-red": "#c0392b",
    "color-purple": "#8e44ad",
    "color-orange": "#e67e22",
    "color-teal": "#16a085",
    "color-pink": "#e84393",
    "color-yellow": "#f1c40f",
    "color-gray": "#7f8c8d",
    "color-black": "#000000",
    "color-sky": "#74b9ff",
    "color-lime": "#a3cb38",
    "color-maroon": "#800000",
    "color-navy": "#001f3f",
    "color-coral": "#ff7f50",
    "color-brown": "#8b4513",
    "color-olive": "#808000",
    "color-cyan": "#00bcd4",
    "color-magenta": "#d81b60",
    "color-beige": "#f5f5dc",
    "color-gold": "#ffd700",
    "color-silver": "#bdc3c7",
    "color-indigo": "#3f51b5",
    "color-crimson": "#dc143c",
    "color-aqua": "#00ffff",
    "color-mint": "#98ff98",
    "color-peach": "#ffcc99",
    "color-lavender": "#e6e6fa",
    "color-rose": "#ff007f",
    "color-charcoal": "#36454f"
  };
  

  Object.entries(colores).forEach(([clase, color]) => {
    document.querySelector(`.${clase}`)?.addEventListener('click', () => {
      const sidebar = document.querySelector('.sidebar');
      sidebar.style.setProperty('--sidebar-color', color);
    });
  });
}

// Función encargada de carga las secciones (No tocar)
function cargarSeccion(ruta) {
  fetch(ruta)
    .then(res => res.text())
    .then(html => {
      document.getElementById("mainContent").innerHTML = html;

      // Elimina scripts dinámicos previos
      document.querySelectorAll('script[data-dinamico]').forEach(s => s.remove());

      // Carga el JS y CSS correspondiente
      if (ruta.includes('Estudiantes/estudiante.html')) {
        const script = document.createElement('script');
        script.src = '../Estudiantes/estudiante.js';
        script.setAttribute('data-dinamico', 'true');
        script.onload = () => { /* Opcional: callback si necesitas */ };
        document.body.appendChild(script);

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../Estudiantes/estudiante.css';
        document.head.appendChild(link);
      }

      if (ruta.includes('Materias/materia.html')) {
        const script = document.createElement('script');
        script.src = '../Materias/materia.js';
        script.setAttribute('data-dinamico', 'true');
        document.body.appendChild(script);

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../Materias/materia.css';
        document.head.appendChild(link);
      }

      if (ruta.includes('Profesores/profesor.html')) {
        const script = document.createElement('script');
        script.src = '../Profesores/profesor.js';
        script.setAttribute('data-dinamico', 'true');
        document.body.appendChild(script);

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../Profesores/profesor.css';
        document.head.appendChild(link);
      }

      if (ruta.includes('Calificaciones/calificaciones.html')) {
        const script = document.createElement('script');
        script.src = '../Calificaciones/calificaciones.js';
        script.setAttribute('data-dinamico', 'true');
        document.body.appendChild(script);

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../Calificaciones/calificaciones.css';
        document.head.appendChild(link);
      }
    });
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("form-calificaciones");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      // tu lógica aquí
    });
  }
});
