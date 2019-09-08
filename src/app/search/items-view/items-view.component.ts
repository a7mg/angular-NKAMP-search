import { Component, OnInit} from '@angular/core';
import { SearchService } from '../services/search.service';
import { GlobalsService } from 'src/app/NKAMP-Search-shared/services/globals.service';
import { ContentChild } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { SearchCriteria } from '../services/SearchCriteria.Model';
@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.scss']
})


export class ItemsViewComponent implements OnInit {
  @ContentChild(NgbPagination) pagination: NgbPagination;

  lang: string;
  genralLoclaizaion = {
    en: 'general',
    ar: 'الكل',
    fr: 'général'
  };
  CriteriaSearch: SearchCriteria;
  pageSize = 12;
  generalTXT: string;
  pageIndex = 1;
  displayMode = 1;
  itemsArr: Array<any>;
  collectionSizeT: any;
  searchKeywords: Array<any>;
  materialTypes: Array<any>;
  materialTypesConfiguration: Array<any>;
  constructor(private $searchService: SearchService, private $globalsService: GlobalsService) {
    this.lang = this.$globalsService.UILanguage;
    this.generalTXT =  this.genralLoclaizaion.en;
    this.generalTXT =  this.lang === 'ar' || this.lang === 'ar-SA'  ?  this.genralLoclaizaion.ar : this.generalTXT;
    this.generalTXT = this.lang === 'fr'  ?  this.genralLoclaizaion.fr : this.generalTXT;
    this.searchKeywords = [];
    this.itemsArr = [];
    this.materialTypes = [];
    this.materialTypesConfiguration = [];
  }

  // getPageFromService() {
  // }

  ngOnInit() {
    this.$searchService.searchConfiguration$.subscribe(data => {
      if (data !== null) {

        data.SearchKeywords.forEach(element => {
          this.searchKeywords.push(element);
        });

        data.MaterialTypes.forEach(element => {
          this.materialTypesConfiguration.push(element);
        });
      }
    });


    this.$searchService.results$.subscribe(data => {
      this.materialTypes = [];
      this.itemsArr = [];
       console.log('SearchService Results222222 ' + data);
      if (data !== null) {
        // getPageFromService() {

        // }
        /*data.items[0].forEach(element => {
          this.itemsArr.push(element.Item);
        });*/
        this.itemsArr =  data.items[0];

        console.log("^^^ Search res " + JSON.stringify(this.itemsArr));

        console.log('this.itemsArr222222 ', this.itemsArr[0]);
        this.collectionSizeT= Math.round(data.totalNumberOfItems);
        console.log("ttttttttt",data.totalNumberOfItems);
        console.log(this.collectionSizeT);
        const materialTypesResults = data.materialTypesSearcQueryStatistic;
        materialTypesResults.forEach(value => {
          const selectedMatrial = this.materialTypesConfiguration.find((materialType, idx) => {
            return value.id === materialType.Id;
          });
          selectedMatrial.totalItems = value.totalItems;
          this.materialTypes.push(selectedMatrial);
        });
      }

    });
  }

  paginate(pageNumber): void {
    console.log('Page Number', pageNumber);
    this.$searchService.nextPageCriteria.wantedPage = pageNumber - 1;
    console.log("** baqer ** " + JSON.stringify(this.$searchService.nextPageCriteria));
    this.getNextPageResults();
  }
  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }

  onChangeSort(searchKeywordId): void {
    console.log('searchKeywordId ', searchKeywordId.target.value);
    this.$searchService.nextPageCriteria.keywWordsOrderBy = searchKeywordId.target.value;
    this.$searchService.nextPageCriteria.wantedPage = 1;
    // this.getNextPageResults();
  }

  onChangePageSize(pageSize): void {
    console.log('pageSize num ', pageSize.target.value);
    this.$searchService.nextPageCriteria.pageSize = pageSize.target.value;
    this.getNextPageResults();
  }

  getNextPageResults(): void {
    this.$searchService.getResults(this.CriteriaSearch).subscribe(data => {
      this.$searchService.results$.next(data);
    });
  }

  exampleParent($event) {
    console.log('FAv OutPut :', $event);
  }

}
