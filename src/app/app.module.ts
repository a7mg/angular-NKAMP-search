import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DigitalLibraryComponent } from './digital-library/digital-library.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { OrderByPipe } from './Naseej-shared/order-by.Pipe';

@NgModule({
  declarations: [
    AppComponent,
    DigitalLibraryComponent,
    BookDetailsComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
