import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoAddComponent } from './producto-add.component';

describe('ProductoAddComponent', () => {
  let component: ProductoAddComponent;
  let fixture: ComponentFixture<ProductoAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoAddComponent]
    });
    fixture = TestBed.createComponent(ProductoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
