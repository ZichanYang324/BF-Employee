import { RegistrationEmailComponent } from './registration-email.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('RegistrationEmailComponent', () => {
  let component: RegistrationEmailComponent;
  let fixture: ComponentFixture<RegistrationEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationEmailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
