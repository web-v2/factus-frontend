import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoFormComponent } from './producto-form.component';

describe('ProductoFormComponent', () => {
  let component: ProductoFormComponent;
  let fixture: ComponentFixture<ProductoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoFormComponent]
    });
    fixture = TestBed.createComponent(ProductoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
