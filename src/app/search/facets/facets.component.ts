import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { GlobalsService } from 'src/app/NKAMP-Search-shared/services/globals.service';

@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.scss']
})
export class FacetsComponent implements OnInit {
  public facetsArr: Array<any>;
  facetFieldsOptions: Array<any>;
  constructor(
    private $searchService: SearchService,
    private $globalsService: GlobalsService) {
    this.facetsArr = [];
    this.facetFieldsOptions = [];
  }

  ngOnInit() {

    this.$searchService.searchConfiguration$.subscribe(data => {
      // console.log('Facets Configuration => ', data);
      if (data != null) {

        data.FacetFields.forEach(element => {
          this.facetFieldsOptions.push(element);
        });
        // console.log('Facets Configuration => ', this.facetFieldsOptions);
      }
    });
    debugger;
    this.$searchService.results$.subscribe(results => {
      debugger;
      console.log('$searchService.results$ ', results );
      if (results !== null) {
        this.facetsArr = results.facetsSearchQueryStatistic;
        console.log('facetsArrOptions', this.facetFieldsOptions);
        this.facetFieldsOptions.forEach((facetOption, idx) => {
          facetOption.values = this.facetsArr.filter(value => {
            return value.facetId === facetOption.id;
          });
          facetOption.values = facetOption.values.map((obj, i) => {
            obj.facetValue = obj.facetValue + ' dummy ' + i;
            return obj;
          });
        });
        this.facetFieldsOptions.sort((a, b) => (a.DisplayOrderNumber > b.DisplayOrderNumber) ? 1 : -1)
      }
    });
  }

}
