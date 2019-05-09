import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { GlobalsService } from 'src/app/Naseej-shared/services/globals.service';

@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.scss']
})
export class FacetsComponent implements OnInit {
  public facetsArr = [];
  facetFieldsOptions = [];
  constructor(
    private _SearchService: SearchService,
    private _GlobalsService: GlobalsService) {

  }

  ngOnInit() {
    this._SearchService.searchConfiguration$.subscribe(data => {
      // console.log('Facets Configuration => ', data);
      if (data != null) {

        data.FacetFields.forEach(element => {
          this.facetFieldsOptions.push(element);
        });
        // console.log('Facets Configuration => ', this.facetFieldsOptions);
      }
    });

    this._SearchService.results$.subscribe(results => {
      if (results !== null) {
        this.facetsArr = results.facetsSearchQueryStatistic;
        // console.log('facetsArr', this.facetsArr);
        this.facetFieldsOptions.forEach((facetOption, idx) => {
          facetOption['values'] = this.facetsArr.filter(value => {
            return value.id === facetOption.id;
          });
        });
        // console.log('Facets Configuration with values => ', this.facetFieldsOptions);
      }
    });
  }

}
