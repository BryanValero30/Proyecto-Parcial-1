// Autor: Adrian Alexander Gonzalez Solis
let listaCalificaciones = JSON.parse(localStorage.getItem("calificaciones")) || [];
let editando = false;
let indexEditando = null;

const form = document.getElementById("form-calificaciones");
const tabla = document.getElementById("tabla-calificaciones").querySelector("tbody");
const inputBuscar = document.getElementById("buscar");

// Inicialización
mostrarCalificaciones();

function buscarCalificaciones() {
  const busqueda = inputBuscar.value.toLowerCase();  
  const calificacionesFiltradas = listaCalificaciones.filter(est => {
    return (
      est.nombres.toLowerCase().includes(busqueda) ||
      est.materia.toLowerCase().includes(busqueda) ||
      est.periodo.toLowerCase().includes(busqueda) ||
      est.calificacion.toLowerCase().includes(busqueda)
    );
  });
  mostrarCalificaciones(calificacionesFiltradas);
}

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault(); // Esto evita que la página se recargue

    // Validación básica
    if (!document.getElementById("nombres").value || 
        !document.getElementById("calificacion").value) {
      alert("Por favor complete los campos requeridos");
      return;
    }

    const nuevaCalificacion = {
      nombres: document.getElementById("nombres").value,
      materia: document.getElementById("materia").value,
      periodo: document.getElementById("periodo").value,
      calificacion: document.getElementById("calificacion").value
    };

    if (editando) {
      listaCalificaciones[indexEditando] = nuevaCalificacion;
      editando = false;
      indexEditando = null;
    } else {
      listaCalificaciones.push(nuevaCalificacion);
    }

    guardarEnLocalStorage();
    form.reset();
    mostrarCalificaciones();
  });
}

function mostrarCalificaciones(calificacionesAMostrar = listaCalificaciones) {
  tabla.innerHTML = "";

  calificacionesAMostrar.forEach((est, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${est.nombres}</td>
      <td>${est.materia}</td>
      <td>${est.periodo}</td>
      <td>${est.calificacion}</td>
      <td>
        <button class="Btn" onclick="editarCalificacion(${index})">
          <span>Editar</span>
          <svg class="svg" viewBox="0 0 512 512"><path d="M410.3..."></path></svg>
        </button>
        <button class="Btn Btn-delete" onclick="eliminarCalificacion(${index})">
          <span>Eliminar</span>
          <svg class="svg" viewBox="0 0 448 512"><path d="M135.2..."></path></svg>
        </button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

function guardarEnLocalStorage() {
  localStorage.setItem("calificaciones", JSON.stringify(listaCalificaciones));
}

window.editarCalificacion = function(index) {
  const est = listaCalificaciones[index];
  document.getElementById("nombres").value = est.nombres;
  document.getElementById("materia").value = est.materia;
  document.getElementById("periodo").value = est.periodo;
  document.getElementById("calificacion").value = est.calificacion;

  editando = true;
  indexEditando = index;
};

window.eliminarCalificacion = function(index) {
  if (confirm("¿Estás seguro de eliminar esta calificación?")) {
    listaCalificaciones.splice(index, 1);
    guardarEnLocalStorage();
    mostrarCalificaciones();
  }
};