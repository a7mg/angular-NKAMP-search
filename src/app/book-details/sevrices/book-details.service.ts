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
export class BookDetailsService {
  Url: string; // = https://10.0.6.154:8245/Search10/1.0.0/ItemOperation/GetItemOperationDetails

  constructor(private http: HttpClient, appConfig: AppConfigService,
              public globals: GlobalsService,
              private errorLogging: ErrorLoggingService) {
       this.Url = appConfig.configdata.apiUrl;
  }

  getComment(requestBody) : Observable<any>{
    return this.http.post<any>(this.Url + 'ItemOperation/GetItemOperationDetails', requestBody).pipe(
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
