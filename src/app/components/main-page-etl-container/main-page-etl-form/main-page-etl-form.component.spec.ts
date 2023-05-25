import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageEtlFormComponent } from './main-page-etl-form.component';

describe('MainPageEtlFormComponent', () => {
  let component: MainPageEtlFormComponent;
  let fixture: ComponentFixture<MainPageEtlFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageEtlFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPageEtlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
