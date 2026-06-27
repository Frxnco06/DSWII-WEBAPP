import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanzaMain } from './productos-main';

describe('FinanzaMain', () => {
  let component: FinanzaMain;
  let fixture: ComponentFixture<FinanzaMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanzaMain],
    }).compileComponents();

    fixture = TestBed.createComponent(FinanzaMain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
