import { Component, OnInit } from '@angular/core';
import { SalesModel } from 'src/app/models/sales-model';
import { WorkersModel } from 'src/app/models/workers-model';
import { ClientsModel } from 'src/app/models/clients-model';
import { InventoriesModel } from 'src/app/models/inventories-model';
import { SalesService } from 'src/app/services/sales.service';
import { WorkersService } from 'src/app/services/workers.service';
import { ClientsService } from 'src/app/services/clients.service';
import { InventoriesService } from 'src/app/services/inventories.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  // hago uso de Interpolación (https://youtu.be/KfYyWNqJaVc)
  // aquí se almacena el array de la consulta de la base de datos
  saleList = new Array<SalesModel>();

  // se usará para guardar un listado de los trabajadores
  workerList = new Array<WorkersModel>();

  // se usará para guardar un listado de los clientes
  clientList = new Array<ClientsModel>();

  // se usará para guardar un listado de los productos
  // por ahora datos quemados
  inventoriesList = new Array<InventoriesModel>();

  // variables para capturar el id del producto que seleccionen en el formulario
  //  y luego crear el objeto que se enviará al post
  inventoriesId: string;

  // hago uso de property Binding (https://youtu.be/ILO7-5Hnxt8)
  // para cambiar el estado de oculto de los botones Eliminar y Actualizar
  hiddenProperty = true;

  // hago uso de ngModel (de doble vía)
  // uso estas variables para enviar o traer los valores de los modales Crear y Actualizar
  formCreateSale = new SalesModel();
  formUpdateSale = new SalesModel();

  // inyectamos el servicio de sale en el constructor
  constructor(
    private salesService: SalesService,
    private workersService: WorkersService,
    private clientsService: ClientsService,
    private inventoriesService: InventoriesService
  ) {}

  ngOnInit(): void {
    // se ejecutan los métodos para obtener los listados al momento de cargar la página
    this.getSalesAll();
    this.getWorkersAll();
    this.getClientsAll();
    this.getInventoriesAll();
  }

  // método para consultar todos los clientes del backend
  getClientsAll() {
    this.clientsService.getClientsAll().subscribe((data) => {
      this.clientList = Object.values(data);
    });
  }

  // método para consultar todos los trabajadores del backend
  getWorkersAll() {
    this.workersService.getWorkersAll().subscribe((data) => {
      this.workerList = Object.values(data);
      // let objectArray = Object.values(data);
      // this.workerList = objectArray.map((n) => n['3'] + ' ' + n['4']);
    });
  }

  // método para consultar todos las ventas del backend
  getSalesAll() {
    this.salesService.getSalesAll().subscribe((data) => {
      this.saleList = Object.values(data);
    });
  }

  // método para consultar todos los inventarios del backend
  getInventoriesAll() {
    this.inventoriesService.getInventoriesAll().subscribe((data) => {
      this.inventoriesList = Object.values(data);
    });
  }

  // método para seleccionar una fila de la tabla
  // cambia el estado de los botones Eliminar y actualizar
  // captura los datos de la fila y los guarda en formUpdateSale, para con ellos rellenar el modal Actualizar...
  // OJO: también uso la variable formUpdateSale para el método Eliminar
  RowSelected(sale: SalesModel) {
    this.hiddenProperty = false;
    this.formUpdateSale = sale;
  }

  createSale() {
    // meter la fecha al objeto
    this.formCreateSale.date = new Date();

    // consumo el servicio de salesService para hacer el POST
    let result = this.salesService
      .createSale(this.formCreateSale)
      .subscribe((response) => {
        console.log('response: ' + response);
        return response;
      });

    console.log(Object.entries(result));
    if (result) {
      alert('Se creó la venta: ');
      this.getSalesAll();
    } else {
      alert('Error al crear la venta');
    }
  }

  updateSale() {
    try {
      let result = this.salesService
        .updateSale(this.formUpdateSale)
        .subscribe((response) => {
          console.log('response: ' + response);
          return response;
        });
      console.log(Object.entries(result));
      alert('Se actualizó la venta con éxito');
      this.getSalesAll();
    } catch (error) {
      alert('Error al actualizar la venta: ' + error);
    }
  }

  deleteSale() {
    let result = this.salesService
      .deleteSale(this.formUpdateSale)
      .subscribe((response) => {
        return response;
      });
    if (result) {
      alert('Se eliminó la venta: ' + this.formUpdateSale.id);
      this.getSalesAll();
    } else {
      alert('Error al la venta');
    }
  }
}
