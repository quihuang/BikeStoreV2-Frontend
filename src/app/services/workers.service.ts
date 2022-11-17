import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkersModel } from '../models/workers-model';

@Injectable({
  providedIn: 'root',
})
export class WorkersService {
  url = 'http://127.0.0.1:3000/workers';

  constructor(private http: HttpClient) {}

  getWorkersAll() {
    return this.http.get(this.url);
  }

  createWorker(worker: WorkersModel) {
    return this.http.post(this.url, worker);
  }

  updateWorker(worker: WorkersModel) {
    return this.http.put(`${this.url}/${worker.id}`, worker);
  }

  deleteWorker(worker: WorkersModel) {
    return this.http.delete(this.url + '/' + worker.id);
  }
}
