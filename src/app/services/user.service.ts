import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from '../_models/user';
import {PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';



 // ** const httpOptions = {headers: new HttpHeaders({

    // tslint:disable-next-line: object-literal-key-quotes
   // 'Authorization': 'Bearer ' + localStorage.getItem('token')})}; */

@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

// use the parameters to get users fom a controller
getUsers(page?, itemsPerPage?, userParams?, likesParam?): Observable<PaginatedResult<User[]>> {
  // add pagination to the list users
  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

  // tslint:disable-next-line: new-parens
  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if (userParams != null) {
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
  }

  if (likesParam === 'Likers') {
    params = params.append('likers', 'true');
  }

  if (likesParam === 'Likees') {
    params = params.append('likees', 'true');

  }

  // request for list of users and add the list of users to pagination
  return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params})
  .pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination') );
      }

      return paginatedResult;
    })
  );
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

deletePhoto(userId: number, id: number) {
  return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
}

sendLike(id: number, recipientId: number) {
  return this.http.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {});
}




}
