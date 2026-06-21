import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanzaForm } from './finanza-form';

describe('FinanzaForm', () => {
  let component: FinanzaForm;
  let fixture: ComponentFixture<FinanzaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanzaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(FinanzaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
