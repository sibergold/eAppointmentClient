import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenModel } from '../models/token.model';
import { JwtPayload, jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenDecode: TokenModel = new TokenModel();

  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    const token: string | null = localStorage.getItem("token");

    if (token) {
      const decode: JwtPayload | any = jwtDecode(token);
      const exp = decode.exp;
      const now = new Date().getTime() / 1000;

      if (now > exp) {
        localStorage.removeItem("token");
        this.router.navigateByUrl("/login");
        return false;
      }

      this.tokenDecode.id = decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      this.tokenDecode.name = decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      this.tokenDecode.email = decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
      this.tokenDecode.userName = decode["UserName"];
      this.tokenDecode.roles = JSON.parse(decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);

      return true;
    }

    this.router.navigateByUrl("/login");
    return false;
  }

  getUserId(): string {
    return this.tokenDecode.id;
  }

  hasRole(role: string): boolean {
    return this.tokenDecode.roles.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.tokenDecode.roles.includes(role));
  }
}
