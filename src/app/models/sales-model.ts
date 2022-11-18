export class SalesModel {
  id: string;
  clientsId: string;
  date: Date;
  productQuantity: number;
  salePrice: number;
  workersId: string;
  
  /* 
  inventorySalesId: [
    {
      inventoryId: 'string';
      salesId: 'string';
    }
  ];
  en el backend loopback creó esta propiedad como inventorySales: InventorySales[];
  esquema: 
  {
    "id": "string",
    "inventoryId": "string",
    "salesId": "string"
  }
  */
}
