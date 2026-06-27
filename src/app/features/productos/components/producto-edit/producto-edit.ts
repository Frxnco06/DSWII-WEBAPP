import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductoCreditoService } from '../../creditos.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './producto-edit.html' 
})
export class ProductoEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private service = inject(ProductoCreditoService);

  id = this.route.snapshot.paramMap.get('id');
  
  editForm = this.fb.group({
    nombreProducto: ['', [Validators.required, Validators.minLength(3)]],
    montoMinimo: [0, [Validators.required, Validators.min(0.01)]],
    montoMaximo: [0, [Validators.required, Validators.min(0.01)]],
    tasaInteres: [0, [Validators.required, Validators.min(0.01)]],
    scoreMinimo: [0, [Validators.required, Validators.min(0)]]
  });

  ngOnInit() {
    if (this.id) {
      this.service.getById(this.id).subscribe({
        next: (data) => {
          this.editForm.patchValue(data);
        },
        error: (err) => {
          console.error('Error al cargar el producto:', err);
          alert('No se pudo cargar la información del producto.');
          this.router.navigate(['/productos/lista']);
        }
      });
    }
  }

  guardar() {
    if (this.editForm.valid) {
      this.service.update(this.id!, this.editForm.value).subscribe({
        next: () => {
          alert('Producto actualizado exitosamente.');
          this.router.navigate(['/productos/lista']);
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al guardar los cambios.');
        }
      });
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  cancelar() {
    this.router.navigate(['/productos/lista']);
  }
}