import { Component, OnInit, ElementRef } from '@angular/core';
import { SearchService } from '../services/search.service';
import {
  Criteria,
  AllCriteriaSearch,
  SearchKeyword
} from '../services/criteriaModel';
import {
  SearchCriteria,
  SearchKeyWordDetails
} from '../services/SearchCriteria.Model';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from '@angular/forms';
import { GlobalsService } from 'src/app/Naseej-shared/services/globals.service';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss']
})
export class CriteriaComponent implements OnInit {
  criteriaForm: FormGroup;

  pageSize = 12;
  searchProfileId = '1111-1111-1111-1111';

  isAdvanced = false;
  DataSources: Criteria[];
  AllFields: Criteria[];
  ContainsData: Criteria[];
  CriteriaSearch: SearchCriteria;
  AllCriteriaSearch: AllCriteriaSearch;
  lang: string;
  searchKeyword: SearchKeyword[];
  // showitem: Criteria[];
  // selectFeild: SearchKeyword;

  constructor(
    private _SearchService: SearchService,
    private _GlobalsService: GlobalsService,
    private fb: FormBuilder
  ) {
    this.lang = this._GlobalsService.UILanguage;
    this.inisalizeCriteriaobject();
    this.DataSources = [];
    this.AllFields = [];
    this.ContainsData = [];
    this.searchKeyword = [];
    // this.showitem = [];
    // this.selectFeild = {} as SearchKeyword;
  }

  ngOnInit() {
    this.createFormdynamic();
    this.getAllDataCriteria();
  }

  getAllDataCriteria() {
    this._SearchService.searchConfiguration$.subscribe( data => {
      console.log('getAllDataCriteria => ', data);
      if (data != null) {

        data.DataSources.forEach(element => {
          this.DataSources.push(element);
        });

        // data.MaterialTypes.forEach(element => {
        //   this.ContainsData.push(element);
        // });

        data.FacetFields.forEach(element => {
          this.AllFields.push(element);
        });

        data.SearchKeywords.forEach(element => {
          this.searchKeyword.push(element);
        });

      }
    });
  }

  onSubmit() {
    this.setSearchObject();
    console.log(' finall CriteriaSearch  => ', JSON.stringify(this.CriteriaSearch));
    this._SearchService.currentCriteria$.next(JSON.stringify(this.CriteriaSearch));
    // this. createFormdynamic();
    this.CriteriaSearch.pageSize = this.pageSize;
    this.CriteriaSearch.searchProfileId = this.searchProfileId;
    this._SearchService.getResults(this.CriteriaSearch).subscribe((data) => {
      this._SearchService.results$.next(data)
    });
  }


  // ---------------------------------------------------------------------------------------------------------------------------------- //

  createFormdynamic() {
    this.criteriaForm = this.fb.group({
      dataSourceFC: [null],
      searchadd: this.fb.array([this.addSearchFormGroup()])
    });
  }

  addSearchFormGroup() {
    return this.fb.group({
      operator: ['AND'],
      facetFC: [null],
      searchOperationFC: [{ value: null, disabled: true }],
      searchTextFC: ['', Validators.required],
    });
  }

  addSearchButtonClick(): void {
    if (
      (this.criteriaForm.get('searchadd') as FormArray).length <
      this.DataSources.length
    ) {
      (this.criteriaForm.get('searchadd') as FormArray).push(this.addSearchFormGroup());
    }
  }
  removeCurrentRowClick(selected): void {
    const currentCreteriaForms = this.criteriaForm.get('searchadd') as FormArray;
    currentCreteriaForms.removeAt(selected);

  }

  inisalizeCriteriaobject() {
    this.CriteriaSearch = {} as SearchCriteria;
    // this.CriteriaSearch.search = [];
    this.CriteriaSearch.dataSourcesId = [];
  }

  setSearchObject(group: FormGroup = this.criteriaForm): void {
    this.CriteriaSearch.dataSourcesId = [];
    this.CriteriaSearch.searchKeyWords = [];
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormControl) {
        // console.log('abstractControl  ' + key, abstractControl.value);
        if (key === 'dataSourceFC') {

          if (abstractControl.value === null) {
            this.CriteriaSearch.dataSourcesId = [];
            this.DataSources.forEach((data) => {
              this.CriteriaSearch.dataSourcesId.push(data.id);
            });
          } else {
            this.CriteriaSearch.dataSourcesId.push(abstractControl.value.id);
          }

        }
      }


      if (abstractControl instanceof FormArray) {
        abstractControl.controls.forEach( (control, controlIdx) => {

          if (control instanceof FormGroup) {
            let searchKeyWord = {} as SearchKeyWordDetails;
            const isLast: boolean = controlIdx === abstractControl.controls.length;
            const { facetFC, searchTextFC, searchOperationFC, operator } = control.value;
            searchKeyWord = {
              searchKeyWordId: (facetFC !== null ? facetFC : ''),
              materialTypeId: '',
              keyWordValue: searchTextFC,
              searchOperationId: ((searchOperationFC !== null && searchOperationFC !== undefined) ? searchOperationFC : ''),
              nextSearchKeyWordWithAnd: isLast ? null : ((operator === 'AND' ? true : false)),
            };
            this.CriteriaSearch.searchKeyWords.push(searchKeyWord);

          }

        });
      }

    });
  }

  getContainsData(indexControll) {
    const currentCreteriaForms = this.criteriaForm.get('searchadd') as FormArray;
    const controll = currentCreteriaForms.at(indexControll) as FormGroup;
    const FeildControl = controll.controls.facetFC as FormControl;
    const containControl = controll.controls.searchOperationFC as FormControl;
    if (FeildControl.value !== null) {
      containControl.enable();
      const selectedFacetObj = this.searchKeyword.filter((value, idx) => {
        return value.id === FeildControl.value;
      });
      return [...selectedFacetObj[0].allowedSearchOperations];
    } else {
      containControl.disable();
      return [];
    }

  }


}
