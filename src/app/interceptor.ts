import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class NkampInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const newReq = req.clone({
      headers: new HttpHeaders({
        'Authorization': 'Bearer 330c0fbb-8b35-3b98-9324-afebdab6c3c5'
      })
    });
    return next.handle(newReq);

  }
}
