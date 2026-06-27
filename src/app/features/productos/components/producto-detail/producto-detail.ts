import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductoCreditoService } from '../../creditos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-producto-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-detail.html'
})
export class ProductoDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private productoService = inject(ProductoCreditoService);
  
  productos$!: Observable<any>;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productos$ = this.productoService.getById(id);
    }
  }
    cancelar() {
    this.router.navigate(['/productos/lista']);
  }


}