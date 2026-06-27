import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
})        
export class RegisterComponent {    
  registerForm: FormGroup;    
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {
    this.registerForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  isInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);

    if (control?.hasError('required')) return 'Este campo es obligatorio.';
    if (control?.hasError('email')) return 'Introduce un email válido.';
    if (control?.hasError('minlength')) {
      const requiredLength = control.getError('minlength').requiredLength;
      return `Mínimo ${requiredLength} caracteres.`;
    } return '';
  }

  onRegister() {
    this.errorMessage = '';
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log("Registro exitoso", res);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.status === 400) {
            this.errorMessage = "Este correo ya está registrado.";
          } else if (err.status === 400) {
            this.errorMessage = "Datos inválidos, revisa el formulario.";
          } 
          else if (err.status === 500) {
            this.errorMessage = "Este correo ya se encuentra registrado en nuestro sistema.";
          }
          else {
            this.errorMessage = "Ocurrió un error inesperado.";
          }
          this.cdRef.detectChanges();
        }
      });
    }
  }
}