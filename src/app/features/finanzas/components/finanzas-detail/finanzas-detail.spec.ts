import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanzasDetail } from './finanzas-detail';

describe('FinanzasDetail', () => {
  let component: FinanzasDetail;
  let fixture: ComponentFixture<FinanzasDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanzasDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(FinanzasDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
