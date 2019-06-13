import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.scss']
})
export class ItemsViewComponent implements OnInit {
  pageIndex = 1;
  itemsArr: Array<any>;
  searchKeywords: Array<any>;
  materialTypes: Array<any>;
  materialTypesConfiguration: Array<any>;
  constructor(private $searchService: SearchService) {
    this.searchKeywords = [];
    this.itemsArr = [];
    this.materialTypes = [];
    this.materialTypesConfiguration = [];
  }

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
      // console.log('SearchService Results ', data);
      if (data !== null) {

        data.items.forEach(element => {
          this.itemsArr.push(element);
        });

        const materialTypesResults = data.materialTypesSearcQueryStatistic;
        materialTypesResults.forEach(value => {
          const selectedMatrial = this.materialTypesConfiguration.find((materialType, idx) => {
            return value.id === materialType.Id;
          });
          selectedMatrial.totalItems = value.totalItems;
          this.materialTypes.push(selectedMatrial);
        });

        // console.log('  this.itemsArr', this.itemsArr);
        // console.log('  this.materialTypes', this.materialTypes);
      }
    });
  }

  paginate(pageNumber): void {
    console.log('Page Number', pageNumber);
    this.$searchService.nextPageCriteria.wantedPage = pageNumber;
    this.getNextPageResults();
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
    this.$searchService.getNextPage().subscribe((data) => {
      // console.log('GetNextPageResult', data.items );
      data.materialTypesSearcQueryStatistic = [
        {
          id: 'A1F06400-EC3C-4ACE-8960-2372C13BDCCE',
          totalItems: 88
        },
        {
          id: '22ECBCF3-E955-4B9D-8128-37B49FC57874',
          totalItems: 100
        }
      ];
      data.facetsSearchQueryStatistic = [
        {
          id: 'DF6C3D06-B99B-4D80-AB25-22B7B638FC81',
          facetValue: 'FacetValue1',
          totalItems: 55
        },
        {
          id: 'DF6C3D06-B99B-4D80-AB25-22B7B638FC81',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: 'DF6C3D06-B99B-4D80-AB25-22B7B638FC81',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: 'DF6C3D06-B99B-4D80-AB25-22B7B638FC81',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: 'DF6C3D06-B99B-4D80-AB25-22B7B638FC81',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: 'DF6C3D06-B99B-4D80-AB25-22B7B638FC81',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: 'E57FA2D0-921D-4E43-8487-DCEEDBB225F6',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: 'E57FA2D0-921D-4E43-8487-DCEEDBB225F6',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: 'E57FA2D0-921D-4E43-8487-DCEEDBB225F6',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: 'E57FA2D0-921D-4E43-8487-DCEEDBB225F6',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: 'E57FA2D0-921D-4E43-8487-DCEEDBB225F6',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: 'E57FA2D0-921D-4E43-8487-DCEEDBB225F6',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: 'E57FA2D0-921D-4E43-8487-DCEEDBB225F6',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: 'E57FA2D0-921D-4E43-8487-DCEEDBB225F6',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: 'E57FA2D0-921D-4E43-8487-DCEEDBB225F6',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: 'C634D35F-CDB6-451A-B481-4771B3C81638',
          facetValue: 'FacetValue',
          totalItems: 100
        },
        {
          id: 'C634D35F-CDB6-451A-B481-4771B3C81638',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: 'C634D35F-CDB6-451A-B481-4771B3C81638',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: 'C634D35F-CDB6-451A-B481-4771B3C81638',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: 'C634D35F-CDB6-451A-B481-4771B3C81638',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: '94D2DB6B-64DE-499C-8C82-FC6D079B1273',
          facetValue: 'FacetValue',
          totalItems: 100
        },
        {
          id: '94D2DB6B-64DE-499C-8C82-FC6D079B1273',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: '94D2DB6B-64DE-499C-8C82-FC6D079B1273',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: '94D2DB6B-64DE-499C-8C82-FC6D079B1273',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: '94D2DB6B-64DE-499C-8C82-FC6D079B1273',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: '1909145C-117E-48F3-9F5A-B699D011C619',
          facetValue: 'FacetValue',
          totalItems: 100
        },
        {
          id: '1909145C-117E-48F3-9F5A-B699D011C619',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: '1909145C-117E-48F3-9F5A-B699D011C619',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: '1909145C-117E-48F3-9F5A-B699D011C619',
          facetValue: 'FacetValue2',
          totalItems: 100
        },
        {
          id: '1909145C-117E-48F3-9F5A-B699D011C619',
          facetValue: 'FacetValue2',
          totalItems: 100
        }
      ];
      data.items = [
        {
          addtionFieldsInListPage: [
            {
              id: 'id1',
              aName: 'AName1',
              eName: 'EName1',
              fName: 'FName1',
              fieldOrderPage: 1,
              inputHtmlTypeName: 'text',
              insertedData: 'InsertedData1'
            },
            {
              id: 'id2',
              aName: 'AName2',
              eName: 'EName2',
              fName: 'FName2',
              fieldOrderPage: 2,
              inputHtmlTypeName: 'text',
              insertedData: 'InsertedData2'
            },
            {
              id: 'id3',
              aName: 'AName3',
              eName: 'EName3',
              fName: 'FName3',
              fieldOrderPage: 3,
              inputHtmlTypeName: 'text',
              insertedData: 'InsertedData3'
            }
          ],
          itemSourceId: 'ItemSourceId1',
          itemSearchId: 'ItemSearchId1',
          dataSourceName: 'DataSourceName1',
          dataSourceId: 'DataSourceId1',
          materialTypeId: '22ECBCF3-E955-4B9D-8128-37B49FC57874',
          materialTypeName: 'MaterialTypeName1',
          title: 'Title1',
          description: 'Description1',
          coverImage: 'https://via.placeholder.com/150'
        },
        {
          addtionFieldsInListPage: [
            {
              id: 'id4',
              aName: 'AName4',
              eName: 'EName4',
              fName: 'FName4',
              fieldOrderPage: 3,
              inputHtmlTypeName: 'text',
              insertedData: 'InsertedData4'
            },
            {
              id: 'id5',
              aName: 'AName5',
              eName: 'EName5',
              fName: 'FName5',
              fieldOrderPage: 2,
              inputHtmlTypeName: 'text',
              insertedData: 'InsertedData5'
            },
            {
              id: 'id6',
              aName: 'AName6',
              eName: 'EName6',
              fName: 'FName6',
              fieldOrderPage: 6,
              inputHtmlTypeName: 'text',
              insertedData: 'InsertedData6'
            }
          ],
          itemSourceId: 'ItemSourceId2',
          itemSearchId: 'ItemSearchId2',
          dataSourceName: 'DataSourceName2',
          dataSourceId: 'DataSourceId2',
          materialTypeId: 'A1F06400-EC3C-4ACE-8960-2372C13BDCCE',
          materialTypeName: 'MaterialTypeName2',
          title: 'Title2',
          description: 'Description2',
          coverImage: 'https://via.placeholder.com/150'
        },
        {
          addtionFieldsInListPage: [
            {
              id: 'id7',
              aName: 'AName7',
              eName: 'EName7',
              fName: 'FName7',
              fieldOrderPage: 7,
              inputHtmlTypeName: 'text',
              insertedData: 'InsertedData7'
            },
            {
              id: 'id8',
              aName: 'AName8',
              eName: 'EName8',
              fName: 'FName8',
              fieldOrderPage: 8,
              inputHtmlTypeName: 'text',
              insertedData: 'InsertedData8'
            },
            {
              id: 'id9',
              aName: 'AName9',
              eName: 'EName9',
              fName: 'FName9',
              fieldOrderPage: 9,
              inputHtmlTypeName: 'text',
              insertedData: 'InsertedData9'
            }
          ],
          itemSourceId: 'ItemSourceId3',
          itemSearchId: 'ItemSearchId3',
          dataSourceName: 'DataSourceName1',
          dataSourceId: 'DataSourceId1',
          materialTypeId: '22ECBCF3-E955-4B9D-8128-37B49FC57874',
          materialTypeName: 'MaterialTypeName1',
          title: 'Title 3',
          description: 'Description3',
          coverImage: 'https://via.placeholder.com/150'
        },
        {
          addtionFieldsInListPage: [
            {
              id: 'id10',
              aName: 'AName10',
              eName: 'EName10',
              fName: 'FName10',
              fieldOrderPage: 10,
              inputHtmlTypeName: 'text',
              insertedData: 'InsertedData10'
            },
            {
              id: 'id11',
              aName: 'AName11',
              eName: 'EName11',
              fName: 'FName11',
              fieldOrderPage: 11,
              inputHtmlTypeName: 'text',
              insertedData: 'InsertedData11'
            },
            {
              id: 'id12',
              aName: 'AName12',
              eName: 'EName12',
              fName: 'FName12',
              fieldOrderPage: 12,
              inputHtmlTypeName: 'text',
              insertedData: 'InsertedData12'
            }
          ],
          itemSourceId: 'ItemSourceId4',
          itemSearchId: 'ItemSearchId4',
          dataSourceName: 'DataSourceName1',
          dataSourceId: 'DataSourceId1',
          materialTypeId: '22ECBCF3-E955-4B9D-8128-37B49FC57874',
          materialTypeName: 'MaterialTypeName1',
          title: 'Title 4',
          description: 'Description4',
          coverImage: 'https://via.placeholder.com/150'
        }
      ];
      this.$searchService.results$.next(data);
    });
  }

}
