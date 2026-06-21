import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  isInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (control?.hasError('required')) return 'Este campo es obligatorio.';
    if (control?.hasError('email')) return 'Introduce un email válido.';
    if (control?.hasError('minlength')) return 'Mínimo 8 caracteres.';
    return '';
  }

  onSubmit() {
    this.errorMessage = '';
    console.log("Formulario enviado:", this.loginForm.value);
    
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log("Éxito", res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/finanzas']); 
        },
        error: (err) => {
          if (err.status === 401) {
            this.errorMessage = "Credenciales incorrectas, intenta de nuevo.";
          } else {
            this.errorMessage = "Ocurrió un error inesperado.";
          }
          this.cdRef.detectChanges();
        }
      });
    }
  }
}