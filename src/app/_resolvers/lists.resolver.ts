import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { error } from 'util';

@Injectable()
export class ListsResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 5;
    likesParam = 'Likers'; // set initially to likers, list of users who like the current logged in user

    constructor(private userService: UserService, private route: Router,
                private alert: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        // tslint:disable-next-line: no-string-literal
        return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParam).pipe(
            // pipe method it s used only to fetch errors
            // tslint:disable-next-line: no-shadowed-variable
            catchError(error => {
                this.alert.error('Problem Retriving Data');
                this.route.navigate(['/home']);
                return of(null);
            })
        );
    }

}
