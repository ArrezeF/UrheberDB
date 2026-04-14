import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  department: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly SESSION_KEY = 'urheberdb_user';

  constructor(private router: Router) {}

  get currentUser(): AuthUser | null {
    const raw = sessionStorage.getItem(this.SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  /** Simulates a MediaKey login (replace with real SSO redirect in production) */
  loginWithMediaKey(): void {
    const mockUser: AuthUser = {
      id: 'mk-12345',
      name: 'Max Mustermann',
      email: 'max.mustermann@orf.at',
      department: 'Urheberrecht'
    };
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(mockUser));
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
    this.router.navigate(['/welcome']);
  }
}
