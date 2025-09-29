import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthApiService } from '../../../../core/services/auth-api.service';
import { RegisterRequest, RegisterResponse, UserRole } from '../../../../shared/models/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  step = 0;
  loading = false;
  mensaje = '';
  showPwd = false;
  showConfirmPwd = false;
  confirm = '';
  readonly UserRole = UserRole;

  register: RegisterRequest = {
    account: { email: '', password: '', dob: '', role: UserRole.Customer },
    profile: { firstName: '', lastName: '' },
    address: { street: '', streetNumber: '', zip: '' },
  };

  constructor(private api: AuthApiService, private router: Router) {}

  get validAccount(): boolean {
    const { email, password, dob } = this.register.account;
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const okPwd = password.length >= 8 && /\d/.test(password) && /[^A-Za-z0-9]/.test(password);
    const okDob = this.isAdult(dob);

    const okMatch = !!this.confirm && password === this.confirm;

    return okEmail && okPwd && okDob && okMatch;
  }

  get validProfile(): boolean {
    const { firstName, lastName } = this.register.profile;
    return firstName.trim().length >= 2 && lastName.trim().length >= 2;
  }

  get validAddress(): boolean {
    const { street, streetNumber, zip } = this.register.address;
    return street.trim().length >= 3 && !!streetNumber && /^[0-9]{5}$/.test(zip);
  }

  next() {
    if ((this.step === 0 && this.validAccount) || (this.step === 1 && this.validProfile)) {
      this.step++;
    }
  }
  
  back() {
    if (this.step > 0) this.step--;
  }

  onSubmit() {
    if (!(this.validAccount && this.validProfile && this.validAddress)) {
      Swal.fire({ icon: 'error', title: 'Check your data', text: 'Please complete required fields.' });
      return;
    }

    this.loading = true;
    this.api.register(this.register).subscribe({
      next: (res) => {
        this.loading = false;

        console.log("Status: "+res.status);

        if (res.status === 'success' && res.token) {
          localStorage.setItem('token', res.token);
          Swal.fire({
            icon: 'success',
            title: 'Registration successful',
            text: 'Your account has been created.',
            timer: 1800,
            showConfirmButton: false,
          }).then(() => this.router.navigate(['/']));
        } else {
          this.mensaje = 'Registration failed';
          Swal.fire({ icon: 'error', title: 'Register failed', text: this.mensaje });
        }
      },
      error: (err) => {
        this.loading = false;
        const msg = err?.error?.error || 'Registration failed';
        this.mensaje = msg;
        Swal.fire({ icon: 'error', title: 'Register failed', text: msg });
      },
    });
  }

  isAdult(dob: string): boolean {
    if (!dob) return false;
    const d = new Date(dob), t = new Date();
    let age = t.getFullYear() - d.getFullYear();
    const m = t.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && t.getDate() < d.getDate())) age--;
    return age >= 18;
  }
}