import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailHomepageComponent } from './cocktail-homepage.component';

describe('HomepageComponent', () => {
  let component: CocktailHomepageComponent;
  let fixture: ComponentFixture<CocktailHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocktailHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
