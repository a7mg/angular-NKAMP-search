import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Criteria, CriteriaSearch, AllCriteriaSearch } from '../services/criteriaModel';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { GlobalsService } from 'src/app/Naseej-shared/services/globals.service';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss']
})
export class CriteriaComponent implements OnInit {
  favoriteBadge = 55;
  isAdvanced = false;
  GeneralData:Criteria[];
  AllFields:Criteria[];
  ContainsData:Criteria[];
  CriteriaSearch:CriteriaSearch;
  criteriaForm: FormGroup;
  general: FormControl;
  Feild: FormControl;
  contain: FormControl;
  Seachtext: FormControl;
  lang:string
  AllCriteriaSearch:AllCriteriaSearch

  constructor(private _SearchService:SearchService,private _GlobalsService:GlobalsService,private fb: FormBuilder) {
    this.lang=this._GlobalsService.UILanguage;
    this.inisalizeCriteriaobject();
   console.log(this.CriteriaSearch)
    this.GeneralData=[];
    this.AllFields=[];
    this.ContainsData=[];

   }

  ngOnInit() {
   // this.createFormControls();
    this.createFormdynamic();
    this. getAllDataCriteria();
  }


  getAllDataCriteria(){
    this._SearchService.getCriteriaDate().subscribe(Data=>{
      console.log('data=',Data);
      Data.dataSources.forEach(element => {
      this.GeneralData.push(element);
      });
      Data.materialTypes.forEach(element => {
        this.ContainsData.push(element);
        });
        Data.facetFields.forEach(element => {
          this.AllFields.push(element);
          });
    })
  }

  onSubmit(){
    this.logValidationErrors()
    console.log('alldata',   this.CriteriaSearch)
//this. createFormdynamic();
  }


  createFormControls() {
    (this.contain =new FormControl("") ),
    (this.Seachtext = new FormControl("", Validators.required)),
      (this.general = new FormControl("")),
      (this.Feild = new FormControl(""));
  }
  // ---------------------------------------------------------------------------------------------------------------------------------- //
 
  createFormdynamic() {
    this.criteriaForm =  this.fb.group({
      general: [null],
    searchadd:  this.fb.array([
      this.addSearchFormGroup()
    ])
     
    });
  }
  addSearchFormGroup(){
    return this.fb.group({
      Seachtext:  ['', Validators.required],
      contain:  [null],
    Feild: [null],
    });
  }
  addSearchButtonClick(): void {
    if((<FormArray>this.criteriaForm.get('searchadd')).length < this.GeneralData.length){
      (<FormArray>this.criteriaForm.get('searchadd')).push(this.addSearchFormGroup());
    }
  }
  inisalizeCriteriaobject(){
    this.CriteriaSearch=<CriteriaSearch>{};
    this.CriteriaSearch.search=[];
    this.CriteriaSearch.general=null;
  }



  logValidationErrors(group: FormGroup = this.criteriaForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormControl ) {
        if(key == 'general'){
          this.CriteriaSearch.general=abstractControl.value.eName
        }else{
         if(key =='Seachtext'){
        this.  AllCriteriaSearch.SeachText=abstractControl.value;
         }else if(key =='contain'){
          this. AllCriteriaSearch.containes=abstractControl.value.eName;
         }else{
          this. AllCriteriaSearch.field=abstractControl.value.eName;
         }
        }

      }
  
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }

      if (abstractControl instanceof FormArray) {
        for (const control of abstractControl.controls) {
          if (control instanceof FormGroup) {
            this. AllCriteriaSearch=<AllCriteriaSearch>{}
            this.logValidationErrors(control);
            this.CriteriaSearch.search.push(this.AllCriteriaSearch);
          }
        }
      }
   
    });
   
  }


}
