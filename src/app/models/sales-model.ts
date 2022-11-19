export class SalesModel {
  id: string;
  date: Date;
  workerName: string;
  clientName: string;
  ProductName: string;
  salePrice: number;
  productQuantity: number;

  /* 
  inventoriesSalesId: [
    {
      inventoriesId: 'string';
      salesId: 'string';
    }
  ];
  en el backend loopback creó esta propiedad como inventoriesSales: InventoriesSales[];
  esquema: 
  {
    "id": "string",
    "inventoriesId": "string",
    "salesId": "string"
  }
  */
}
