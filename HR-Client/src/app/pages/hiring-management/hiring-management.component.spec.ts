import { HiringManagementComponent } from './hiring-management.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('HiringManagementComponent', () => {
  let component: HiringManagementComponent;
  let fixture: ComponentFixture<HiringManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HiringManagementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HiringManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
