import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonalCocktailComponent} from './personal-cocktail.component';

describe('PersonalCocktailComponent', () => {
  let component: PersonalCocktailComponent;
  let fixture: ComponentFixture<PersonalCocktailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalCocktailComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PersonalCocktailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
