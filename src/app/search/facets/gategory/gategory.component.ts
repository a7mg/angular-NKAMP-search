import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gategory',
  templateUrl: './gategory.component.html',
  styleUrls: ['./gategory.component.scss']
})
export class GategoryComponent implements OnInit {
  isRadioButton = true;
  masterSelected: boolean;
  showAll = false;
  maxShowing = 6;
  totalOfAllItems = 0;
  isCollapsed = false;

  @Input("facetOption") facetOption;
  constructor() {
    this.masterSelected = false;
  }

  ngOnInit() {
    console.log('category facet', this.facetOption);
    this.facetOption.values.forEach(element => {
      this.totalOfAllItems += element.totalItems;
    });
    this.isRadioButton = !this.facetOption.isAllowMultipeSelection;

  }

  allFieldMasterChanged(mainInput): void {
    console.log("mainInpuxt", mainInput.target.checked);
    this.masterSelected = mainInput.target.checked;
  }

}
