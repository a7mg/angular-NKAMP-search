import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss']
})
export class CriteriaComponent implements OnInit {
  favoriteBadge = 55;
  isAdvanced = false;

  constructor() { }

  ngOnInit() {
  }

}
