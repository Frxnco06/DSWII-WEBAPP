import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanzaCreate } from './finanza-create';

describe('FinanzaCreate', () => {
  let component: FinanzaCreate;
  let fixture: ComponentFixture<FinanzaCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanzaCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(FinanzaCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
