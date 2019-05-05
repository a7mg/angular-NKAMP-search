import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritSendMailComponent } from './favorit-send-mail.component';

describe('FavoritSendMailComponent', () => {
  let component: FavoritSendMailComponent;
  let fixture: ComponentFixture<FavoritSendMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritSendMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritSendMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
