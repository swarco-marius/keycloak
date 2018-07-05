import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { DataTableComponent } from './data-table/data-table.component';
import { DataRoutingModule } from './data.routing.module';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    DataTableComponent
  ],
  imports: [
    SharedModule,
    TableModule,
    TooltipModule,
    HttpClientModule,
    DataRoutingModule
  ]
})
export class DataModule { }
