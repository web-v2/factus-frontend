import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClienteAddComponent } from './cliente-add.component';

describe('ClienteAddComponent', () => {
  let component: ClienteAddComponent;
  let fixture: ComponentFixture<ClienteAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteAddComponent]
    });
    fixture = TestBed.createComponent(ClienteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
