import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  pageIndex = 1;
  itemsArr = [];
  constructor(private _SearchService: SearchService) { }

  ngOnInit() {
    this._SearchService.results$.subscribe(data => {
      if (data !== null) {
        data.items.forEach(element => {
          this.itemsArr.push(element);
        });
        console.log("Resultrs == > items ", this.itemsArr);
      }
    });
  }

}
