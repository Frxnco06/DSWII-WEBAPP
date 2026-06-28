import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoCreditoService } from '../../../productos/creditos.service';
import { EvaluacionStateService } from '../../evaluacion-state.service';
import { ApiService } from '../../externo.service';

@Component({
  selector: 'app-evaluacion-buscar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './evaluacion-buscar.html',
  styleUrl: './evaluacion-buscar.css',
})
export class EvaluacionBuscarComponent {
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoCreditoService);
  private evaluacionState = inject(EvaluacionStateService);
  private router = inject(Router);
  private apiService = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);
  clienteEncontrado: any = null;

  searchForm = this.fb.group({
    dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]]
  });

buscar() {
    if (this.searchForm.valid) {
      const dni = this.searchForm.value.dni!;
      this.apiService.getClienteByDni(dni).subscribe({
        next: (data) => {
          this.clienteEncontrado = data;
          this.cdr.detectChanges();
        },
        error: () => {
          this.clienteEncontrado = null;
          alert('Cliente no encontrado');
        }
      });
    }
  }
  
  generarEvaluacion() {
    if (!this.clienteEncontrado) return;

    this.productoService.getAll().subscribe((productos) => {
      const productosAptos = productos.filter(p => 
        this.clienteEncontrado.score >= p.scoreMinimo
      );

      this.evaluacionState.setEvaluacionData({
        cliente: this.clienteEncontrado,
        productosAptos: productosAptos
      });

      this.router.navigate(['/evaluacion/resumen']);
    });
  }
}