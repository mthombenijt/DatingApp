import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt'
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'Auth/';
  jwthelper = new JwtHelperService; // this import is for token validation
  decodedToken: any; 
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png'); // use the BehaviorSubject to connect between the components
  currentPhotoUrl = this.photoUrl.asObservable();


constructor(private Http: HttpClient) { }

    changeMemberPhoto(photoUrl: string){ // method to change the photo in the nav component while changing it in main photo
      this.photoUrl.next(photoUrl); //  BehaviourSubject has the NEXT subject
    }

login(model: any){ // model: any from the componet, is gonna take infor to the component
  return this.Http.post(this.baseUrl + 'ligIn', model).pipe( // we call the URL and the function from the controller
    map ((response: any) => { // import map from rxjs/operators
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token); // user we returning from our Api
        localStorage.setItem('user', JSON.stringify(user.user) ); // convert an object to a string using stringify
        this.decodedToken = this.jwthelper.decodeToken(user.token); // change decodeToken to  the normal username 
        this.currentUser = user.user;
        this.changeMemberPhoto(this.currentUser.photoUrl);
      }
    })
  );
}

register(user: User){
  return this.Http.post(this.baseUrl + 'register', user); //returning observable
}

// Token validation
loggedIn(){ // check if the user has loggedin,and check if the token is valid
  const token = localStorage.getItem('token');
  return !this.jwthelper.isTokenExpired(token); // if the token is not expired the method will return true else false

}

}
