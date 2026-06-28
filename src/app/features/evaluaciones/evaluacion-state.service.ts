import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EvaluacionStateService {
  private dataState = new BehaviorSubject<any>(null);
  data$ = this.dataState.asObservable();

  setEvaluacionData(data: any) {
    this.dataState.next(data);
  }

  getData() {
    return this.dataState.getValue();
  }
}