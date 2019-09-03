import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderByPipe } from './NKAMP-Search-shared/order-by.Pipe';
import { NkampInterceptor } from './interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NKAMPSearchSharedModule } from './NKAMP-Search-shared/NKAMP-Search-shared.module';
import { ShareButtonsModule, ShareButtonsOptions } from 'ngx-sharebuttons';
const options: ShareButtonsOptions = {
  include: ['facebook', 'twitter', 'google'],
  exclude: ['tumblr', 'stumble', 'vk'],
  theme: 'modern-light',
  gaTracking: true,
  twitterAccount: 'twitterUsername'
};
const buttonsConfig = {
  facebook: {
    icon: 'fa fa-facebook-official',
    text: 'Share on Facebook'
  },
  twitter: {
    icon: 'fa fa-twitter-square',
    text: 'Tweet'
  },
  // and so on...
};
@NgModule({
  declarations: [
    AppComponent,
    OrderByPipe
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NKAMPSearchSharedModule.forRoot(),
    ShareButtonsModule.forRoot(options, buttonsConfig)
    
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
