let profesores = JSON.parse(localStorage.getItem("profesores")) || [];
let editando = false;
let indexEditando = null;

const form = document.getElementById("form-profesores");
if (form) {
  form.addEventListener("submit", function(e) {
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

    console.log(profesor);  

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
}

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

function mostrarProfesores(lista = profesores) {
  console.log(profesores);  
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
        <button class="Btn" onclick="editarProfesor(${index})">
  <span>Editar</span>
  <svg class="svg" viewBox="0 0 512 512">
    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231z"></path>
  </svg>
</button>

<button class="Btn Btn-delete" onclick="eliminarProfesor(${index})">
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
  localStorage.setItem("profesores", JSON.stringify(profesores));
  mostrarProfesores();
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
