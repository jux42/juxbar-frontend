import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftDrinksComponent } from './soft-drink.component';

describe('SoftDrinksComponent', () => {
  let component: SoftDrinksComponent;
  let fixture: ComponentFixture<SoftDrinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftDrinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftDrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
