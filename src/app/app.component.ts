import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'BikeStoreV2-Frontend';
  managementReport = '/managementReport';
  clients = '/clients';
  workers = '/workers';
  sales = '/sales';
  inventories = '/inventories';
}
