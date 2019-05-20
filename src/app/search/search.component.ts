import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SearchService } from './services/search.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [MessageService]
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('formEle') formElement : NgForm;
  unSubscribeCurrentCriteria =new Subscription();
  isLoading = false;
  favoriteBadge = 55;
  isNoData = true;
  clicked= false;
  userId = 'hager1';
  addQueryRequestBody = {
    query_syntax: "",
    query_name: '',
    anonymous: false,
    id: 'rnPb4mkBBsIQctp5jb6r',
    userId: "",
    email: 'abdfg@xyz.com'
  };
  getQueryValues = [];
  deleteRequestBody = {
    _id: ''
  };
  constructor(private _SearchService: SearchService, private messageService: MessageService) { }

  ngOnInit() {
    this.unSubscribeCurrentCriteria = this._SearchService.currentCriteria$.subscribe((Data)=>{
      this.addQueryRequestBody.userId= this.userId;
      if(Data !== null){
        console.log(JSON.stringify(Data));
        this.addQueryRequestBody.query_syntax =  JSON.stringify(Data);
        console.log('this is cira data', this.addQueryRequestBody);
      }else{
        console.log('no data');
      }
       
    });

    const searchProfile = { SearchProfile_id: 'FFB6CD68-BED4-4B5D-897D-89D205734B0E' };
    this._SearchService.getSearchConfiguration(searchProfile).subscribe(data => {
      // console.log('getSearchConfiguration ', data);
      this._SearchService.searchConfiguration$.next(data);
    });
    this._SearchService.results$.subscribe(data => {
      if (data !== null) {
        this.isNoData = false;
      }
    });
    // save search
    this._SearchService.getQuery({userId: this.userId}).subscribe((data) => {
      if (data != null) {
        // console.log(data);
        data.forEach(element => {
          this.getQueryValues.push(element);
        });
        // console.log(this.getQueryValues);
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
    // this.addQueryRequestBody.query_syntax = this.searchValueString;
    this.ToggleClass();
    console.log(this.addQueryRequestBody);
    this._SearchService.addQuery(this.addQueryRequestBody).subscribe((data) => {
      if (data != null) {
        console.log(data);
      } else {
        console.log('no data');
      }
    });
  }
  ToggleClass(){
    this.clicked = !this.clicked;
    this.formElement.reset();
  }
  getSaveSearchInput(){
    if (this.formElement.value.savedSearchInput) {
     this.addQueryRequestBody.query_name = this.formElement.value.savedSearchInput;
     console.log(" new data",this.addQueryRequestBody);
     this.ToggleClass();
     this.showSuccess();
    }else{
      console.log('no data');
    }
  }
  deleteSearchItem(currentqueryName, currentQueryId) {
    this.deleteRequestBody._id = currentQueryId;
    console.log(currentqueryName);
    console.log(currentQueryId);
    console.log(this.deleteRequestBody);
    this._SearchService.deleteQuery(this.deleteRequestBody).subscribe((data) => {
      if (data.Msg == "Query successfully removed") {
        this.getQueryValues.forEach( (currentElement, index ) => {
          if (currentElement.query_name == currentqueryName) {
            this.getQueryValues.splice(index, 1);
          }
        });
        this.showSuccess();
        // console.log(this.getQueryValues);
      }
      else {

        console.log('no data');
        this.showError();

      }
    });
  }
  ngOnDestroy(){
    this.unSubscribeCurrentCriteria.unsubscribe();
  }

}
