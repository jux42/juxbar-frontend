import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SoftdrinkHomepageComponent} from './softdrink-homepage.component';

describe('SoftdrinkHomepageComponent', () => {
  let component: SoftdrinkHomepageComponent;
  let fixture: ComponentFixture<SoftdrinkHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftdrinkHomepageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SoftdrinkHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
