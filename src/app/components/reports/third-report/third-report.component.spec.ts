import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdReportComponent } from './third-report.component';

describe('ThirdReportComponent', () => {
  let component: ThirdReportComponent;
  let fixture: ComponentFixture<ThirdReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
