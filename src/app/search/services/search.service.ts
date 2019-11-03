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
  public btnClicked$ = new Subject();
  public searchConfiguration$ = new BehaviorSubject(null);
  public currentCriteria$ = new BehaviorSubject(null);
  public searchCriteria: any;
  public currentFacetsConfiguration: Array<any>;
  public userProfile = {
    searchProfile_id: '996ac773-2701-44ec-a377-bd52838de4dc',
    anonymous: false,
    userId: 'albaqer_naseej',
    email: 'albaqer@aas.com.sa'
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

  constructor(private http: HttpClient, appConfig: AppConfigService, public globals: GlobalsService, private errorLogging: ErrorLoggingService) {
    this.Url = appConfig.configdata.apiUrl;
  }

  private childClickedEvent = new BehaviorSubject<string>('');
  emitfavBadgeEvent(msg: any) {
    this.childClickedEvent.next(msg);
  }

  favEventListner() {
    return this.childClickedEvent.asObservable();
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
    let body = {
      searchProfileId: serachCriteria.searchProfileId,
      pageSize: serachCriteria.pageSize,
      fromPage: serachCriteria.wantedPage,
      dataSourcesId: serachCriteria.dataSourcesId,
      searchKeyWords: serachCriteria.searchKeyWords,
      facetsFilter: [],
      keywWordsOrderBy: [
        {
          keywWordId: "df6c3d06-b99b-4d80-ab25-22b7b638fc81",
          keywWordType: "4",
          keywWordValue: "value",
          isAcendening: true
        }
      ]
    };
    return this.http.post<any>(this.Url + 'MakeNewSearch', body);
  }

  getNextPage(): Observable<any> {
    this.nextPageCriteria.searchProfileId = this.userProfile.searchProfile_id;
    return this.http.post<any>(this.Url + 'GetNextPageResult', this.nextPageCriteria).pipe(
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
    return this.http.post<any>(this.Url + 'DeleteQuery', deleteSerachCriteriaData).pipe(
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

  borrow(data): Observable<any> {

    let body = {
      userId: this.userProfile.userId,
      anonymous: true,
      email: this.userProfile.email,
      primaryItemSourceId: data.itemSourceId,
      itemIndexId: data.itemSourceId,
      dataSourceName: data.dataSourceName,
      dataSourceId: data.dataSourceId,
      materialTypeId: data.materialTypeId,
      materialTypeName: 'كتب',
      borrowDate: "2019-09-04",
      status: "approved",
      borrowApprovedBy: "NKAMP ADMIN TEAM"
    };
    return this.http.post<any>(this.Url + 'BorrowRequest', body);
  }
}
