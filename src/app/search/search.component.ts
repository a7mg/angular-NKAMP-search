import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SearchService } from './services/search.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { EventEmitterService } from './services/event-emitter.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [MessageService]
})
export class SearchComponent implements OnInit {
  @ViewChild('formEle') formElement: NgForm;
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
    private $messageService: MessageService,
    private $eventEmitterService: EventEmitterService) { }

  ngOnInit() {
    this.addQueryRequestBody.userId = this.$searchService.userProfile.userId;
    this.addQueryRequestBody.email = this.$searchService.userProfile.email;
    this.addQueryRequestBody.anonymous = this.$searchService.userProfile.anonymous;
    this.$searchService.currentCriteria$.subscribe((data) => {

      // console.log('this i data', data);

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
    this.$searchService.getQuery({ userId: this.$searchService.userProfile.userId }).subscribe((data) => {
      // console.log(data);
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

        // console.log(this.getQueryValues);
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
      console.log('addQuery respond', data);
      if (data != null) {
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
        this.getQueryValues.forEach((currentElement, index) => {
          if (currentElement.query_name === currentqueryName) {
            this.getQueryValues.splice(index, 1);
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
