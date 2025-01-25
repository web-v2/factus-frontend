import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['/dashboard']);
    }
  }
  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response) {
          console.log('Inicio de sesión exitoso:', response);
          Swal.fire({
            icon: 'success',
            title: `Bienvenid@: ${localStorage.getItem('userSession')}`,
          });
          this.errorMessage = 'Login exitoso';
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
        Swal.fire({
          icon: 'error',
          title: `${error.message}`,
        });
        this.errorMessage = 'Ocurrió un error en el login: ' + error.message;
      },
    });
    this.limpiarForm();
  }

  limpiarForm() {
    this.email = '';
    this.password = '';
    this.errorMessage = '';
  }
}
