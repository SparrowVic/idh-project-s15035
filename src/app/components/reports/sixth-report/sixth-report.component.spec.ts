import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SixthReportComponent } from './sixth-report.component';

describe('SixthReportComponent', () => {
  let component: SixthReportComponent;
  let fixture: ComponentFixture<SixthReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SixthReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SixthReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
