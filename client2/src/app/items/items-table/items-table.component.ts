import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Item } from "../shared/item";
import {
  IPageChangeEvent, ITdDataTableColumn, ITdDataTableSortChangeEvent,
  TdDataTableSortingOrder
} from "@covalent/core";
import {TableFetcher, TableFetchQuery, TableFetchResult} from "../../core/table-fetcher";

/**
 * Shows a table of Items with sorting and pagination.
 */
@Component({
  selector: 'gsl-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.css']
})
export class ItemsTableComponent implements OnInit, OnChanges {
  /** Fetches the range of items shown in the table. */
  @Input()
  fetcher: TableFetcher<Item>;

  /** Items currently shown in the table. */
  result: TableFetchResult<Item>;

  pageSize: number = 10;

  /** One-based number of the current page. */
  page: number = 1;

  sortOrder: string = 'title';

  /** Meta-data for the table. */
  columns: ITdDataTableColumn[] = [
    { name: 'barcode', label: 'Barcode', sortable: true },
    { name: 'title', label: 'Title', sortable: true },
  ];

  constructor() { }

  ngOnInit() {
    this.fetch();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetch();
  }

  onSort(sortChange: ITdDataTableSortChangeEvent) {
    const sign = sortChange.order == TdDataTableSortingOrder.Descending ? '-' : '';
    this.sortOrder = sign + sortChange.name;
    this.fetch();
  }

  onPage(pageChange: IPageChangeEvent) {
    this.page = pageChange.page;
    this.pageSize = pageChange.pageSize;
    this.fetch();
  }

  getQuery(): TableFetchQuery {
    const offset = (this.page - 1) * this.pageSize;
    return new TableFetchQuery(offset, this.pageSize, this.sortOrder);
  }

  fetch() {
    this.fetcher.fetch(this.getQuery()).subscribe(result => {
      this.result = result;
    });
  }
}
