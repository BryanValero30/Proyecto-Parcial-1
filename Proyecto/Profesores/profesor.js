let profesores = JSON.parse(localStorage.getItem("profesores")) || [];
let editando = false;
let indexEditando = null;

const form = document.getElementById("form-profesores");
const tabla = document.getElementById("tabla-profesores").querySelector("tbody");
const inputBuscar = document.getElementById("buscar");

mostrarProfesores();

function buscarProfesores() {
  const texto = inputBuscar.value.toLowerCase();
  const filtrados = profesores.filter(prof =>
    prof.nombre.toLowerCase().includes(texto) ||
    prof.apellido.toLowerCase().includes(texto) ||
    prof.materia.toLowerCase().includes(texto) ||
    prof.curso.toLowerCase().includes(texto)
  );
  mostrarProfesores(filtrados);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const profesor = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    materia: document.getElementById("materia").value,
    curso: document.getElementById("curso").value,
    grupo: document.getElementById("grupo").value,
    jornada: document.getElementById("jornada").value,
    tipo: document.getElementById("tipo").value
  };

  console.log(profesor);  // Verifica que los valores estén siendo capturados

  if (editando) {
    profesores[indexEditando] = profesor;
    editando = false;
    indexEditando = null;
  } else {
    profesores.push(profesor);
  }

  guardarEnLocalStorage();
  form.reset();
  mostrarProfesores();
});

function mostrarProfesores(lista = profesores) {
  console.log(profesores);  // Verifica que el array de profesores está bien
  tabla.innerHTML = "";
  lista.forEach((prof, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${prof.nombre}</td>
      <td>${prof.apellido}</td>
      <td>${prof.materia}</td>
      <td>${prof.curso}</td>
      <td>${prof.grupo}</td>
      <td>${prof.jornada}</td>
      <td>${prof.tipo}</td>
      <td>
        <button onclick="editarProfesor(${index})"><i class="fas fa-pencil-alt"></i> Editar</button>
        <button onclick="eliminarProfesor(${index})"><i class="fas fa-trash-alt"></i> Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

function guardarEnLocalStorage() {
  localStorage.setItem("profesores", JSON.stringify(profesores));
}

window.editarProfesor = function (index) {
  const prof = profesores[index];
  document.getElementById("nombre").value = prof.nombre;
  document.getElementById("apellido").value = prof.apellido;
  document.getElementById("materia").value = prof.materia;
  document.getElementById("curso").value = prof.curso;
  document.getElementById("grupo").value = prof.grupo;
  document.getElementById("jornada").value = prof.jornada;
  document.getElementById("tipo").value = prof.tipo;

  editando = true;
  indexEditando = index;
};

window.eliminarProfesor = function (index) {
  if (confirm("¿Estás seguro de eliminar este profesor?")) {
    profesores.splice(index, 1);
    guardarEnLocalStorage();
    mostrarProfesores();
  }
};
