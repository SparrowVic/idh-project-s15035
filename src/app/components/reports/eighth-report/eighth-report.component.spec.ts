import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EighthReportComponent } from './eighth-report.component';

describe('EighthReportComponent', () => {
  let component: EighthReportComponent;
  let fixture: ComponentFixture<EighthReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EighthReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EighthReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
