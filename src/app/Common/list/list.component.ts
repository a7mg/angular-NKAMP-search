
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input('book-data') bookData;
  additionalField1: any;
  additionalField2: any;

  constructor() { } 

  ngOnInit() {
    console.log("bookDataGrid", this.bookData);
    this.additionalField1 = this.bookData.addtionFieldsInListPage.addtionField.filter(x => x.id === '789f356c-dcec-459c-aac4-6196f430d890')[0].insertedData; 
    this.additionalField2 = this.bookData.addtionFieldsInListPage.addtionField.filter(x => x.id === 'e8122c8f-83b1-4eb2-9736-f93d05a019ff')[0].aName;
  }

}
