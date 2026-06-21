import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartContactComponent } from './cart-contact.component';

describe('CartContactComponent', () => {
  let component: CartContactComponent;
  let fixture: ComponentFixture<CartContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
