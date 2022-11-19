import { Component, OnInit } from '@angular/core';
import { InventoriesModel } from 'src/app/models/inventories-model';
import { InventoriesService } from 'src/app/services/inventories.service';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html',
  styleUrls: ['./inventories.component.css'],
})
export class InventoriesComponent implements OnInit {
  // hago uso de Interpolación (https://youtu.be/KfYyWNqJaVc)
  // aquí se almacena el array de la consulta de la base de datos
  inventoriesList = new Array<InventoriesModel>();

  // hago uso de property Binding (https://youtu.be/ILO7-5Hnxt8)
  // para cambiar el estado de oculto de los botones Eliminar y Actualizar
  hiddenProperty = true;

  // hago uso de ngModel (de doble vía)
  // uso estas variables para enviar o traer los valores de los modales Crear y Actualizar
  formCreateInventories = new InventoriesModel();
  formUpdateInventories = new InventoriesModel();

  constructor(private inventoriesService: InventoriesService) {}

  ngOnInit(): void {
    // al cargar la pagina ejecuta el método y envía los datos a la tabla
    this.getInventoriesAll();
  }

  // método para consultar todos los inventarios del backend
  getInventoriesAll() {
    this.inventoriesService.getInventoriesAll().subscribe((data) => {
      this.inventoriesList = Object.values(data);
    });
  }

  // método para seleccionar una fila de la tabla
  // cambia el estado de los botones Eliminar y actualizar
  // captura los datos de la fila y los guarda en formUpdateInventories, para con ellos rellenar el modal Actualizar...
  // OJO: también uso la variable formUpdateInventories para el método Eliminar
  RowSelected(inventories: InventoriesModel) {
    this.hiddenProperty = false;
    this.formUpdateInventories = inventories;
  }

  createInventories() {
    this.formCreateInventories.existence = this.formCreateInventories.existence.toString();

    // consumo el servicio de inventoriesService para hacer el POST
    let result = this.inventoriesService
      .createInventories(this.formCreateInventories)
      .subscribe((response) => {
        console.log('response: ' + response);
        return response;
      });

    console.log(result);
    if (result) {
      alert('Se creó el inventario: ' + this.formCreateInventories.productName);
      this.getInventoriesAll();
    } else {
      alert('Error al crear el inventario');
    }
  }

  updateInventories() {
    this.formUpdateInventories.existence = this.formUpdateInventories.existence.toString();


    try {
      let result = this.inventoriesService
        .updateInventories(this.formUpdateInventories)
        .subscribe((response) => {
          console.log('response: ' + response);
          return response;
        });

      console.log('result: ' + result);
      alert(
        'Se actualizó el inventario: ' + this.formUpdateInventories.productName
      );
      this.getInventoriesAll();
    } catch (error) {
      alert('Error al actualizar el inventario, error: ' + error);
    }
  }

  deleteInventories() {
    let result = this.inventoriesService
      .deleteInventories(this.formUpdateInventories)
      .subscribe((response) => {
        return response;
      });

    if (result) {
      alert(
        'Se eliminó el inventario: ' + this.formUpdateInventories.productName
      );
      this.getInventoriesAll();
    } else {
      alert('Error al eliminar el inventario');
    }
  }
}
