import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { AuthService } from '../Services/Auth.service';
import { AlertifyService } from '../services/alertify.service';


@Injectable({
  providedIn: 'root'
})
// in guard remove next: activate,and state: Router
// and remove things that you dont need and return boolean only
// create a constractor

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
              private alertify: AlertifyService) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertify.error('Please logIn first to access this page!!');
    this.router.navigate(['/home']);
    return false;
  }

}
