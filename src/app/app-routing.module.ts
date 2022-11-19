import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { HomeComponent } from './components/home/home.component';
import { ManagementReportComponent } from './components/management-report/management-report.component';
import { WorkersComponent } from './components/workers/workers.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SalesComponent } from './components/sales/sales.component';
import { InventoriesComponent } from './components/inventories/inventories.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'managementReport', component: ManagementReportComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'workers', component: WorkersComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'inventories', component: InventoriesComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
