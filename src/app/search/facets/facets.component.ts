import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { GlobalsService } from 'src/app/Naseej-shared/services/globals.service';

@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.scss']
})
export class FacetsComponent implements OnInit {
  protected facetsArr = [];
  constructor(
    private _SearchService: SearchService,
    private _GlobalsService: GlobalsService) {

   }

  ngOnInit() {
     this._SearchService.results$.subscribe(results =>{
      if ( results !== null ) {
          this.facetsArr = results.facetsSearchQueryStatistic;
      }
    })
  }

}
