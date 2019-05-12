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
    const searchProfile = { SearchProfile_id: 'FFB6CD68-BED4-4B5D-897D-89D205734B0E' };
    this._SearchService.getSearchConfiguration(searchProfile).subscribe(data => {
      console.log('getSearchConfiguration ', data);
      this._SearchService.searchConfiguration$.next(data);
    });
  }

}
