import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionResultado } from './evaluacion-resultado';

describe('EvaluacionResultado', () => {
  let component: EvaluacionResultado;
  let fixture: ComponentFixture<EvaluacionResultado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionResultado],
    }).compileComponents();

    fixture = TestBed.createComponent(EvaluacionResultado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
