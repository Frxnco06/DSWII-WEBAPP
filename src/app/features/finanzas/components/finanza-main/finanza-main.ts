import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FinanzasService } from '../../finanzas.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-finanza-main',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './finanza-main.html'
})
export class FinanzaMainComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private finanzasService = inject(FinanzasService);
  private router = inject(Router);

  totalEvaluaciones: number = 0;
  aprobados: number = 0;
  rechazados: number = 0;
  scorePromedio: number = 0;
  evaluaciones: any[] = [];

  public chartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Score de Riesgo' }]
  };
  public chartOptions = { responsive: true };

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.finanzasService.getAll().subscribe({
      next: (data: any[]) => {
        this.evaluaciones = data.slice(0, 3);
        this.calcularResumen(data);
        
        setTimeout(() => {
          this.chartData = {
            labels: data.map(e => e.nombreCliente),
            datasets: [{ data: data.map(e => e.puntajeScore), label: 'Score de Riesgo' }]
          };
          this.cdr.detectChanges();
        }, 0);
      },
      error: (err) => console.error('Error al cargar evaluaciones:', err)
    });
  }

  calcularResumen(data: any[]): void {
    this.totalEvaluaciones = data.length;
    this.aprobados = data.filter(e => e.estadoSolicitud?.toLowerCase() === 'aprobado').length;
    this.rechazados = data.filter(e => e.estadoSolicitud?.toLowerCase() === 'rechazado').length;
    
    const scores = data.map(e => e.puntajeScore).filter(s => s != null && s > 0);
    if (scores.length > 0) {
      this.scorePromedio = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    }
  }

  navegarACrear(): void {
    this.router.navigate(['/finanzas/crear']);
  }

  navegarALista(): void {
    this.router.navigate(['/finanzas/lista']);
  }
  
  editar(id: any): void {
    this.router.navigate(['/finanzas/editar', id]);
  }
}