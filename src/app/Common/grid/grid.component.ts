import { Component, OnInit, Input } from '@angular/core';
import { BookDetailsService } from '../../search/services/book-details.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input('book-data') bookData;
  constructor(private $bookDetailFav: BookDetailsService) {

  }



  ngOnInit() {
    console.log("bookDataGrid",this.bookData);
  }

  addToMyFav(data) {
    console.log('##ALBAQER ' + JSON.stringify(data));
    const body = {
        userId: 'albaqer_aas',
        anonymous: true,
        email: 'albaqer@naseej.com',
        itemListPageInformation: data
    };

    this.$bookDetailFav.addFavorite(body).subscribe(response => {
      if (response !== null) {
        console.log('##ALBAQER ' + JSON.stringify(response));
      }
    });
  }

}
