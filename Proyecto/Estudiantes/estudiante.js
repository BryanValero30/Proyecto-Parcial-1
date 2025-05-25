// Autor: Bryan Alexander Valero Oñate
let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
let editando = false;
let indexEditando = null;

const form = document.getElementById("form-estudiantes");
if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    // lógica de registro de estudiante aquí
    // ...tu código existente...
  });
}

const tabla = document.getElementById("tabla-estudiantes").querySelector("tbody");
const inputBuscar = document.getElementById("buscar");

mostrarEstudiantes();

function buscarEstudiantes() {
  const busqueda = inputBuscar.value.toLowerCase();  
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

<button class="Btn" onclick="editarEstudiante(${index})">
  <span>Editar</span>
  <svg class="svg" viewBox="0 0 512 512">
    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231z"></path>
  </svg>
</button>

<button class="Btn Btn-delete" onclick="eliminarEstudiante(${index})">
  <span>Eliminar</span>
  <svg class="svg" viewBox="0 0 448 512">
    <path d="M135.2 17.7C140.3 7.4 150.8 0 162.7 0H285.3c11.9 0 22.4 7.4 27.5 17.7L320 32H432c8.8 0 16 7.2 16 16s-7.2 16-16 16h-16l-21.2 339.8c-1.6 25.8-23.1 45.8-48.9 45.8H102.1c-25.8 0-47.3-20-48.9-45.8L32 64H16C7.2 64 0 56.8 0 48S7.2 32 16 32H128l7.2-14.3zM120 96l20.7 320h166.6L328 96H120z"/>
  </svg>
</button>
</td>
    
`;
    tabla.appendChild(fila);
  });
}

function guardarEnLocalStorage() {
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
  mostrarEstudiantes(); 
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