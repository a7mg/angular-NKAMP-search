import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { GlobalsService } from 'src/app/NKAMP-Search-shared/services/globals.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;
  masterSelected: boolean;
  checklist = [];
  checkedList: any;
  showAll = false;
  maxShowing = 6;
  totalOfAllItems = 0;
  isCollapsed = false;
  isVituailizationActive = false;
  config = {
    isAllowMultiSelection: false,
    isPiChart: false,
    isVituailization: false,
  };
  chartData = {
    labels: [],
    data: []
  };
  data: any;
  //   isAllowMultipeSelection: false
  // isAppearOnFacet: true
  // isShowPiChart: false
  // isShowVituailization: false

  @Input('facetOption') facetOption;
  constructor(private $searchService: SearchService,
              private $globalsService: GlobalsService,
              private $formBuilder: FormBuilder) {
    this.masterSelected = false;

  }

  ngOnInit() {
    this.createItemsFormDynamic();
    // console.log('category facet', this.facetOption);
    this.facetOption.values.forEach(element => {
      this.totalOfAllItems += element.totalItems;
      this.chartData.labels.push(element.facetValue);
      this.chartData.data.push(element.totalItems);
    });
    this.config.isAllowMultiSelection = !this.facetOption.isAllowMultipeSelection;
    this.config.isPiChart = this.facetOption.isShowPiChart;
    this.config.isVituailization = this.facetOption.isShowVituailization;


    this.data = {
      labels: [...this.chartData.labels],
      datasets: [
        {
          data: [...this.chartData.data],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }]
    };

  }

  // allFieldMasterChanged(mainInput): void {
  //   console.log('mainInpuxt', mainInput.target.checked);
  //   this.masterSelected = mainInput.target.checked;
  // }

  createItemsFormDynamic() {
    this.categoryForm = this.$formBuilder.group({
      selectAll: [null],
      facetFC: new FormArray([])
    });

    this.addFacets();

  }

  private addFacets() {
    this.facetOption.values.map((o, i) => {
      this.checklist.push({ id: o.id, isSelected: false });
      const control = new FormControl(false); // if first item set to true, else false
      (this.categoryForm.controls.facetFC as FormArray).push(control);
    });
  }

  checkUncheckAll() {
    // this.masterSelected = !this.masterSelected ;
    console.log('this.masterSelected', this.masterSelected);
    for (let i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = this.masterSelected;
    }
    // console.log("this.checklist checkUncheckAll",this.checklist)
    this.getCheckedItemList();
  }

  isAllSelected(event, idx) {
    // event.target.checked
    console.log('this.checklist event', event.target.checked);
    this.checklist[idx].isSelected = event.target.checked;
    this.masterSelected = this.checklist.every((item: any) => {
      return item.isSelected === true;
    });
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    // const isSelectedID = [];
    // for (let i = 0; i < this.checklist.length; i++) {
    //   if (this.checklist[i].isSelected) {
    //     isSelectedID.push(this.checklist[i].id);
    //   }
    // }
    // this.checkedList = JSON.stringify(isSelectedID);
    // console.log("this.checklist getCheckedItemList", this.checklist)
    this.checkedList = [];
    for (let i = 0; i < this.checklist.length; i++) {
      if (this.checklist[i].isSelected) {
        this.checkedList.push(this.checklist[i]);
      }
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }

  onSubmit(): void {
    console.log('catgory this.checklist ', this.checklist);
    console.log('catgory this.checkedList ', this.checkedList);
    // console.log('catgory form ', this.categoryForm);
  }

}
