import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductoCreditoService } from '../../creditos.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-list.html'
})
export class ProductoList implements OnInit {
  private productoService = inject(ProductoCreditoService);
  private router = inject(Router);

  private refreshSubject = new BehaviorSubject<boolean>(true);
  productos$!: Observable<any[]>;

ngOnInit(): void {
  this.productos$ = this.refreshSubject.asObservable().pipe(
    switchMap(() => this.productoService.getAll())
  );
}
cargarEvaluaciones(): void {
    this.productos$ = this.productoService.getAll();
  }
  public verDetalle(item: any): void {
    console.log('Item clickeado:', item);

    if (item && item.productoId) {
      this.router.navigate(['/productos/detalle', item.productoId]);
    } else {
      console.error('El item no tiene productoId', item);
    }
  }

  editar(item: any): void {
  const id = item.productoId; 
  
  if (id) {
    this.router.navigate(['/productos/editar', id]);
  } else {
    console.error("El objeto no contiene un 'productoId' válido:", item);
  }
}
  crear(): void {
    this.router.navigate(['/productos/crear']);
  }

eliminar(item: any): void {
  const id = item.productoId;

  if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
    this.productoService.delete(id).subscribe({
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
  alert('Producto eliminado correctamente');
}

}