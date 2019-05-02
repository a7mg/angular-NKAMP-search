import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from 'src/app/Naseej-shared/services/app-config.service';
import { ErrorLoggingService } from 'src/app/Naseej-error-handling/services/error-logging.service';
import { GlobalsService } from 'src/app/Naseej-shared/services/globals.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  Url: string; // = "https://10.0.6.154:8245/Search10/1.0.0/SearchConfiguration";

  constructor(private http: HttpClient, appConfig: AppConfigService,
              public globals: GlobalsService,
              private errorLogging: ErrorLoggingService) {
    this.Url = appConfig.configdata.apiUrl;

  }

  getCriteriaDate(): Observable<any> {
    const body = { SearchProfile_id: 'a4819e0e-58f8-4676-b750-7808648b4ad4' };
    return this.http.post<any>(this.Url + 'SearchConfiguration', body).pipe(
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
    const body = {
      searchProfileId: '1111-1111-1111-1111',
      pageSize: 10,
      dataSourcesId: [
        'dataSources1',
        'dataSources2'
      ],
      searchKeyWords: [
        {
          searchKeyWordId: 'SearchKeyWordId1',
          materialTypeId: 'MaterialTypeId1',
          keyWordValue: 'KeyWordValue1',
          searchOperationId: 'SearchOperationId1',
          nextSearchKeyWordWithAnd: true
        }
      ],
      facetsFilter: [
        {
          facetId: '1111-1111-1111-1111',
          facetType: '5',
          facetValue: 'Riyadh'
        }
      ],
      keywWordsOrderBy: [
        {
          keywWordId: '1111-1111-1111-1111',
          keywWordType: '4',
          keywWordValue: 'value',
          isAcendening: true
        }
      ]
    };
    return this.http.post<any>(this.Url + 'MakeNewSearch', body).pipe(
      catchError((error: Error) => {
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
