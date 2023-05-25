import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageEtlContainerComponent } from './main-page-etl-container.component';

describe('MainPageEtlContainerComponent', () => {
  let component: MainPageEtlContainerComponent;
  let fixture: ComponentFixture<MainPageEtlContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageEtlContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPageEtlContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
