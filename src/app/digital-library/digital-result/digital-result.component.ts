import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-digital-result',
  templateUrl: './digital-result.component.html',
  styleUrls: ['./digital-result.component.scss'],

})
export class DigitalResultComponent implements OnInit {
  // public slides = [
  //   'First slide',
  //   'Second slide',
  //   'Third slide',
  //   'Fourth slide',
  //   'Fifth slide',
  //   'Sixth slide'
  // ];
  // public slides = [
  //     {
  //       icon: 'icon1',
  //       name: 'books',
  //       userCount: 4589
  //     },
  //     {
  //       icon: '2',
  //       name: 'Documents',
  //       userCount: 256
  //     },
  //     {
  //       icon: '3',
  //       name: 'Articles',
  //       userCount: 1563
      
  //     },
  //     {
  //       icon: '4',
  //       name: 'Magazine',
  //       userCount: 2258
      
  //     },
  //     {
  //       icon: '5',
  //       name: 'News',
  //       userCount: 2258
      
  //     },
  //     {
  //       icon: '6',
  //       name: 'Files',
  //       userCount: 2258
      
  //     },
  //     {
  //       icon: '7',
  //       name: 'General',
  //       userCount: 2258
      
  //     }
  // ];
  
  page = 1;
  isClicked= false;

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 7,
    keyboard: true,
    mousewheel: true,
    scrollbar: true,
    navigation: true,
    pagination: false,
    breakpoints: {
      1024: {
        slidesPerView: 7,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 7,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 6,
        spaceBetween: 9
        ,
      },
      640: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
      320: {
        slidesPerView: 3,
        spaceBetween: 9,
      }
    }
  };

  constructor() {

  }

  ngOnInit() {
  }
  clicked(){
    this.isClicked= !this.isClicked;
  }

}
