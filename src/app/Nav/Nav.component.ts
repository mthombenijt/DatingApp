import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/Auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}; // Object which is going to store username and password and send them to a server

  constructor(private authService: AuthService) { } // inject a service to a constructor so that I can use it in a component

  ngOnInit() {
  }

  LogIn() { // login method/function
    this.authService.login(this.model).subscribe(next => {
      console.log('Logged In Successfully');
    }, error => {
      console.log('Failed to Login');
    }
    );

}

   loggedIn() { // loggedin method, metthod which shows that a user has logged in
  const token = localStorage.getItem('token');
  return !!token; // the application will return true or false,true for loggedin,false for not loggedin
}

  logout() { // logout method
    localStorage.removeItem('token');
    console.log('Loged Out');
  }

}

