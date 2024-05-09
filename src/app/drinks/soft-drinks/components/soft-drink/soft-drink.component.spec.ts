import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SoftDrinkComponent} from './soft-drink.component';

describe('SoftDrinkComponent', () => {
  let component: SoftDrinkComponent;
  let fixture: ComponentFixture<SoftDrinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftDrinkComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SoftDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
