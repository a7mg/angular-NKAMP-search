import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  getCriteriaDate(): Observable<any> {
    return this.http.get<any>('assets/NkampData/DataJson.json').pipe(
      catchError((error: Error) => {
        return of([] as any[]);
      })

    );
  }
}
