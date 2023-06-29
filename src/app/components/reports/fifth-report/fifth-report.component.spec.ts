import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FifthReportComponent } from './fifth-report.component';

describe('FifthReportComponent', () => {
  let component: FifthReportComponent;
  let fixture: ComponentFixture<FifthReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FifthReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FifthReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
