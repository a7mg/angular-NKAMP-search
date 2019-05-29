import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.scss']
})
export class ItemsViewComponent implements OnInit {
  pageIndex = 1;
  itemsArr = [];
  constructor(private $searchService: SearchService) { }

  ngOnInit() {
    this.$searchService.results$.subscribe(data => {
      if (data !== null) {
        data.items.forEach(element => {
          this.itemsArr.push(element);
        });
        // console.log('Resultrs == > items ', this.itemsArr);
      }
    });
  }

}
