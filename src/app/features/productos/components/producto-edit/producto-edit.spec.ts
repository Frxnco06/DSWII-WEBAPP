import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanzaEdit } from './producto-edit';

describe('FinanzaEdit', () => {
  let component: FinanzaEdit;
  let fixture: ComponentFixture<FinanzaEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanzaEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(FinanzaEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
