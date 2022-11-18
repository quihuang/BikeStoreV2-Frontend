import { Component, OnInit } from '@angular/core';
import { ClientsModel } from 'src/app/models/clients-model';
import { ClientsService } from 'src/app/services/clients.service';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  // hago uso de Interpolación (https://youtu.be/KfYyWNqJaVc)
  // aquí se almacena el array de la consulta de la base de datos
  clientList = new Array<ClientsModel>();

  // hago uso de property Binding (https://youtu.be/ILO7-5Hnxt8)
  // para cambiar el estado de oculto de los botones Eliminar y Actualizar
  hiddenProperty = true;

  // hago uso de ngModel (de doble vía)
  // uso estas variables para enviar o traer los valores de los modales Crear y Actualizar
  formCreateClient = new ClientsModel();
  formUpdateClient = new ClientsModel();

  // inyectamos el servicio de client en el constructor
  constructor(private clientsService: ClientsService) { }

  ngOnInit(): void {
    // al cargar la pagina ejecuta el método y envía los datos a la tabla
    this.getClientsAll();
  }

  // método para consultar todos los clientes del backend
  getClientsAll() {
    this.clientsService.getClientsAll().subscribe((data) => {
      this.clientList = Object.values(data);
    });
  }

  // método para seleccionar una fila de la tabla
  // cambia el estado de los botones Eliminar y actualizar
  // captura los datos de la fila y los guarda en formUpdateClient, para con ellos rellenar el modal Actualizar...
  // OJO: también uso la variable formUpdateClient para el método Eliminar
  RowSelected(client: ClientsModel) {
    console.log(client);

    this.hiddenProperty = false;
    this.formUpdateClient = client;
  }

  createClient() {
    // aquí hago la conversion de los tipos de datos que vienen del formulario
    this.formCreateClient.numDocument =
      this.formCreateClient.numDocument.toString();
    this.formCreateClient.phoneNumber =
      this.formCreateClient.phoneNumber.toString();
    this.formCreateClient.email = this.formCreateClient.email
      .toString()
      .toLowerCase();

    debugger;
    // consumo el servicio de clientsService para hacer el POST
    let result = this.clientsService
      .createClient(this.formCreateClient)
      .subscribe((response) => {
        // ToDo: con estos console.log busco entender los errores para poder capturarlo y tomar acciones en ese sentido
        console.log('response: ' + response);
        console.log(typeof response);
      });

    // ToDo: con estos console.log busco entender los errores para poder capturarlo y tomar acciones en ese sentido
    console.log('result: ' + result);
    console.log(typeof result);
    // ToDo: este if no funciona bien, ya que siempre recibe un objeto( con el valor null)
    if (result) {
      alert('Se creó el cliente: ' + this.formCreateClient.name);
      this.getClientsAll();
    } else {
      // ToDo: como el if no funciona bien, este alert nunca se muestra en los errores
      alert('Error al crear el cliente');
    }
  }

  updateClient() {
    this.formUpdateClient.numDocument =
      this.formUpdateClient.numDocument.toString();
    this.formUpdateClient.phoneNumber =
      this.formUpdateClient.phoneNumber.toString();
    this.formUpdateClient.email = this.formUpdateClient.email
      .toString()
      .toLowerCase();

    // ToDo: trato con el try catch de capturar un error, pero tampoco me funciona como quiero
    try {
      let result = this.clientsService
        .updateClient(this.formUpdateClient)
        .subscribe((response) => {
          // ToDo: con estos console.log busco entender los errores para poder capturarlo y tomar acciones en ese sentido
          console.log('response: ' + response);
          console.log(typeof response);
        });

      // ToDo: con estos console.log busco entender los errores para poder capturarlo y tomar acciones en ese sentido
      console.log('result: ' + result);
      console.log(typeof result);
      alert('Se actualizó el cliente: ' + this.formUpdateClient.name);
      this.getClientsAll();
    } catch (error) {
      alert('Error al actualizar el cliente, error: ' + error);
    }
  }

  deleteClient() {
    let result = this.clientsService
      .deleteClient(this.formUpdateClient)
      .subscribe((response) => {
        console.log('response: ' + response);
        console.log(typeof response);
      });

    // ToDo: No funciona, lo mismo del if del método crear
    if (result) {
      alert('Se eliminó el cliente: ' + this.formUpdateClient.name);
      this.getClientsAll();
    } else {
      alert('Error al eliminar el cliente');
    }
  }
}
