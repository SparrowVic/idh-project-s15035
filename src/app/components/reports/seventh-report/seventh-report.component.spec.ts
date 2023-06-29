import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeventhReportComponent } from './seventh-report.component';

describe('SeventhReportComponent', () => {
  let component: SeventhReportComponent;
  let fixture: ComponentFixture<SeventhReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeventhReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeventhReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
