import { Component, OnInit } from '@angular/core';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  isLoading = false;
  favoriteBadge = 55;
  isNoData = false;
  constructor(private _SearchService: SearchService) { }

  ngOnInit() {
    const searchProfile = { SearchProfile_id: 'a4819e0e-58f8-4676-b750-7808648b4ad4' }
    this._SearchService.getSearchConfiguration(searchProfile).subscribe(data => {
      // console.log("tset ", data)
      this._SearchService.searchConfiguration$.next(data);
    })
  }

}
