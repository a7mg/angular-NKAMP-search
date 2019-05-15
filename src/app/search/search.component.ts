import { Component, OnInit } from '@angular/core';
import { SearchService } from './services/search.service';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [MessageService]
})
export class SearchComponent implements OnInit {
  isLoading = false;
  favoriteBadge = 55;
  isNoData = true;
  constructor(private _SearchService: SearchService, private messageService: MessageService) { }

  ngOnInit() {
    const searchProfile = { SearchProfile_id: 'FFB6CD68-BED4-4B5D-897D-89D205734B0E' };
    this._SearchService.getSearchConfiguration(searchProfile).subscribe(data => {
      console.log('getSearchConfiguration ', data);
      this._SearchService.searchConfiguration$.next(data);
    });
    this._SearchService.results$.subscribe(data => {
      if ( data !== null){
        this.isNoData = false;
      }
    });
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success Message', detail:'Order submitted'});
}

}
