import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/Auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}; // Object which is going to store username and password and send them to a server
  photoUrl: string;
  // tslint:disable-next-line: max-line-length
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { } // inject a service to a constructor so that I can use it in a component

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  LogIn() { // login method/function
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged In Successfully');
    }, error => {
    this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

   loggedIn() { // loggedin method, metthod which shows that a user has logged in
    return this.authService.loggedIn(); // the token it has been check its expired date and that it is valid
  }

  logout() { // logout method
    localStorage.removeItem('token'); // remove a token when user log out
    localStorage.removeItem('user'); // remove user image when user log out
    this.authService.decodedToken = null; // remove the decodedToken when the user log out
    this.authService.currentUser = null;  // remove the current user pic when the user logout
    this.alertify.message('Loged Out');
    this.router.navigate(['/home']);
  }

}

