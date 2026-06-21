import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FinanzasService } from '../../finanzas.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-finanza-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finanzas-detail.html'
})
export class FinanzaDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private finanzasService = inject(FinanzasService);
  
  finanza$!: Observable<any>;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.finanza$ = this.finanzasService.getById(id);
    }
  }
    cancelar() {
    this.router.navigate(['/finanzas/lista']);
  }


}