import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FinanzasService } from './../../finanzas.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-finanza-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finanza-list.html'
})
export class FinanzaList implements OnInit {
  private finanzasService = inject(FinanzasService);
  private router = inject(Router);

  private refreshSubject = new BehaviorSubject<boolean>(true);
  finanzas$!: Observable<any[]>;

ngOnInit(): void {
  this.finanzas$ = this.refreshSubject.asObservable().pipe(
    switchMap(() => this.finanzasService.getAll())
  );
}
cargarEvaluaciones(): void {
    this.finanzas$ = this.finanzasService.getAll();
  }
  public verDetalle(item: any): void {
    console.log('Item clickeado:', item);

    if (item && item.idEvalucion) {
      this.router.navigate(['/finanzas/detalle', item.idEvalucion]);
    } else {
      console.error('El item no tiene idEvaluacion', item);
    }
  }

  editar(id: string): void {
    this.router.navigate(['/finanzas/editar', id]);
  }
  crear(): void {
    this.router.navigate(['/finanzas/crear']);
  }

eliminar(id: number | string): void {
  if (confirm('¿Estás seguro de que deseas eliminar esta evaluación?')) {
    this.finanzasService.delete(id).subscribe({
      next: () => {
        this.procesoEliminacionExitoso();
        this.refreshSubject.next(true); 
      },
      error: (err) => {
        if (err.status >= 200 && err.status < 300) {
          this.procesoEliminacionExitoso();
          this.refreshSubject.next(true);
        } else {
          alert('No se pudo eliminar.');
        }
      }
    });
  }
}
private procesoEliminacionExitoso(): void {
  alert('Evaluación eliminada correctamente');
}

}