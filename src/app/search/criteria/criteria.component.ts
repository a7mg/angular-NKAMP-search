import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Criteria, CriteriaSearch } from '../services/criteriaModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(private _SearchService:SearchService) {
    this.inisalizeCriteriaobject();
   console.log(this.CriteriaSearch)
    this.GeneralData=[];
    this.AllFields=[];
    this.ContainsData=[];

   }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
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

    (this.contain = new FormControl("")),
    (this.Seachtext = new FormControl("", Validators.required)),
      (this.general = new FormControl("")),
      (this.Feild = new FormControl(""));
  
  }
  // ---------------------------------------------------------------------------------------------------------------------------------- //
  createForm() {
    this.criteriaForm = new FormGroup({
      contain: this.contain,
      Seachtext: this.Seachtext,
      general: this.general,
      Feild: this.Feild,
    });
  }


  inisalizeCriteriaobject(){
    this.CriteriaSearch=<CriteriaSearch>{};
    this.CriteriaSearch.SeachText="";
    this.CriteriaSearch.containes=null;
    this.CriteriaSearch.field=null;
    this.CriteriaSearch.general=null;
  }


}
