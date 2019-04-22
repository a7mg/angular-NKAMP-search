import { Component, OnInit, ElementRef } from '@angular/core';
import { SearchService } from '../services/search.service';
import {
  Criteria,
  AllCriteriaSearch,
  SearchKeyword
} from '../services/criteriaModel';
import {
  SearchCriteria
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
    // console.log(this.CriteriaSearch);
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
    this._SearchService.getCriteriaDate().subscribe(Data => {
      console.log('data=', Data);
      Data.DataSources.forEach(element => {
        this.DataSources.push(element);
      });
      // Data.MaterialTypes.forEach(element => {
      //   this.ContainsData.push(element);
      // });
      Data.FacetFields.forEach(element => {
        this.AllFields.push(element);
      });

      Data.SearchKeyWords.forEach(element => {
        this.searchKeyword.push(element);
      });

    });
  }

  onSubmit() {
    this.setSearchObject();
    console.log('alldata', this.criteriaForm.value);
    // console.log("currentCreteriaForms", currentCreteriaForms)
    // this. createFormdynamic();
    this.getResults();
  }

  getResults() {

    this._SearchService.getResults({}).subscribe((data) => {
      console.log('search results : ', data);
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
      Feild: [null],
      contain: [{ value: null, disabled: true }],
      Seachtext: ['', Validators.required],
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
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      console.log('abstractControl ', abstractControl.value);
      if (abstractControl instanceof FormControl) {
        if (key === 'dataSource') {
          if (abstractControl.value.eName === null) {
            this.DataSources.forEach((data) => {
              this.CriteriaSearch.dataSourcesId = [
                'dataSources1',
                'dataSources2'
              ];
              // this.CriteriaSearch.dataSourcesId.push(data);
            });
          } else {

            this.CriteriaSearch.dataSourcesId.push(abstractControl.value.eName);
          }
        } else {
          if (key === 'Seachtext') {
            this.AllCriteriaSearch.SeachText = abstractControl.value;
          } else if (key === 'contain') {
            this.AllCriteriaSearch.containes = abstractControl.value.eName;
          } else {
            this.AllCriteriaSearch.field = abstractControl.value.eName;
          }
        }
      }

      // if (abstractControl instanceof FormGroup) {
      //   this.setSearchObject(abstractControl);
      // }

      // if (abstractControl instanceof FormArray) {
      //   for (const control of abstractControl.controls) {
      //     if (control instanceof FormGroup) {
      //       this.AllCriteriaSearch = {} as AllCriteriaSearch;
      //       this.setSearchObject(control);
      //       this.CriteriaSearch.search.push(this.AllCriteriaSearch);
      //     }
      //   }
      // }
    });
  }

  onChange(indexControll: any, controlValue): void {
    // const currentCreteriaForms = this.criteriaForm.get('searchadd') as FormArray;
    // const controll = currentCreteriaForms.at(indexControll) as FormGroup;
    // const containControl = controll.controls.contain as FormControl;
    // const searchKeyId: string = controlValue.split(':')[1];
    // if (searchKeyId.trim() !== null) {
    //   containControl.enable();

    // } else {
    //   containControl.disable();
    // }
    // console.log('currentCreteriaForms', containControl);


  }

  getContainsData(indexControll) {
    const currentCreteriaForms = this.criteriaForm.get('searchadd') as FormArray;
    const controll = currentCreteriaForms.at(indexControll) as FormGroup;
    const FeildControl = controll.controls.Feild as FormControl;
    const containControl = controll.controls.contain as FormControl;
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
