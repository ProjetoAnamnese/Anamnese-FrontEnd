import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionalAvailableComponent } from './profissional-available.component';

describe('ProfissionalAvailableComponent', () => {
  let component: ProfissionalAvailableComponent;
  let fixture: ComponentFixture<ProfissionalAvailableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfissionalAvailableComponent]
    });
    fixture = TestBed.createComponent(ProfissionalAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
