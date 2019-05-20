import { Component, OnInit, ElementRef, ɵConsole } from '@angular/core';
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
  savedCriteria = {
    dataSourcesId: [
      '0B438369-C0DA-4A32-8C6F-103AB6FEADD2',
      'A641F684-00F6-4988-A052-B2FEFAB171C7',
      'A641F684-00F6-4988-A052-B2FEFAB171C9'
    ],
    searchKeyWords: [
      {
        searchKeyWordId: '1909145C-117E-48F3-9F5A-B699D011C619',
        materialTypeId: '',
        keyWordValue: 'ddddddddddd',
        searchOperationId: 'E58FB0BC-744C-4136-A4CE-A9A3736914FE',
        nextSearchKeyWordWithAnd: true
      },
      {
        searchKeyWordId: 'E57FA2D0-921D-4E43-8487-DCEEDBB225F6',
        materialTypeId: '',
        keyWordValue: 'search test 2',
        searchOperationId: 'AAD2C592-DC0D-4ED5-A5C7-6F0259C0498B',
        nextSearchKeyWordWithAnd: false
      },
      {
        searchKeyWordId: 'AA06F8E1-BF2C-42F6-8C01-AD6F0BF60E50',
        materialTypeId: '',
        keyWordValue: 'search test 3',
        searchOperationId: '',
        nextSearchKeyWordWithAnd: true
      }
    ],
    pageSize: 12,
    searchProfileId: '1111-1111-1111-1111'
  };

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
    private $searchService: SearchService,
    private $globalsService: GlobalsService,
    private fb: FormBuilder
  ) {
    this.lang = this.$globalsService.UILanguage;
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
    this.getSavedCriteria();
  }

  getAllDataCriteria() {
    this.$searchService.searchConfiguration$.subscribe(data => {
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
    this.$searchService.currentCriteria$.next(this.CriteriaSearch);
    this.CriteriaSearch.pageSize = this.pageSize;
    this.CriteriaSearch.searchProfileId = this.searchProfileId;
    this.$searchService.getResults(this.CriteriaSearch).subscribe((data) => {
      this.$searchService.results$.next(data);
    });
  }


  // ---------------------------------------------------------------------------------------------------------------------------------- //

  createFormdynamic() {
    this.criteriaForm = this.fb.group({
      dataSourceFC: [null],
      searchadd: this.fb.array([this.addSearchFormGroup()])
    });
  }

  addSearchFormGroup(defalutValues = {
    operator: 'AND',
    facet: null,
    operation: null,
    text: ''
  }) {
    return this.fb.group({
      operator: [defalutValues.operator],
      facetFC: [defalutValues.facet],
      searchOperationFC: [{ value: defalutValues.operation, disabled: true }],
      searchTextFC: [defalutValues.text, Validators.required],
    });
  }

  addSearchButtonClick(): void {
    // if (
    //   (this.criteriaForm.get('searchadd') as FormArray).length <
    //   this.DataSources.length
    // ) {
    //   (this.criteriaForm.get('searchadd') as FormArray).push(this.addSearchFormGroup());
    // }
    (this.criteriaForm.get('searchadd') as FormArray).push(this.addSearchFormGroup()); // delete this line
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
        abstractControl.controls.forEach((control, controlIdx) => {

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

  getSavedCriteria() {
    const currentCreteriaForms = this.criteriaForm.get('searchadd') as FormArray;
    console.log('currentCreteriaForms', currentCreteriaForms.length);
    const mainForm = currentCreteriaForms.at(0) as FormGroup;
    console.log('mainForm', mainForm);
    // const FeildControl = controll.controls.facetFC as FormControl;
    // const containControl = controll.controls.searchOperationFC as FormControl;
    if (this.savedCriteria != null) {
      if (this.savedCriteria.dataSourcesId.length > 1) {

      }
    }



  }


}
