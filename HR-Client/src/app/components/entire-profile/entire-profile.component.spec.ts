import { EntireProfileComponent } from './entire-profile.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('EntireProfileComponent', () => {
  let component: EntireProfileComponent;
  let fixture: ComponentFixture<EntireProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntireProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EntireProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
