import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-results-area',
  templateUrl: './results-area.component.html',
  styleUrls: ['./results-area.component.scss']
})
export class ResultsAreaComponent implements OnInit {
  isNoData = true;
  constructor(private $SearchService: SearchService) { }

  ngOnInit() {
    // this.$SearchService.searchConfiguration$.subscribe(data => {
    //   if (data != null) {

    //     data.FacetFields.forEach(element => {
    //       this.facetFieldsOptions.push(element);
    //     });
    //     console.log('Facets Configuration => ', this.facetFieldsOptions);
    //   }
    // });

    this.$SearchService.results$.subscribe(data => {
      // console.log("$SearchService.results$", data)
      if (data !== null) {
        this.isNoData = false;
      }
    });

  }

}
