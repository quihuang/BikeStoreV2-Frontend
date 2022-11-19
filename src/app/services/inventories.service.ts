import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventoriesModel } from '../models/inventories-model';

@Injectable({
  providedIn: 'root',
})
export class InventoriesService {
  url = 'http://127.0.0.1:3000/inventories';

  constructor(private http: HttpClient) {}

  getInventoriesAll() {
    return this.http.get(this.url);
  }

  createInventories(inventories: InventoriesModel) {
    return this.http.post(this.url, inventories);
  }

  updateInventories(inventories: InventoriesModel) {
    return this.http.put(`${this.url}/${inventories.id}`, inventories);
  }

  deleteInventories(inventories: InventoriesModel) {
    return this.http.delete(this.url + '/' + inventories.id);
  }
}
