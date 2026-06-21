import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FinanzasService } from '../../finanzas.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './finanza-edit.html'
})
export class FinanzaEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private service = inject(FinanzasService);

  editForm = this.fb.group({
    ingresosMensuales: [0, Validators.required],
    deudasActuales: [0, Validators.required],
    estadoSolicitud: ['', Validators.required]
  });

  id = this.route.snapshot.paramMap.get('id');
  nombreCliente = '';

  datosOriginales: any;

  ngOnInit() {
    this.service.getById(this.id!).subscribe(data => {
      this.nombreCliente = data.nombreCliente;
      this.datosOriginales = data;
      this.editForm.patchValue(data);
    });
  }

guardar() {
  if (this.editForm.valid) {
    const payload = {
      ...this.datosOriginales,
      ...this.editForm.value
    };

    this.service.update(this.id!, payload).subscribe({
      next: () => {
        alert('Actualizado con éxito y recalculo realizado.');
        this.router.navigate(['/finanzas']);
      },
      error: (err) => {
        console.error('Error al guardar:', err);
      }
    });
  }
}}