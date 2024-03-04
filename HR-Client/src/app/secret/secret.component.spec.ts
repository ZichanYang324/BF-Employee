import { SecretComponent } from './secret.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('SecretComponent', () => {
  let component: SecretComponent;
  let fixture: ComponentFixture<SecretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecretComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SecretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
