import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SearchService } from './services/search.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { EventEmitterService } from './services/event-emitter.service';
import { GlobalsService } from 'src/app/NKAMP-Search-shared/services/globals.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [MessageService]
})
export class SearchComponent implements OnInit {
  @ViewChild('formEle') formElement: NgForm;
  lang: string;
  isLoading = false;
  isSavedSearchDisabled = true;
  favoriteBadge = 55;
  isNoData = true;
  clicked = false;
  blockedDocument = true;
  addQueryRequestBody = {
    query_syntax: '',
    query_name: '',
    anonymous: false,
    id: '',
    userId: '',
    email: ''
  };
  getQueryValues = [];
  deleteRequestBody = {
    _id: ''
  };

  constructor(private $searchService: SearchService,
    private $globalsService: GlobalsService,
    private $messageService: MessageService,
    private $eventEmitterService: EventEmitterService) { 
      this.lang = this.$globalsService.UILanguage;
      console.log("site lang is",this.lang);
    }

  ngOnInit() {
    this.addQueryRequestBody.userId = this.$searchService.userProfile.userId;
    this.addQueryRequestBody.email = this.$searchService.userProfile.email;
    this.addQueryRequestBody.anonymous = this.$searchService.userProfile.anonymous;
    this.$searchService.currentCriteria$.subscribe((data) => {
      if (data !== null) {
        this.isSavedSearchDisabled = false;
        // tslint:disable-next-line: quotemark
        this.addQueryRequestBody.query_syntax = JSON.stringify(data).replace(/"/g, "'");
        // console.log('this is cira data 45', this.addQueryRequestBody);
      } else {
        console.log('no data');
      }
    });
    const searchProfile = { SearchProfile_id: this.$searchService.userProfile.searchProfile_id };
    this.$searchService.getSearchConfiguration(searchProfile).subscribe(data => {
      console.log('getSearchConfiguration ', data);
      this.blockedDocument = false;
      this.$searchService.searchConfiguration$.next(data);
    });

    this.$searchService.results$.subscribe(data => {
      if (data !== null) {
        this.isNoData = false;
      }
    });
    // save search
    this.getquerySavesearch()
  }

  getquerySavesearch(){
    this.getQueryValues=[];
    this.$searchService.getQuery({ userId: this.$searchService.userProfile.userId }).subscribe((data) => {
      console.log("getQuery,getQuery",data);
     if (data != null) {
       if (data.Queries != null) {
         data.Queries.forEach(element => {
           this.getQueryValues.push(element);
         });
       } else {
         data.forEach(element => {
           this.getQueryValues.push(element);
         });
       }

       console.log("getQuery,getQuery222",this.getQueryValues);
     } else {
       console.log('no data');
     }
   });
  }

  showSuccess() {
    this.$messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Sucess' });
  }
  showError() {
    this.$messageService.add({ severity: 'error', summary: 'Error Message', detail: 'sorry, please try again !' });
  }


  ToggleClass() {
    this.clicked = !this.clicked;
    this.formElement.reset();
  }

  getSaveSearchInput() {
    if (this.formElement.value.savedSearchInput) {
      this.addQueryRequestBody.query_name = this.formElement.value.savedSearchInput;
      this.ToggleClass();
      this.showSuccess();
      this.saveSearch();
    } else {
      console.log('no data');
    }
  }

  saveSearch() {
    console.log('this.addQueryRequestBody', this.addQueryRequestBody);
    this.$searchService.addQuery(this.addQueryRequestBody).subscribe((data) => {
      if (data != null) {
        this.getquerySavesearch()
        console.log('addQuery respond', data);
      } else {
        console.log('no data');
      }
    });

  }

  onSavedSearchClicked(savedCriteriaObj: string) {
    savedCriteriaObj = savedCriteriaObj.replace(/'/g, '"');
    this.$eventEmitterService.onSavedSearchClick(JSON.parse(savedCriteriaObj));
  }


  deleteSearchItem(currentqueryName, currentQueryId) {
    this.deleteRequestBody._id = currentQueryId;
    this.$searchService.deleteQuery(this.deleteRequestBody).subscribe((data) => {
      if (data.Msg === 'Query successfully removed') {
        this.getQueryValues[0].forEach((currentElement, index) => {
          if (currentElement.query_name === currentqueryName) {
            this.getQueryValues[0].splice(index, 1);
          }
        });
        this.showSuccess();
        // console.log(this.getQueryValues);
      } else {

        console.log('no data');
        this.showError();

      }
    });
  }


}
