import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SalesModel } from '../models/sales-model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  url = 'http://127.0.0.1:3000/sales';


  constructor(private http: HttpClient) { }

  
  getSalesAll() {
    return this.http.get(this.url);
  }

  createSale(sale: SalesModel) {
    return this.http.post(this.url, sale);
  }

  updateSale(sale: SalesModel) {
    return this.http.put(this.url + '/' + sale.id, sale);
  }

  deleteSale(sale: SalesModel) {
    return this.http.delete(this.url + '/' + sale.id);
  }
}
