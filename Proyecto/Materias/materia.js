// Variables globales
let materias = JSON.parse(localStorage.getItem("materias")) || [];
let editando = false;
let indexEditando = null;

const form = document.getElementById("form-materia");
const tabla = document.getElementById("materias-lista");
const inputBuscar = document.getElementById("buscar");


mostrarMaterias();
function buscarMaterias() {
  const busqueda = inputBuscar.value.toLowerCase();
  const materiasFiltradas = materias.filter(materia => {
    return (
      materia.nombre.toLowerCase().includes(busqueda) ||
      materia.codigo.toLowerCase().includes(busqueda) ||
      materia.curso.toLowerCase().includes(busqueda) ||
      materia.grupo.toLowerCase().includes(busqueda)
    );
  });

  mostrarMaterias(materiasFiltradas);
}


if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const materia = {
      nombre: document.getElementById("nombre").value,
      codigo: document.getElementById("codigo").value,
      profesor: document.getElementById("profesor").value,
      curso: document.getElementById("curso").value,
      grupo: document.getElementById("grupo").value,
      jornada: document.getElementById("jornada").value,
      tipo: document.getElementById("tipo").value,
      parcial: document.getElementById("parcial").value, // Cambiado aquí
      aula: document.getElementById("aula").value,
    };

    if (editando) {
      materias[indexEditando] = materia;
      editando = false;
      indexEditando = null;
    } else {
      materias.push(materia);
    }

    guardarEnLocalStorage();
    form.reset();
    mostrarMaterias();
  });
}

function mostrarMaterias(materiasAMostrar = materias) {
  tabla.innerHTML = "";

  materiasAMostrar.forEach((materia, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${materia.nombre}</td>
      <td>${materia.codigo}</td>
      <td>${materia.profesor}</td>
      <td>${materia.curso}</td>
      <td>${materia.grupo}</td>
      <td>${materia.jornada}</td>
      <td>${materia.tipo}</td>
      <td>${materia.parcial}</td> <!-- Cambiado aquí -->
      <td>${materia.aula}</td>
      <td>
        <button class="Btn" type="button" onclick="editarMateria(${index})">Editar</button>
        <button class="Btn Btn-delete" type="button" onclick="eliminarMateria(${index})">Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

function guardarEnLocalStorage() {
  localStorage.setItem("materias", JSON.stringify(materias));
  mostrarMaterias();
}

window.editarMateria = function (index) {
  const materia = materias[index];
  document.getElementById("nombre").value = materia.nombre;
  document.getElementById("codigo").value = materia.codigo;
  document.getElementById("profesor").value = materia.profesor;
  document.getElementById("curso").value = materia.curso;
  document.getElementById("grupo").value = materia.grupo;
  document.getElementById("jornada").value = materia.jornada;
  document.getElementById("tipo").value = materia.tipo;
  document.getElementById("parcial").value = materia.parcial; // Cambiado aquí
  document.getElementById("aula").value = materia.aula;

  editando = true;
  indexEditando = index;
};

window.eliminarMateria = function (index) {
  if (confirm("¿Estás seguro de que deseas eliminar esta materia?")) {
    materias.splice(index, 1);
    guardarEnLocalStorage();
    mostrarMaterias();
  }
};
