import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FinanzasService } from '../../finanzas.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './finanza-create.html'
})
export class FinanzaCreateComponent {
  private fb = inject(FormBuilder);
  private service = inject(FinanzasService);
  private router = inject(Router);


  createForm = this.fb.group({
nombreCliente: ['', [
      Validators.required, 
      Validators.minLength(3),
      Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')
    
    ]],
      

dniCliente: ['', [
      Validators.required, 
      Validators.pattern('^[0-9]{8}$'),
      Validators.minLength(8),
      Validators.maxLength(8)
    ]],
    ingresosMensuales: [0, [Validators.required, Validators.min(0.01)]],
    deudasActuales: [0, [Validators.required, Validators.min(0)]],
    estadoSolicitud: ['PENDIENTE']
  });

  crear() {
    if (this.createForm.valid) {
      this.service.create(this.createForm.value).subscribe({
        next: () => {
          alert('Evaluación creada exitosamente');
          this.router.navigate(['/finanzas']);
        },
        error: (err) => {
          if (err.status === 400 && err.error) {
            this.mapearErroresBackend(err.error);
          } else {
            alert('Error al guardar la nueva solicitud');
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
    this.router.navigate(['/finanzas/lista']);
  }
}