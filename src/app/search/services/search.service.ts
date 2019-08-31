import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppConfigService } from 'src/app/NKAMP-Search-shared/services/app-config.service';
import { ErrorLoggingService } from 'src/app/Naseej-error-handling/services/error-logging.service';
import { GlobalsService } from 'src/app/NKAMP-Search-shared/services/globals.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  Url: string;
  public results$ = new BehaviorSubject(null);
  public searchConfiguration$ = new BehaviorSubject(null);
  public currentCriteria$ = new BehaviorSubject(null);
  public currentFacetsConfiguration: Array<any>;
  public userProfile = {
    searchProfile_id: '996ac773-2701-44ec-a377-bd52838de4dc',
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

  /*const body = {
    searchProfileId: serachCriteria.searchProfileId,
    pageSize: 24,
    fromPage: 13,
    dataSourcesId: serachCriteria.dataSourcesId,
    searchKeyWords: serachCriteria.searchKeyWords,
    facetsFilter: [],
    keywWordsOrderBy: [
      {
        keywWordId: 'df6c3d06-b99b-4d80-ab25-22b7b638fc81',
        keywWordType: '4',
        keywWordValue: 'value',
        isAcendening: true
      }
    ]
  };*/
  const body = {
    searchProfileId: '996ac773-2701-44ec-a377-bd52838de4dc',
    pageSize: 5,
    fromPage: 0,
    dataSourcesId: [
      '783c969a-cebb-4b0c-8a25-f524ec479cfc'
    ],
    searchKeyWords: [
      {
       searchKeyWordId: 'd112835b-3b56-4295-aa62-7842dee627d0',
        materialTypeId: 'f1b94474-82df-4e46-b1df-4cbb61aaee85',
        keyWordValue: '1414',
        searchOperationId: 'aad2c592-dc0d-4ed5-a5c7-6f0259c0498b',
        nextSearchKeyWordWithAnd: true
      }, {
        searchKeyWordId: 'df6c3d06-b99b-4d80-ab25-22b7b638fc81',
        materialTypeId: 'f1b94474-82df-4e46-b1df-4cbb61aaee85',
        keyWordValue: 1994,
        searchOperationId: '158c5e85-2c20-461b-ba49-972195dc0922',
        nextSearchKeyWordWithAnd: true
      }
    ],
    facetsFilter: [
    ],
    keywWordsOrderBy: [
      {
        keywWordId: 'df6c3d06-b99b-4d80-ab25-22b7b638fc81',
        keywWordType: '4',
        keywWordValue: 'value',
        isAcendening: true
      }
    ]
  };

  return this.http.post<any>(this.Url + 'Search', body);
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
