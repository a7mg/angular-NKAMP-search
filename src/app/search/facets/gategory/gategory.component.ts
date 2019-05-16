import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gategory',
  templateUrl: './gategory.component.html',
  styleUrls: ['./gategory.component.scss']
})
export class GategoryComponent implements OnInit {
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
  chartData= {
    labels:[],
    data:[]
  };
  data: any;
  //   isAllowMultipeSelection: false
  // isAppearOnFacet: true
  // isShowPiChart: false
  // isShowVituailization: false

  @Input("facetOption") facetOption;
  constructor() {
    this.masterSelected = false;

  }

  ngOnInit() {
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
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };

  }

  allFieldMasterChanged(mainInput): void {
    console.log("mainInpuxt", mainInput.target.checked);
    this.masterSelected = mainInput.target.checked;
  }

}
