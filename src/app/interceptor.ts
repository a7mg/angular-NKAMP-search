import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class NkampInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const newReq = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer a7b76843-2de7-3da9-97e4-f2b203746d87',
        'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
          //    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Credentials, Access-Control-Request-Headers',
          //  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'

      })
    });
    return next.handle(newReq);

  }
}
