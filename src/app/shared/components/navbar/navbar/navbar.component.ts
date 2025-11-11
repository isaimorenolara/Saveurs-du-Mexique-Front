import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TokenService } from '../../../../core/services/token.service';
import { UserRole } from '../../../models/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  profileOpen = false;
  menuOpen = false;
  logoImage: string = 'assets/images/logo.png';
  mobileAccountOpen = false;

  constructor(private token: TokenService, private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  closeMenu() {
    this.menuOpen = false;
    this.mobileAccountOpen = false;
  }

  get isLoggedIn(): boolean {
    return this.token.isLoggedIn();
  }

  get isAdmin(): boolean {
    return this.token.getUserRole() === UserRole.Admin;
  }

  get userName(): string {
    return this.token.getUserName() ?? 'Account';
  }

  toggleProfile() { 
    this.profileOpen = !this.profileOpen; 
  }

  closeAll() { 
    this.profileOpen = false; 
    this.closeMenu(); 
  }

  logout() {
    this.token.logout();
    this.closeAll();
    this.router.navigateByUrl('/');
  }

  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth >= 992 && this.menuOpen) this.menuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    const inside = (e.target as HTMLElement).closest('.user-menu');
    if (!inside) this.profileOpen = false;
  }
}
