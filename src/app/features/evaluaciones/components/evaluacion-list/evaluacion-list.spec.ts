import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionList } from './evaluacion-list';

describe('EvaluacionList', () => {
  let component: EvaluacionList;
  let fixture: ComponentFixture<EvaluacionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionList],
    }).compileComponents();

    fixture = TestBed.createComponent(EvaluacionList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
