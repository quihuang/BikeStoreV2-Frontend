import { Component, OnInit } from '@angular/core';
import { WorkersModel } from 'src/app/models/workers-model';
import { WorkersService } from 'src/app/services/workers.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss'],
})
export class WorkersComponent implements OnInit {
  // hago uso de Interpolación (https://youtu.be/KfYyWNqJaVc)
  // aquí se almacena el array de la consulta de la base de datos
  workerList = new Array<WorkersModel>();

  // hago uso de property Binding (https://youtu.be/ILO7-5Hnxt8)
  // para cambiar el estado de oculto de los botones Eliminar y Actualizar
  hiddenProperty = true;

  // hago uso de ngModel (de doble vía)
  // uso estas variables para enviar o traer los valores de los modales Crear y Actualizar
  formCreateWorker = new WorkersModel();
  formUpdateWorker = new WorkersModel();

  // ToDo: se queman los posibles roles que existan en la base de datos
  roles = ['Jefe Operativo', 'Comercial', 'Bodeguero'];

  // inyectamos el servicio de worker en el constructor
  constructor(private workersService: WorkersService) { }

  ngOnInit(): void {
    // al cargar la pagina ejecuta el método y envía los datos a la tabla
    this.getWorkersAll();
  }

  // método para consultar todos los trabajadores del backend
  getWorkersAll() {
    this.workersService.getWorkersAll().subscribe((data) => {
      this.workerList = Object.values(data);
    });
  }

  // método para seleccionar una fila de la tabla
  // cambia el estado de los botones Eliminar y actualizar
  // captura los datos de la fila y los guarda en formUpdateWorker, para con ellos rellenar el modal Actualizar...
  // OJO: también uso la variable formUpdateWorker para el método Eliminar
  RowSelected(worker: WorkersModel) {
    this.hiddenProperty = false;
    this.formUpdateWorker = worker;
  }

  createWorker() {
    // aquí hago la conversion de los tipos de datos que vienen del formulario
    this.formCreateWorker.numDocument =
      this.formCreateWorker.numDocument.toString();
    this.formCreateWorker.phoneNumber =
      this.formCreateWorker.phoneNumber.toString();
    this.formCreateWorker.email = this.formCreateWorker.email
      .toString()
      .toLowerCase();
    // en la siguiente linea, tomo el numero que viene de la lista "select" y lo uso como indice para buscar su valor correspondiente dentro del listado de roles, de esa forma no se guarda un número, si no un texto con el rol mucho mas claro
    this.formCreateWorker.role =
      this.roles[parseInt(this.formCreateWorker.role)];

    // consumo el servicio de workersService para hacer el POST
    let result = this.workersService
      .createWorker(this.formCreateWorker)
      .subscribe((response) => {
        console.log('response: ' + response);
        return response;
      });

    console.log('result: ' + result);
    if (result) {
      alert('Se creó el trabajador: ' + this.formCreateWorker.name);
      this.getWorkersAll();
    } else {
      alert('Error al crear el trabajador');
    }
  }

  updateWorker() {
    // aquí hago la conversion de los tipos de datos que vienen del formulario
    this.formUpdateWorker.numDocument =
      this.formUpdateWorker.numDocument.toString();
    this.formUpdateWorker.phoneNumber =
      this.formUpdateWorker.phoneNumber.toString();
    this.formUpdateWorker.email = this.formUpdateWorker.email
      .toString()
      .toLowerCase();
    // en la siguiente linea, tomo el numero que viene de la lista "select" y lo uso como indice para buscar su valor correspondiente dentro del listado de roles, de esa forma no se guarda un número, si no un texto con el rol mucho mas claro
    this.formUpdateWorker.role =
      this.roles[parseInt(this.formUpdateWorker.role)];

    try {
      let result = this.workersService
        .updateWorker(this.formUpdateWorker)
        .subscribe((response) => {
          console.log('response: ' + response);
          return response;
        });

      console.log('result: ' + result);
      alert('Se actualizó el trabajador: ' + this.formUpdateWorker.name);
      this.getWorkersAll();
    } catch (error) {
      alert('Error al actualizar el trabajador, error: ' + error);
    }
  }

  deleteWorker() {
    let result = this.workersService
      .deleteWorker(this.formUpdateWorker)
      .subscribe((response) => {
        return response;
      });

    if (result) {
      alert('Se eliminó el trabajador: ' + this.formUpdateWorker.name);
      this.getWorkersAll();
    } else {
      alert('Error al eliminar el trabajador');
    }
  }
}
