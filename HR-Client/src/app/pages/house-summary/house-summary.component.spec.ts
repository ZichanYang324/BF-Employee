import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseSummaryComponent } from './house-summary.component';

describe('HouseSummaryComponent', () => {
  let component: HouseSummaryComponent;
  let fixture: ComponentFixture<HouseSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
