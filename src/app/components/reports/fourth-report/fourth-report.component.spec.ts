import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthReportComponent } from './fourth-report.component';

describe('FourthReportComponent', () => {
  let component: FourthReportComponent;
  let fixture: ComponentFixture<FourthReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourthReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourthReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
