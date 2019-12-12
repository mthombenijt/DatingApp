import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {observable} from 'rxjs';

const httpOptions =

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getUsers(): observable<User[]>{

  return this.http.get<User[]>(this.baseUrl + 'users');
}

getUser(id): observable<User>{

  return this.http.get<User>(this.baseUrl + 'users/' + id);
}

}
