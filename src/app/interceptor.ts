import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class NkampInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const newReq = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer 9b61fe09-4723-35d2-b9e5-f0fcc5e8b430',
        'Content-Type': 'application/json'
      })
    });
    return next.handle(newReq);

  }
}
