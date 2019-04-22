import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class NkampInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer 2e5856e9-aadd-3b48-b156-8b88f96c10e7'
      })
    });
    return next.handle( newReq );

  }
}
