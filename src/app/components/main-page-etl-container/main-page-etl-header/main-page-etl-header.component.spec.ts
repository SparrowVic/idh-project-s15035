import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageEtlHeaderComponent } from './main-page-etl-header.component';

describe('MainPageEtlHeaderComponent', () => {
  let component: MainPageEtlHeaderComponent;
  let fixture: ComponentFixture<MainPageEtlHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageEtlHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPageEtlHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
