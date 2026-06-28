import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../externo.service';

@Component({
  selector: 'app-evaluacion-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evaluacion-list.html'
})
export class EvaluacionList implements OnInit {
  private externoService = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);
  evaluaciones: any[] = [];

 ngOnInit() {
  this.externoService.listarMisEvaluaciones().subscribe({
    next: (data) => {
      this.evaluaciones = data;
      this.cdr.detectChanges(); 
    },
    error: (err) => console.error('Error al cargar:', err)
  });
}
}