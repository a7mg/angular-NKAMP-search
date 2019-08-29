import { Component, OnInit, Input } from '@angular/core';
import { BookDetailsService } from '../../search/services/book-details.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input('book-data') bookData;
  additionalField: any;
  constructor(private $bookDetailFav: BookDetailsService) {
  }



  ngOnInit() {
    console.log("bookDataGrid", this.bookData);
    this.additionalField = this.bookData.addtionFieldsInListPage.addtionField.filter(x => x.id === '789f356c-dcec-459c-aac4-6196f430d890')[0].insertedData;
    console.log('^^^ this.additionalField ' + this.additionalField);
  }

  addToMyFav(data) {
    console.log('##ALBAQER ' + JSON.stringify(data));
    const body = {
        userId: 'albaqer_naseej',
        anonymous: true,
        email: 'albaqer@naseej.com',
        itemListPageInformation: {
          itemSourceId: data.itemSourceId,
          dataSourceName: data.dataSourceName,
          dataSourceId: data.dataSourceId,
          materialTypeId: data.materialTypeId,
          materialTypeName: data.materialTypeName,
          title: data.Title,
          description: data.PhysicalDescription,
          coverImage: data.coverImage,
          addtionslFields: data.addtionFieldsInListPage.addtionField
        }
    };

    this.$bookDetailFav.addFavorite(body).subscribe(response => {
      if (response !== null) {
        console.log('##ALBAQER ' + JSON.stringify(response));
      }
    });
  }

}
