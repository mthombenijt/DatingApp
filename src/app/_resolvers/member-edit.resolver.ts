import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { error } from 'util';
import { AuthService } from '../Services/Auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
    /**
     *
     */
    constructor(private userService: UserService, private route: Router,
                private alert: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        // tslint:disable-next-line: no-string-literal
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            // pipe method it s used only to fetch errors
            // tslint:disable-next-line: no-shadowed-variable
            catchError(error => {
                this.alert.error('Problem Retriving your Data');
                this.route.navigate(['/members']);
                return of(null);
            })
        );
    }

}
