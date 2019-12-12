import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'Auth/';
  jwthelper = new JwtHelperService; // this import is for token validation
  decodedToken: any; 


constructor(private Http: HttpClient) { }

login(model: any){ // model: any from the componet, is gonna take infor to the component
  return this.Http.post(this.baseUrl + 'ligIn', model).pipe( // we call the URL and the function from the controller
    map ((response: any) => { // import map from rxjs/operators
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token); // user we returning from our Api
        this.decodedToken = this.jwthelper.decodeToken(user.token); // change decodeToken to  the normal username 
        console.log(this.decodedToken);
      }
    })
  );
}

register(model: any){
  return this.Http.post(this.baseUrl + 'register', model); //returning observable
}

// Token validation
loggedIn(){ // check if the user has loggedin,and check if the token is valid
  const token = localStorage.getItem('token');
  return !this.jwthelper.isTokenExpired(token); // if the token is not expired the method will return true else false

}

}
