import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-active-selection',
  templateUrl: './active-selection.component.html',
  styleUrls: ['./active-selection.component.scss']
})
export class ActiveSelectionComponent implements OnInit {

  constructor(private $searchService: SearchService) { }

  ngOnInit() {
    // console.log('dddddddddddddddddddddddddddddddddddddddddddddddddd');
    // this.$searchService.currentCriteria$.subscribe((data:String) => {
    //   // console.log("data", data)
    //   data = data.replace(/'/g, '"');
    //   const criteria = JSON.parse(data);
    //   if (data !== null) {

    //     console.log("data", criteria.facetsFilter)
    //   }

    // });


  }
}
