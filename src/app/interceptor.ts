import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class NkampInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const newReq = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer c0547bc5-25ac-3ab0-bb12-17f34de10a25',
        'Content-Type': 'application/json'
      })
    });
    return next.handle(newReq);

  }
}
