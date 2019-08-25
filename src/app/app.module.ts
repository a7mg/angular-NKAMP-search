import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderByPipe } from './NKAMP-Search-shared/order-by.Pipe';
import { NkampInterceptor } from './interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NKAMPSearchSharedModule } from './NKAMP-Search-shared/NKAMP-Search-shared.module';

@NgModule({
  declarations: [
    AppComponent,
    OrderByPipe
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NKAMPSearchSharedModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NkampInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
