import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/Auth.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}; // Object which is going to store username and password and send them to a server

  // tslint:disable-next-line: max-line-length
  constructor(public authService: AuthService, private alertify: AlertifyService) { } // inject a service to a constructor so that I can use it in a component

  ngOnInit() {
  }

  LogIn() { // login method/function
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged In Successfully');
    }, error => {
    this.alertify.error(error);
    }
    );

  }

   loggedIn() { // loggedin method, metthod which shows that a user has logged in
    return this.authService.loggedIn(); // the token it has been check its expired date and that it is valid
  }

  logout() { // logout method
    localStorage.removeItem('token');
    this.alertify.message('Loged Out');
  }

}

