import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/Auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}; // Object which is going to store username and password and send them to a server

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  LogIn() {
    this.authService.login(this.model).subscribe(next => {
      console.log('Logged In Successfully');
    }, error => {
      console.log('Failed to Login');
    }
    );

}

   loggedIn() {
  const token = localStorage.getItem('token');
  return !!token; // the application will return true or false,true for loggedin,false for not loggedin
}

  logout() {
    localStorage.removeItem('token');
    console.log('Loged Out');
  }

}

