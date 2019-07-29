import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppConfigService } from 'src/app/NKAMP-Search-shared/services/app-config.service';
import { ErrorLoggingService } from 'src/app/Naseej-error-handling/services/error-logging.service';
import { GlobalsService } from 'src/app/NKAMP-Search-shared/services/globals.service';
let httpOptions;
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  Url: string; // = "https://10.0.6.154:8245/Search10/1.0.0/SearchConfiguration";
  public results$ = new BehaviorSubject(null);
  public searchConfiguration$ = new BehaviorSubject(null);
  public currentCriteria$ = new BehaviorSubject(null);
  public currentFacetsConfiguration: Array<any>;
  public userProfile = {
    searchProfile_id: 'FFB6CD68-BED4-4B5D-897D-89D205734B0E',
    anonymous: false,
    userId: 'AhmedElbaz1',
    email: 'AhmedElbaz1@naseej.com'
  };
  public nextPageCriteria = {
    searchProfileId: '',
    pageSize: 12,
    wantedPage: 0,
    dataSourcesId: [],
    searchKeyWords: [],
    facetsFilter: [],
    keywWordsOrderBy: []
  };


  constructor(private http: HttpClient, appConfig: AppConfigService,
              public globals: GlobalsService,
              private errorLogging: ErrorLoggingService) {
    this.Url = appConfig.configdata.apiUrl;
  }

  getSearchConfiguration(bodyRequest): Observable<any> {
    return this.http.post<any>(this.Url + 'SearchConfiguration', bodyRequest).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error: Error) => {
        debugger;
        const errParams: any[] = [];
        errParams.push(`API_URL = ${this.Url}`);
        errParams.push(`UILanguage = ${this.globals.UILanguage}`);
        this.errorLogging.error(
          'SearchConfiguration',
          `${error.name} --> ${error.message} --> ${error.stack}` ||
          `${error.name} --> ${error.message}`,
          errParams
        );
        return of([] as any[]);
      })
    );
  }

  getResults(serachCriteria): Observable<any> {
    httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Credentials, Access-Control-Request-Headers',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        
      })
    };
  console.log('serachCriteria',serachCriteria);
  const body={
    "searchProfileId": "ffb6cd68-bed4-4b5d-897d-89d205734b0e",
    "pageSize": 10,
    "fromPage": 0,
    "dataSourcesId": [
    	"0B438369-C0DA-4A32-8C6F-103AB6FEADD1"
    ],
    "searchKeyWords": [
      {
        "searchKeyWordId": "e57fa2d0-921d-4e43-8487-dceedbb225f6",
        "materialTypeId": "b3f94d14-6f70-426f-b0b8-df77860dc4df",
        "keyWordValue": "عنوان",
        "searchOperationId": "aad2c592-dc0d-4ed5-a5c7-6f0259c0498b",
        "nextSearchKeyWordWithAnd": true
      },
      {
        "searchKeyWordId": "1909145c-117e-48f3-9f5a-b699d011c618",
        "materialTypeId": "ffc1d986-71c8-4bdd-9b15-87239ecf6690",
        "keyWordValue": "محمد",
        "searchOperationId": "aad2c592-dc0d-4ed5-a5c7-6f0259c0498b",
        "nextSearchKeyWordWithAnd": true
      }
      , {
        "searchKeyWordId": "df6c3d06-b99b-4d80-ab25-22b7b638fc81",
        "materialTypeId": "ffc1d986-71c8-4bdd-9b15-87239ecf6690",
        "keyWordValue": "2020",
        "searchOperationId": "B7C92AE0-E842-456C-B23C-66347CCDB752",
        "nextSearchKeyWordWithAnd": false
      }
    ],
    "facetsFilter": [
      
    ],
    "keywWordsOrderBy": [
      {
        "keywWordId": "df6c3d06-b99b-4d80-ab25-22b7b638fc81",
        "keywWordType": "4",
        "keywWordValue": "value",
        "isAcendening": true
      }
    ]
  }
    return this.http.post<any>('http://10.0.6.146:8280/make_new_search/MakeNewSearch', body,httpOptions).pipe(
      map((data: any) => {
        console.log("Result search ",data)
        return data;
      }), catchError((error: Error) => {
        const errParams: any[] = [];
        errParams.push(`API_URL = ${this.Url}`);
        errParams.push(`UILanguage = ${this.globals.UILanguage}`);
        this.errorLogging.error(
          'MakeNewSearch',
          `${error.name} --> ${error.message} --> ${error.stack}` ||
          `${error.name} --> ${error.message}`,
          errParams
        );
        return of([] as any[]);
      })
    );
  }

  getNextPage(): Observable<any> {
    console.log('GetNextPageResult');
    this.nextPageCriteria.searchProfileId = this.userProfile.searchProfile_id;
    return this.http.post<any>(this.Url + 'GetNextPageResult', this.nextPageCriteria ).pipe(
      map((data: any) => {
        return data;
      }), catchError((error: Error) => {
        const errParams: any[] = [];
        errParams.push(`API_URL = ${this.Url}`);
        errParams.push(`UILanguage = ${this.globals.UILanguage}`);
        this.errorLogging.error(
          'GetNextPageResult',
          `${error.name} --> ${error.message} --> ${error.stack}` ||
          `${error.name} --> ${error.message}`,
          errParams
        );
        return of([] as any[]);
      })
    );
  }

  addQuery(saveSerachCriteria): Observable<any> {
    return this.http.post<any>(this.Url + 'AddQuery', saveSerachCriteria).pipe(
      map((data: any) => {
        return data;
      }), catchError((error: Error) => {
        const errParams: any[] = [];
        errParams.push(`API_URL = ${this.Url}`);
        errParams.push(`UILanguage = ${this.globals.UILanguage}`);
        this.errorLogging.error(
          'MakeNewSearch',
          `${error.name} --> ${error.message} --> ${error.stack}` ||
          `${error.name} --> ${error.message}`,
          errParams
        );
        return of([] as any[]);
      })
    );
  }
  getQuery(getSerachCriteriaData): Observable<any> {
    return this.http.post<any>(this.Url + 'GetQuery', getSerachCriteriaData).pipe(
      map((data: any) => {
        return data;
      }), catchError((error: Error) => {
        const errParams: any[] = [];
        errParams.push(`API_URL = ${this.Url}`);
        errParams.push(`UILanguage = ${this.globals.UILanguage}`);
        this.errorLogging.error(
          'MakeNewSearch',
          `${error.name} --> ${error.message} --> ${error.stack}` ||
          `${error.name} --> ${error.message}`,
          errParams
        );
        return of([] as any[]);
      })
    );
  }
  deleteQuery(deleteSerachCriteriaData): Observable<any> {
    const options = {
      headers: new HttpHeaders({
      }),
      body: deleteSerachCriteriaData
    };
    return this.http.delete<any>(this.Url + 'DeleteQuery', options).pipe(
      map((data: any) => {
        return data;
      }), catchError((error: Error) => {
        const errParams: any[] = [];
        errParams.push(`API_URL = ${this.Url}`);
        errParams.push(`UILanguage = ${this.globals.UILanguage}`);
        this.errorLogging.error(
          'MakeNewSearch',
          `${error.name} --> ${error.message} --> ${error.stack}` ||
          `${error.name} --> ${error.message}`,
          errParams
        );
        return of([] as any[]);
      })
    );
  }

}
