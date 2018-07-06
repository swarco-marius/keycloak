import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import { DataService } from '../data.service';
import { Table, Item } from '../models';

import * as moment from 'moment';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [DataService]
})
export class DataTableComponent implements OnInit {
  dataSource: Item[];
  tableData: Item[];
  tableHeadline: string;
  tableCols: any;
  tableRowsNo: number;
  tableTotalRecords: number;
  loading: boolean;

  constructor(private dataService: DataService) {
    this.tableCols = [
      { field: 'id' , header: 'ID' },
      { field: 'name', header: 'NAME' },
      { field: 'description', header: 'DESCRIPTION'},
      { field: 'date', header: 'DATE'}
    ];

    this.tableRowsNo = 10;
    this.loading = true;
  }

  ngOnInit() {
    this.dataService.getData()
      .subscribe((data: Table)  => {
        console.log(data);
        data.tableData.map(element =>
          element.date = moment(element.date).format('MMMM Do YYYY, h:mm:ss a')
        );
        this.tableData = data.tableData;
        this.tableHeadline = data.headline;
        this.tableTotalRecords = this.tableData.length;
        this.loading = false;
      }, error => {
        console.error(error);
        alert(error);
        this.loading = false;
      });
  }

  loadTableDataLazy(event: LazyLoadEvent) {
    this.loading = true;

    // in a real application, make a remote request to load data using state metadata from event
    // event.first = First row offset
    // event.rows = Number of rows per page
    // event.sortField = Field name to sort with
    // event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    // filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    // imitate db connection over a network
    setTimeout(() => {
      if (this.dataSource) {
        this.tableData = this.dataSource.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 500);
  }

  onGlobalFilter(event, dt) {
    console.log(event.target.value);
    dt.filterGlobal(event.target.value, 'contains');
  }
}
