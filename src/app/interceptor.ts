import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class NkampInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const newReq = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer 9365075f-51b1-3e4f-86f7-dacf71236ed2',
        'Content-Type': 'application/json'
      })
    });
    return next.handle(newReq);

  }
}
