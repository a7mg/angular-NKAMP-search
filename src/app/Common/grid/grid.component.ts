import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {   
  @Input('book-data') bookData;
  constructor() { 
  }

  ngOnInit() {
    console.log("bookDataGrid",this.bookData)
  }

}
