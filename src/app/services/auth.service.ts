import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:59514/api/Auth/';


constructor(private Http: HttpClient) { }

login(model: any){ // model: any from the componet, is gonna take infor to the component
  return this.Http.post(this.baseUrl + 'ligIn', model).pipe( // we call the URL and the function from the controller
    map ((response: any) => { // import map from rxjs/operators
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token); // user we returning from our Api
      }
    })
  );



}

}
