import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class NkampInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const newReq = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer d73dc8c5-3f4a-34bf-8629-ab317f45d830',
        'Content-Type': 'application/json'
      })
    });
    return next.handle(newReq);

  }
}
