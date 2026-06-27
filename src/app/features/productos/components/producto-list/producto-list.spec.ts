import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanzaList } from './producto-list';

describe('FinanzaList', () => {
  let component: FinanzaList;
  let fixture: ComponentFixture<FinanzaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanzaList],
    }).compileComponents();

    fixture = TestBed.createComponent(FinanzaList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
