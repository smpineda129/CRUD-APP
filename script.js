class Registro {
    constructor(nombre, apellido, edad) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
    }
  }
  
  class Crud {
    constructor() {
      this.form = document.getElementById('form');
      this.nombreInput = document.getElementById('nombre');
      this.apellidoInput = document.getElementById('apellido');
      this.edadInput = document.getElementById('edad');
      this.submitBtn = document.getElementById('submit-btn');
      this.cancelBtn = document.getElementById('cancel-btn');
      this.tableBody = document.getElementById('table-body');
      this.registroIndex = null;
      this.registros = [];
  
      // Cargar registros almacenados en localStorage
      const registrosGuardados = JSON.parse(localStorage.getItem('registros'));
      if (registrosGuardados) {
        this.registros = registrosGuardados;
        this.mostrarRegistros();
      }
  
      this.submitBtn.addEventListener('click', this.agregarRegistro.bind(this));
      this.cancelBtn.addEventListener('click', this.cancelarRegistro.bind(this));
    }
  
    agregarRegistro(event) {
      event.preventDefault();
      const nombre = this.nombreInput.value;
      const apellido = this.apellidoInput.value;
      const edad = this.edadInput.value;
      if (!nombre || !apellido || !edad) {
        alert('Por favor completa todos los campos');
        return;
      }
      if (this.registroIndex !== null) {
        // Actualizar registro existente
        this.registros[this.registroIndex] = {
          nombre: nombre,
          apellido: apellido,
          edad: edad
        };
        this.registroIndex = null;
      } else {
        // Agregar nuevo registro
        const registro = new Registro(nombre, apellido, edad);
        this.registros.push(registro);
      }
      this.form.reset();
      this.mostrarRegistros();
  
      // Guardar registros en localStorage
      localStorage.setItem('registros', JSON.stringify(this.registros));
    }
  
    mostrarRegistros() {
      this.tableBody.innerHTML = '';
      this.registros.forEach((registro, index) => {
        const tr = document.createElement('tr');
        const tdNombre = document.createElement('td');
        const tdApellido = document.createElement('td');
        const tdEdad = document.createElement('td');
        const tdAcciones = document.createElement('td');  
        const editarBtn = document.createElement('button');
        const eliminarBtn = document.createElement('button');
        tdNombre.textContent = registro.nombre;
        tdApellido.textContent = registro.apellido;
        tdEdad.textContent = registro.edad;
        editarBtn.textContent = 'Editar';
        editarBtn.classList.add("btn-edit")
        editarBtn.addEventListener('click', () => {
          this.editarRegistro(index);
        });
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.addEventListener('click', () => {
          this.eliminarRegistro(index);
        });
        tdAcciones.appendChild(editarBtn);
        tdAcciones.appendChild(eliminarBtn);
        tr.appendChild(tdNombre);
        tr.appendChild(tdApellido);
        tr.appendChild(tdEdad);
        tr.appendChild(tdAcciones);
        this.tableBody.appendChild(tr);
      });
    }
  
    editarRegistro(index) {
      const registro = this.registros[index];
      this.nombreInput.value = registro.nombre;
      this.apellidoInput.value = registro.apellido;
      this.edadInput.value = registro.edad;
      this.registroIndex = index;
    }
  
    eliminarRegistro(index) {
      this.registros.splice(index, 1);
      localStorage.setItem('registros', JSON.stringify(this.registros));
      this.mostrarRegistros();
    }
  
    cancelarRegistro() {
      this.form.reset();
      this.registroIndex = null;
    }
  }
  
  const crud = new Crud();
  