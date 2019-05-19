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
  addQueryRequestBody = {
    query_syntax: "{'dataSourcesId':['0B438369-C0DA-4A32-8C6F-103AB6FEADD2','A641F684-00F6-4988-A052-B2FEFAB171C7','A641F684-00F6-4988-A052-B2FEFAB171C9'],'searchKeyWords':[{'searchKeyWordId':'1909145C-117E-48F3-9F5A-B699D011C619','materialTypeId':'','keyWordValue':'ddddddddddd','searchOperationId':'E58FB0BC-744C-4136-A4CE-A9A3736914FE','nextSearchKeyWordWithAnd':true},{'searchKeyWordId':'E57FA2D0-921D-4E43-8487-DCEEDBB225F6','materialTypeId':'','keyWordValue':'search test 2','searchOperationId':'AAD2C592-DC0D-4ED5-A5C7-6F0259C0498B','nextSearchKeyWordWithAnd':false},{'searchKeyWordId':'AA06F8E1-BF2C-42F6-8C01-AD6F0BF60E50','materialTypeId':'','keyWordValue':'search test 3','searchOperationId':'','nextSearchKeyWordWithAnd':true}],'pageSize':12,'searchProfileId':'1111-1111-1111-1111'}",
    query_name: 'ART and football 4',
    anonymous: false,
    id: 'rnPb4mkBBsIQctp5jb6r',
    userId: 'hager1',
    email: 'abdfg@xyz.com'
  };
  searchValues = {
    searchProfileId: '1111-1111-1111-1111',
    pageSize: 15,
    dataSourcesId: [
      'dataSources1',
      'dataSources2'
    ],
    searchKeyWords: [
      {
        searchKeyWordId: 'SearchKeyWordId1',
        materialTypeId: 'MaterialTypeId1',
        keyWordValue: 'KeyWordValue1',
        searchOperationId: 'SearchOperationId1',
        nextSearchKeyWordWithAnd: true
      }
    ],
    facetsFilter: [
      {
        facetId: '1111-1111-1111-1111',
        facetType: '5',
        facetValue: 'Riyadh'
      }
    ],
    keywWordsOrderBy: [
      {
        keywWordId: '1111-1111-1111-1111',
        keywWordType: '4',
        keywWordValue: 'value',
        isAcendening: true
      }
    ]
  };
  searchValueString = JSON.stringify(this.searchValues);
  getQueryRequestBody = {
    userId: 'user_5'
  };
  getQueryValues = [];
  deleteRequestBody = {
    id: ''
  };
  constructor(private _SearchService: SearchService, private messageService: MessageService) { }

  ngOnInit() {
    const searchProfile = { SearchProfile_id: 'FFB6CD68-BED4-4B5D-897D-89D205734B0E' };
    this._SearchService.getSearchConfiguration(searchProfile).subscribe(data => {
      console.log('getSearchConfiguration ', data);
      this._SearchService.searchConfiguration$.next(data);
    });
    this._SearchService.results$.subscribe(data => {
      if (data !== null) {
        this.isNoData = false;
      }
    });
    // save search
    this._SearchService.getQuery(this.getQueryRequestBody).subscribe((data) => {
      if (data != null) {
        console.log(data);
        data.forEach(element => {
          this.getQueryValues.push(element);
        });
        console.log(this.getQueryValues);
      } else {
        console.log('no data');
      }
    });
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Sucess' });
  }
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'sorry, please try again !' });
  }
  saveSearch() {
    this.addQueryRequestBody.query_syntax = this.searchValueString;
    console.log(this.addQueryRequestBody);
    this._SearchService.addQuery(this.addQueryRequestBody).subscribe((data) => {
      if (data != null) {
        console.log(data);
        this.showSuccess();
      } else {
        console.log('no data');
        this.showError();
      }
    });
  }
  deleteSearchItem(currentqueryName, currentQueryId) {
    this.deleteRequestBody.id = currentQueryId;
    this._SearchService.deleteQuery(this.deleteRequestBody).subscribe((data) => {
      if (data != null) {
        console.log(data);
        console.log(currentqueryName);
        this.getQueryValues.forEach( (currentElement, index ) => {
          if (currentElement.query_name == currentqueryName) {
            this.getQueryValues.splice(index, 1);
            this.showSuccess();
          }
        });
        console.log(this.getQueryValues);
      }
      else {

        console.log('no data');
        this.showError();

      }
    });
  }

}
