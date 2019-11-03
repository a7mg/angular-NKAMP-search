import { Component, OnInit } from '@angular/core';
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
  clicked = false;
  dropClicked = false;
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
    this.generalTXT = this.genralLoclaizaion.en;
    this.generalTXT = this.lang === 'ar' || this.lang === 'ar-SA' ? this.genralLoclaizaion.ar : this.generalTXT;
    this.generalTXT = this.lang === 'fr' ? this.genralLoclaizaion.fr : this.generalTXT;
    this.searchKeywords = [];
    this.itemsArr = [];
    this.materialTypes = [];
    this.materialTypesConfiguration = [];
  }

  ngOnInit() {
    this.$searchService.searchConfiguration$.subscribe(data => {
      if (data !== null) {
        this.searchKeywords = data.SearchKeywords;
        this.materialTypesConfiguration = data.MaterialTypes;
        // data.SearchKeywords.forEach(element => {
        //   this.searchKeywords.push(element);
        // });
        // data.MaterialTypes.forEach(element => {
        //   this.materialTypesConfiguration.push(element);
        // });
      }
    });

    this.$searchService.results$.subscribe(data => {
      console.log(data);

      this.materialTypes = [];
      this.itemsArr = [];
      if (data !== null) {
        this.itemsArr = data.items[0];
        this.collectionSizeT = Math.round(data.totalNumberOfItems);
        const materialTypesResults = data.materialTypesSearcQueryStatistic.MaterialType;
        materialTypesResults.forEach(value => {
          const selectedMatrial = this.materialTypesConfiguration.find(materialType => value.id === materialType.NameAr);

          // materialTypesResults.forEach(value => {
          //   const selectedMatrial = this.materialTypesConfiguration.find((materialType, idx) => {
          //     return value.id === materialType.Id;
          //   });
          //   // selectedMatrial.totalItems = value.totalItems;
          //   // this.materialTypes.push(selectedMatrial);
          // });
        });
      }
    });
  }

  paginate(pageNumber): void {
    this.$searchService.nextPageCriteria.wantedPage = pageNumber - 1;
    this.getNextPageResults();
  }

  onDisplayModeChange(mode: number): void {
    this.displayMode = mode;
  }

  onChangeSort(searchKeywordId): void {
    this.$searchService.nextPageCriteria.keywWordsOrderBy = searchKeywordId.target.value;
    this.$searchService.nextPageCriteria.wantedPage = 1;
  }

  onChangePageSize(pageSize): void {
    this.$searchService.nextPageCriteria.pageSize = pageSize.target.value;
    this.getNextPageResults();
  }

  getNextPageResults(): void {
    this.$searchService.getResults(this.CriteriaSearch).subscribe(data => {
      this.$searchService.results$.next(data);
    });
  }

  ToggleOpenClass() {
    this.clicked = !this.clicked;
    this.$searchService.btnClicked$.next(this.clicked);
  }

  ToggledropClass() {
    this.dropClicked = !this.dropClicked;
  }
}
