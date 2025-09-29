import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthApiService } from '../../../../core/services/auth-api.service';
import { LoginRequest, LoginResponse } from '../../../../shared/models/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: LoginRequest = { email: '', password: '' };
  loginImage: string = 'assets/images/login.png';

  showPwd = false;
  remember = false;
  loading = false;
  mensaje = '';

  constructor(private api: AuthApiService, private router: Router) {}

  onSubmit() {
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(this.form.email);
    const validPwd = this.form.password.length >= 1;
    if (!validEmail || !validPwd) return;

    this.loading = true;
    this.api.login(this.form).subscribe({
      next: (res) => {
        this.loading = false;

        const loginRes = res;
        if (loginRes.status === 'success' && loginRes.token) {
          if (this.remember) {
            localStorage.setItem('token', loginRes.token);
          } else {
            sessionStorage.setItem('token', loginRes.token);
          }

          Swal.fire({
            icon: 'success',
            title: 'Welcome back!',
            timer: 1400,
            showConfirmButton: false,
          }).then(() => this.router.navigate(['/']));
        } else {
          this.mensaje = 'Invalid credentials';
          Swal.fire({ icon: 'error', title: 'Login failed', text: this.mensaje });
        }
      },
      error: (err) => {
        this.loading = false;
        const msg = err?.error?.error || 'Login failed';
        this.mensaje = msg;
        Swal.fire({ icon: 'error', title: 'Login failed', text: msg });
      },
    });
  }
}