import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderByPipe } from './NKAMP-Search-shared/order-by.Pipe';
import { NkampInterceptor } from './interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NKAMPSearchSharedModule } from './NKAMP-Search-shared/NKAMP-Search-shared.module';
// import { ShareButtonsModule } from '@ngx-share/buttons'

@NgModule({
  declarations: [
    AppComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    // ShareButtonsModule,
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
