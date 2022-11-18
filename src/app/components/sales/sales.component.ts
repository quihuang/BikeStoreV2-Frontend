import { Component, OnInit } from '@angular/core';
import { SalesModel } from 'src/app/models/sales-model';
import { WorkersModel } from 'src/app/models/workers-model';
import { ClientsModel } from 'src/app/models/clients-model';
import { SalesService } from 'src/app/services/sales.service';
import { WorkersService } from 'src/app/services/workers.service';
import { ClientsService } from 'src/app/services/clients.service';

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
  inventoryList = [
    {
      id: '123abc',
      productName: 'Quemada Bicicleta A',
      description: 'TodoTerreno1',
      existence: 101,
      purchaseRefNumber: 'referencia A',
      priceUniSale: 100,
      priceUniPurchase: 50,
    },
    {
      id: '456abc',
      productName: 'Quemada Bicicleta b',
      description: 'TodoTerreno2',
      existence: 102,
      purchaseRefNumber: 'referencia B',
      priceUniSale: 100,
      priceUniPurchase: 50,
    },
  ];

  // variables para capturar el id del producto que seleccionen en el formulario
  //  y luego crear el objeto que se enviará al post
  inventoryId: string;

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
    private clientsService: ClientsService
  ) {}

  ngOnInit(): void {
    // se ejecutan los métodos para obtener los listados al momento de cargar la página
    this.getSalesAll();
    this.getWorkersAll();
    this.getClientsAll();
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
    debugger;
    // consumo el servicio de salesService para hacer el POST
    let result = this.salesService
      .createSale(this.formCreateSale)
      .subscribe((response) => {
        console.log('response: ' + response);
        return response;
      });

    console.log('result: ' + result);
    console.log( Object.entries(result));
    if (result) {
      alert('Se creó la venta: ');
      this.getSalesAll();
    } else {
      alert('Error al crear la venta');
    }
  }

  updateSale() {
    // aquí hago la conversion de los tipos de datos que vienen del formulario
    // this.formUpdateSale.numDocument =this.formUpdateSale.numDocument.toString();
    // this.formUpdateSale.phoneNumber =this.formUpdateSale.phoneNumber.toString();
    // this.formUpdateSale.email = this.formUpdateSale.email.toString().toLowerCase();
    // en la siguiente linea, tomo el numero que viene de la lista "select" y lo uso como indice para buscar su valor correspondiente dentro del listado de roles, de esa forma no se guarda un número, si no un texto con el rol mucho mas claro
    // this.formUpdateSale.role = this.roles[parseInt(this.formUpdateSale.role)];
    // try {
    //   let result = this.salesService
    //     .updateSale(this.formUpdateSale)
    //     .subscribe((response) => {
    //       console.log('response: ' + response);
    //       return response;
    //     });
    //   console.log('result: ' + result);
    //   alert('Se actualizó el trabajador: ' + this.formUpdateSale.name);
    //   this.getSalesAll();
    // } catch (error) {
    //   alert('Error al actualizar el trabajador, error: ' + error);
    // }
  }

  deleteSale() {
    //   let result = this.salesService
    //     .deleteSale(this.formUpdateSale)
    //     .subscribe((response) => {
    //       return response;
    //     });
    //   if (result) {
    //     alert('Se eliminó el trabajador: ' + this.formUpdateSale.name);
    //     this.getSalesAll();
    //   } else {
    //     alert('Error al eliminar el trabajador');
    //   }
  }

  ventas = [
    {
      id: {
        $oid: '6377a99ba29ab03cc818a414',
      },
      date: {
        $date: {
          $numberLong: '1668700143591',
        },
      },
      workersId: {
        $oid: '636d4c798c3e0f17cc31b5bb',
      },
      clientsId: {
        $oid: '63730408dcb44c394ca1f450',
      },
      products: '[[Bici A",1,1000],["Cascos A",1,100]]',
      totalPrice: 1100,
    },
    {
      id: {
        $oid: '6377b0eee074383131321f9a',
      },
      date: {
        $date: {
          $numberLong: '1668700143591',
        },
      },
      workersId: {
        $oid: '636d4c798c3e0f17cc31b5bb',
      },
      clientsId: {
        $oid: '63730408dcb44c394ca1f450',
      },
      products: '[[Bici B",1,1000],["Cascos B",2,200]]',
      totalPrice: 1200,
    },
    {
      id: {
        $oid: '6377b0f1e074383131321f9b',
      },
      date: {
        $date: {
          $numberLong: '1668786543591',
        },
      },
      workersId: {
        $oid: '6374da2755dd433ecc8f89cc',
      },
      clientsId: {
        $oid: '63730408dcb44c394ca1f450',
      },
      products: '[[Bici C",1,1000],["Cascos C",3,300]]',
      totalPrice: 1300,
    },
    {
      id: {
        $oid: '6377b129e074383131321f9c',
      },
      date: {
        $date: {
          $numberLong: '1668786543591',
        },
      },
      workersId: {
        $oid: '6374da2755dd433ecc8f89cc',
      },
      clientsId: {
        $oid: '63730408dcb44c394ca1f450',
      },
      products: '[[Bici D",1,1000],["Cascos D",4,400]]',
      totalPrice: 1400,
    },
  ];
}
