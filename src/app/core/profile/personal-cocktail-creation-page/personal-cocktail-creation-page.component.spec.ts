import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalCocktailCreationPageComponent } from './personal-cocktail-creation-page.component';

describe('PersonalCocktailCreationPageComponent', () => {
  let component: PersonalCocktailCreationPageComponent;
  let fixture: ComponentFixture<PersonalCocktailCreationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalCocktailCreationPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalCocktailCreationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
