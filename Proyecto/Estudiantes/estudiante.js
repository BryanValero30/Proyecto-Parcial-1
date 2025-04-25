let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
let editando = false;
let indexEditando = null;

const form = document.getElementById("form-estudiantes");
const tabla = document.getElementById("tabla-estudiantes").querySelector("tbody");
const inputBuscar = document.getElementById("buscar");

// Mostrar estudiantes apenas carga la página
mostrarEstudiantes();

// Función de búsqueda
function buscarEstudiantes() {
  const busqueda = inputBuscar.value.toLowerCase();  // Convertir a minúsculas para una búsqueda no sensible a mayúsculas
  const estudiantesFiltrados = estudiantes.filter(est => {
    return (
      est.nombres.toLowerCase().includes(busqueda) ||
      est.apellidos.toLowerCase().includes(busqueda) ||
      est.curso.toLowerCase().includes(busqueda) ||
      est.cedula.toLowerCase().includes(busqueda)
    );
  });

  mostrarEstudiantes(estudiantesFiltrados);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const estudiante = {
    nombres: document.getElementById("nombres").value,
    apellidos: document.getElementById("apellidos").value,
    curso: document.getElementById("curso").value,
    cedula: document.getElementById("cedula").value,
    direccion: document.getElementById("direccion").value
  };

  if (editando) {
    estudiantes[indexEditando] = estudiante;
    editando = false;
    indexEditando = null;
  } else {
    estudiantes.push(estudiante);
  }

  guardarEnLocalStorage();
  form.reset();
  mostrarEstudiantes();
});

function mostrarEstudiantes(estudiantesAMostrar = estudiantes) {
  tabla.innerHTML = "";

  estudiantesAMostrar.forEach((est, index) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${est.nombres}</td>
      <td>${est.apellidos}</td>
      <td>${est.curso}</td>
      <td>${est.cedula}</td>
      <td>${est.direccion}</td>
      <td>
       <button onclick="editarEstudiante(${index})">
          <i class="fas fa-pencil-alt"></i> Editar
       </button>
       <button onclick="eliminarEstudiante(${index})">
          <i class="fas fa-trash-alt"></i> Eliminar
       </button>
      </td>
    `;

    tabla.appendChild(fila);
  });
}

function guardarEnLocalStorage() {
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}

window.editarEstudiante = function (index) {
  const est = estudiantes[index];
  document.getElementById("nombres").value = est.nombres;
  document.getElementById("apellidos").value = est.apellidos;
  document.getElementById("curso").value = est.curso;
  document.getElementById("cedula").value = est.cedula;
  document.getElementById("direccion").value = est.direccion;

  editando = true;
  indexEditando = index;
};

window.eliminarEstudiante = function (index) {
  if (confirm("¿Estás seguro de eliminar este estudiante?")) {
    estudiantes.splice(index, 1);
    guardarEnLocalStorage();
    mostrarEstudiantes();
  }
};


