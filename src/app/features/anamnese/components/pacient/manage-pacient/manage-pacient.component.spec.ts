import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePacientComponent } from './manage-pacient.component';

describe('ManagePacientComponent', () => {
  let component: ManagePacientComponent;
  let fixture: ComponentFixture<ManagePacientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePacientComponent]
    });
    fixture = TestBed.createComponent(ManagePacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
