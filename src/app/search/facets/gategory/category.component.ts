import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { GlobalsService } from 'src/app/Naseej-shared/services/globals.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;
  masterSelected: boolean;
  showAll = false;
  maxShowing = 6;
  totalOfAllItems = 0;
  isCollapsed = false;
  isVituailizationActive = false;
  config = {
    isAllowMultiSelection: false,
    isPiChart: false,
    isVituailization: false,
  }
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
    console.log('category facet', this.facetOption);
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

  allFieldMasterChanged(mainInput): void {
    console.log('mainInpuxt', mainInput.target.checked);
    this.masterSelected = mainInput.target.checked;
  }

  createItemsFormDynamic() {
    this.categoryForm = this.$formBuilder.group({
      facetFC: new FormArray([])
    });

    this.addFacets();

  }

  public addFacets() {
    this.facetOption.values.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.categoryForm.controls.facetFC as FormArray).push(control);
    });
  }

  // addSearchFormGroup(defalutValues = { facet: null }) {
  //   return this.$formBuilder.control({
  //     facetFC: [defalutValues.facet]
  //   });
  // }

  // setSearchObject(group: FormGroup = this.categoryForm): void {
  //   console.log('group :', group )
  // }

  onSubmit(categoryForm): void {
    console.log('catgory form ', this.categoryForm);
  }

}
