import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Criteria, CriteriaSearch } from '../services/criteriaModel';
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
 // searchadd:FormArray

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

  onSubmit(CriteriaSearch:CriteriaSearch){
console.log(CriteriaSearch)
  }


  createFormControls() {

    (this.contain =new FormControl("") ),
    (this.Seachtext = new FormControl("", Validators.required)),
      (this.general = new FormControl("")),
      (this.Feild = new FormControl(""));
  
  }
  // ---------------------------------------------------------------------------------------------------------------------------------- //
  // createForm() {
  //   this.criteriaForm = new FormGroup({
  //     contain: new FormControl(""),
  //    // searchadd:this.criteriaForm.array
  //     Seachtext: new FormControl("", Validators.required),
  //     general: new FormControl(""),
  //     Feild: new FormControl(""),
  //   });
  // }

  createFormdynamic() {
    this.criteriaForm =  this.fb.group({
      general: [''],
    searchadd:  this.fb.array([
      this.addSearchFormGroup()
    ])
     
    });
  }


  addSearchFormGroup(){
    return this.fb.group({
      Seachtext:  ['', Validators.required],
      contain:  [''],
    Feild: [''],
    });
   
  }

  addSearchButtonClick(): void {
    (<FormArray>this.criteriaForm.get('searchadd')).push(this.addSearchFormGroup());
  }


  inisalizeCriteriaobject(){
    this.CriteriaSearch=<CriteriaSearch>{};
    this.CriteriaSearch.SeachText="";
    this.CriteriaSearch.containes=null;
    this.CriteriaSearch.field=null;
    this.CriteriaSearch.general=null;
  }


}
