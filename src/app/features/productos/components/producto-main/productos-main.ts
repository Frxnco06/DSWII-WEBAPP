import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductoCreditoService } from '../../creditos.service';

@Component({
  selector: 'app-productos-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos-main.html'
})
export class ProductosMainComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private productoService = inject(ProductoCreditoService);
  private router = inject(Router);

  totalEvaluaciones: number = 0;
  aprobados: number = 0;
  rechazados: number = 0;
  scorePromedio: number = 0;
  
  evaluaciones: any[] = [];

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.productoService.getAll().subscribe({
      next: (data: any[]) => {
        this.evaluaciones = data.slice(0, 3);
        this.calcularResumen(data);
        this.cdr.detectChanges();
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
    this.router.navigate(['/productos/crear']);
  }

  navegarALista(): void {
    this.router.navigate(['/productos/lista']);
  }
  
  editar(id: any): void {
    this.router.navigate(['/productos/editar', id]);  }
}