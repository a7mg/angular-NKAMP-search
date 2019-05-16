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
    this.$SearchService.results$.subscribe(data => {
      if (data !== null) {
        this.isNoData = false;
      }
    });

  }

}
