import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Criteria, AllCriteriaSearch, SearchKeyword } from '../services/criteriaModel';
import { SearchCriteria, SearchKeyWordDetails } from '../services/SearchCriteria.Model';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { GlobalsService } from 'src/app/NKAMP-Search-shared/services/globals.service';
import { EventEmitterService } from '../services/event-emitter.service';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss']
})
export class CriteriaComponent implements OnInit {
  criteriaForm: FormGroup;
  pageSize = 12;
  isAdvanced = false;
  DataSources: Criteria[];
  myOperations: Criteria[];
  AllFields: Criteria[];
  ContainsData: Criteria[];
  CriteriaSearch: SearchCriteria;
  AllCriteriaSearch: AllCriteriaSearch;
  lang: string;
  searchKeyword: SearchKeyword[];
  // isActive = false;
  keywords = [];
  kw = '';
  isShown = true;

  constructor(private $searchService: SearchService, private $globalsService: GlobalsService,
              private $eventEmitterService: EventEmitterService, private fb: FormBuilder) {
    this.lang = this.$globalsService.UILanguage;
    this.inisalizeCriteriaobject();
    this.DataSources = [];
    this.AllFields = [];
    this.ContainsData = [];
    this.searchKeyword = [];
  }

  ngOnInit() {
    this.createFormdynamic();
    this.getAllDataCriteria();
    // make getsaved function accessable to infoke from another component
    if (this.$eventEmitterService.subsVar === undefined) {
      this.$eventEmitterService.subsVar = this.$eventEmitterService.invokeSavedSearchFunction.subscribe((data) => {
        this.getSavedSearch(data);
      });
    }
    // END
  }

  getAllDataCriteria() {
    this.$searchService.searchConfiguration$.subscribe(data => {
      if (data != null) {
        this.DataSources = data.DataSources;
        this.AllFields = data.FacetFields;
        this.searchKeyword = data.SearchKeywords;
        // data.DataSources.forEach(element => {
        //   this.DataSources.push(element);
        // });

        // data.FacetFields.forEach(element => {
        //   this.AllFields.push(element);
        // });

        // data.SearchKeywords.forEach(element => {
        //   this.searchKeyword.push(element);
        // });
      }
    });

  }

  onSubmit() {
    this.setSearchObject();
    this.$searchService.currentCriteria$.next(this.CriteriaSearch);
    this.CriteriaSearch.pageSize = this.pageSize;
    this.CriteriaSearch.wantedPage = 0;
    this.CriteriaSearch.searchProfileId = this.$searchService.userProfile.searchProfile_id;
    this.$searchService.searchCriteria = this.CriteriaSearch;
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
      searchOperationFC: [{ value: defalutValues.operation, disabled: false }],
      searchTextFC: [defalutValues.text, Validators.required],
    });
  }

  addSearchButtonClick(): void {
    if (
      (this.criteriaForm.get('searchadd') as FormArray).length <
      this.searchKeyword.length
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
    this.CriteriaSearch.dataSourcesId = [];
  }

  setSearchObject(group: FormGroup = this.criteriaForm): void {
    this.CriteriaSearch.dataSourcesId = [];
    this.CriteriaSearch.searchKeyWords = [];
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormControl) {
        if (key === 'dataSourceFC') {
          if (abstractControl.value === null) {
            this.CriteriaSearch.dataSourcesId = [];
            this.DataSources.forEach((data) => {
              this.CriteriaSearch.dataSourcesId.push(data.id);
            });
          } else {
            this.CriteriaSearch.dataSourcesId.push(abstractControl.value);
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
              materialTypeId: 'f1b94474-82df-4e46-b1df-4cbb61aaee85',
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

  /*getContainsData(indexControll) {
    const currentCreteriaForms = this.criteriaForm.get('searchadd') as FormArray;
    const controll = currentCreteriaForms.at(indexControll) as FormGroup;
    const FeildControl = controll.controls.facetFC as FormControl;
    const containControl = controll.controls.searchOperationFC as FormControl;
    if (FeildControl.value !== null) {
      containControl.enable();
      const selectedFacetObj = this.searchKeyword.filter((value, idx) => {
        return value.id === FeildControl.value;
      });
     // return [...selectedFacetObj[0].allowedSearchOperations];
     return [...selectedFacetObj];
    } else {
      containControl.disable();
      return [];
    }

  }*/
  onClickChangeToSimpleSearch() {
    this.isAdvanced = false;
    const currentCreteriaForms = this.criteriaForm.get('searchadd') as FormArray;
    currentCreteriaForms.controls.length = 1;
  }

  getSavedSearch(savedCriteriaObj) {
    if (savedCriteriaObj != null) {
      // const dataSourceFC = this.criteriaForm.get('dataSourceFC') as FormControl;
      if (savedCriteriaObj.dataSourcesId.length === 1) {
        this.criteriaForm.patchValue({ dataSourceFC: savedCriteriaObj.dataSourcesId[0] });
      }
      const currentCreteriaForms = this.criteriaForm.get('searchadd') as FormArray;
      currentCreteriaForms.controls = [];
      if (savedCriteriaObj.searchKeyWords.length > 1) { this.isAdvanced = true; } else { this.isAdvanced = false; }
      savedCriteriaObj.searchKeyWords.forEach((row, idx) => {
        this.addSearchButtonClick();
        const abstractControl = currentCreteriaForms.controls[idx];
        // const { facetFC, searchTextFC, searchOperationFC, operator } = abstractControl.controls;
        abstractControl.patchValue({
          facetFC: row.searchKeyWordId,
          searchTextFC: row.keyWordValue,
          searchOperationFC: row.searchOperationId,
          operator: (row.nextSearchKeyWordWithAnd ? 'AND' : 'OR')
        });
      });

      this.onSubmit();
    }

  }

  onItemChange(event, searchKeyword) {
    const kwId = event.target.value;
    const id = kwId.slice(3, kwId.length);
    const kwItem = searchKeyword.filter(x => x.id === id);
    /*kwItem[0].AllowedSearchOperations.AllowedSearchOperation.forEach(element => {
      this.myOperations.push(element);
    });*/
    this.myOperations = kwItem[0].AllowedSearchOperations.AllowedSearchOperation;
    /*if (this.myOperations.length > 0) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }*/
  }


}
