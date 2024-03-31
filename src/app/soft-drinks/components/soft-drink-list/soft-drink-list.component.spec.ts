import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SoftDrinkListComponent} from './soft-drink-list.component';

describe('SoftDrinkListComponent', () => {
  let component: SoftDrinkListComponent;
  let fixture: ComponentFixture<SoftDrinkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftDrinkListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SoftDrinkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
