import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EvaluacionStateService } from '../../evaluacion-state.service';
import { ProductoCreditoService } from '../../../productos/creditos.service';

@Component({
  selector: 'app-evaluacion-resultado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evaluacion-resultado.html',
})
export class EvaluacionResultado implements OnInit {
  private state = inject(EvaluacionStateService);
  private productoService = inject(ProductoCreditoService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  cliente: any;
  productosAptos: any[] = [];
  scoreFinal: number = 0;

  ngOnInit() {
    const data = this.state.getData();
    if (!data?.cliente) {
      this.router.navigate(['/evaluacion/buscar']);
      return;
    }
    
    this.cliente = data.cliente;
    this.procesarEvaluacion();
  }

private procesarEvaluacion() {
  this.productoService.getAll().subscribe((productos: any[]) => {
    this.scoreFinal = this.calcularScore(this.cliente);
    
    const filtrados = productos.filter((p: any) => {
      return this.scoreFinal >= Number(p.scoreMinimo);
    });

    this.productosAptos = [...filtrados];

    this.cdr.detectChanges();

    console.log('Score Final:', this.scoreFinal);
    console.log('Productos aptos:', this.productosAptos);
  });
}

private calcularScore(historial: any): number {
  this.cdr.detectChanges();

  console.log('--- OBJETO COMPLETO RECIBIDO ---', historial);
  const scoreBase = 1000;
  const deuda = Number(historial.deudaTotal) || 0;
  const mora = Number(historial.diasMora) || 0;
  const empresas = Number(historial.numeroEmpresas) || 0;
  console.log('¿Existe sueldo?', historial.sueldo);
  const sueldo = Number(historial.sueldo) || 0;

  
  const penDeuda = deuda / 50;
  const penMora = mora * 2;
  const penEmpresas = empresas * 20;
  const bonoSueldo = (sueldo - 1130) / 100;
  const scoreFinal = scoreBase - penDeuda - penMora - penEmpresas + bonoSueldo;
  return Math.max(0, Math.min(1000, Math.round(scoreFinal)));
  
}}