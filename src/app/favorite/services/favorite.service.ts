import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppConfigService } from 'src/app/NKAMP-Search-shared/services/app-config.service';
import { ErrorLoggingService } from 'src/app/Naseej-error-handling/services/error-logging.service';
import { GlobalsService } from 'src/app/NKAMP-Search-shared/services/globals.service';
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  FavoriteList = new Subject();

  Url: string; // = https://10.0.6.154:8245/Search10/1.0.0/ItemOperation/GetItemOperationDetails

  constructor(private http: HttpClient, appConfig: AppConfigService,
              public globals: GlobalsService,
              private errorLogging: ErrorLoggingService) {
       this.Url = appConfig.configdata.apiUrl;
  }

  getFavoriteList(requestBody) : Observable<any>{

  var  bodybj = {
      "userId": "user_778",
      "pageSize": 5,
      "wantedPage": 1,
      // "startDate": 16/6/2019,
      // "endDate":  16/6/2019,
      // "filterByTitle": "item fdfsvdvs"

    };
    return this.http.post<any>(this.Url + 'GetFavoritesList', bodybj).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error: Error) => {
        const errParams: any[] = [];
        errParams.push(`API_URL = ${this.Url}`);
        errParams.push(`UILanguage = ${this.globals.UILanguage}`);
        this.errorLogging.error(
          'ItemOperation/GetItemOperationDetails',
          `${error.name} --> ${error.message} --> ${error.stack}` ||
          `${error.name} --> ${error.message}`,
          errParams
        );
        return of([] as any[]);
      })
    );
  }

}
