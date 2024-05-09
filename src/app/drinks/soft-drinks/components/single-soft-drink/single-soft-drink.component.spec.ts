import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleSoftDrinkComponent} from './single-soft-drink.component';

describe('SingleSoftDrinkComponent', () => {
  let component: SingleSoftDrinkComponent;
  let fixture: ComponentFixture<SingleSoftDrinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleSoftDrinkComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SingleSoftDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
