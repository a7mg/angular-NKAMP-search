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
  addQueryRequestBody ={
    "userId": "user_58",
    "anonymous": true,
    "email": "abdfg@xyz.comabdfg@xyz.com",
    "query_name": "books",
    "query_syntax": ""
  };
  searchValues={
    "searchProfileId": "1111-1111-1111-1111",
    "pageSize": 15,
    "dataSourcesId": [
      "dataSources1",
      "dataSources2"
    ],
    "searchKeyWords": [
      {
        "searchKeyWordId": "SearchKeyWordId1",
        "materialTypeId": "MaterialTypeId1",
        "keyWordValue": "KeyWordValue1",
        "searchOperationId": "SearchOperationId1",
        "nextSearchKeyWordWithAnd": true
      }
    ],
    "facetsFilter": [
      {
        "facetId": "1111-1111-1111-1111",
        "facetType": "5",
        "facetValue": "Riyadh"
      }
    ],
    "keywWordsOrderBy": [
      {
        "keywWordId": "1111-1111-1111-1111",
        "keywWordType": "4",
        "keywWordValue": "value",
        "isAcendening": true
      }
    ]
  };
  searchValueString = JSON.stringify(this.searchValues);
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
  saveSearch(){
    // this.addQueryRequestBody.query_syntax= this.searchValueString;
    console.log(this.addQueryRequestBody);
    this._SearchService.addQuery(this.addQueryRequestBody).subscribe((data)=>{
      if (data != null) {
        console.log(data);
      }else{
        console.log("no data");
      }
    });
  }

}
