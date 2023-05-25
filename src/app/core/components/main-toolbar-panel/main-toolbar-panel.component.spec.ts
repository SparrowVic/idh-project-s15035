import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainToolbarPanelComponent } from './main-toolbar-panel.component';

describe('MainToolbarPanelComponent', () => {
  let component: MainToolbarPanelComponent;
  let fixture: ComponentFixture<MainToolbarPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainToolbarPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainToolbarPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
