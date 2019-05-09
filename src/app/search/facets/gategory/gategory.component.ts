import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gategory',
  templateUrl: './gategory.component.html',
  styleUrls: ['./gategory.component.scss']
})
export class GategoryComponent implements OnInit {
  isRadioButton = true;
  totalOfAllItems = 0;
  showAll = false;
  maxShowing = 4;

  @Input("facetOption") facetOption;
  constructor() { }

  ngOnInit() {
    console.log('category facet', this.facetOption);
    this.facetOption.values.forEach(element => {
      this.totalOfAllItems += element.totalItems;
    });
    this.isRadioButton = !this.facetOption.isAllowMultipeSelection;

  }

}
