import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientsModel } from '../models/clients-model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  url = 'http://127.0.0.1:3000/clients';

  constructor(private http: HttpClient) {}

  getClientsAll() {
    return this.http.get(this.url);
  }

  createClient(client: ClientsModel) {
    return this.http.post(this.url, client);
  }

  updateClient(client: ClientsModel) {
    return this.http.put(this.url + '/' + client.id, client);
  }

  deleteClient(client: ClientsModel) {
    return this.http.delete(this.url + '/' + client.id);
  }
}
