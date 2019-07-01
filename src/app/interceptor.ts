import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class NkampInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const newReq = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer 56ca627a-5b70-3999-90c5-f85944bdcb96',
        'Content-Type': 'application/json'
      })
    });
    return next.handle(newReq);

  }
}
