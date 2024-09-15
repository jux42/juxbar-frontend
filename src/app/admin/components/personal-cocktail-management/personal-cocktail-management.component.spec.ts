import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalCocktailManagementComponent } from './personal-cocktail-management.component';

describe('CocktailManagementComponent', () => {
  let component: PersonalCocktailManagementComponent;
  let fixture: ComponentFixture<PersonalCocktailManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalCocktailManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalCocktailManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
