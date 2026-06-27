import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductoCreditoService } from '../../creditos.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './producto-create.html'
})
export class ProductoCreateComponent {
  private fb = inject(FormBuilder);
  private service = inject(ProductoCreditoService);
  private router = inject(Router);


createForm = this.fb.group({
  nombreProducto: ['', [Validators.required, Validators.minLength(3)]],
  montoMinimo: [0, [Validators.required, Validators.min(0.01)]],
  montoMaximo: [0, [Validators.required, Validators.min(0.01)]],
  tasaInteres: [0, [Validators.required, Validators.min(0.01)]],
  scoreMinimo: [0, [Validators.required, Validators.min(0)]]
}); 

  crear() {
    if (this.createForm.valid) {
      this.service.create(this.createForm.value).subscribe({
        next: () => {
          alert('Credito creado exitosamente');
          this.router.navigate(['/productos/lista']);
        },
        error: (err) => {
          if (err.status === 400 && err.error) {
            this.mapearErroresBackend(err.error);
          } else {
            alert('Error al guardar el nuevo credito');
          }
        }
      });
    } else {
      this.createForm.markAllAsTouched();
    }
  }

  mapearErroresBackend(errores: any) {
    Object.keys(errores).forEach(campo => {
      const control = this.createForm.get(campo);
      if (control) {
        control.setErrors({ serverError: errores[campo] });
      }
    });
  }

  cancelar() {
    this.router.navigate(['/productos/lista']);
  }
}