import { Component, OnInit } from '@angular/core';
import { BookDetailsService } from '../sevrices/book-details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  bookDetails ={};
  constructor(private bookDetailsService: BookDetailsService) { }

  ngOnInit() {
  }

}
