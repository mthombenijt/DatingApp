import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from '../_models/user';



 // ** const httpOptions = {headers: new HttpHeaders({

    // tslint:disable-next-line: object-literal-key-quotes
   // 'Authorization': 'Bearer ' + localStorage.getItem('token')})}; */

@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getUsers(): Observable<User[]> {

  return this.http.get<User[]>(this.baseUrl + 'Users'); // request for list of users
}

getUser(id): Observable<User> {

  return this.http.get<User>(this.baseUrl + 'Users/' + id); // request for a single user
}

updateUser(id: number, user: User){
  return this.http.put(this.baseUrl + 'Users/' + id, user);
}

setMainPhoto(userId: number, id: number) {

  // put the {} just to replace the headers which are required for the post
  return this.http.post(this.baseUrl + 'Users/' + userId + '/photos/' + id + '/isMain', {});
}




}
