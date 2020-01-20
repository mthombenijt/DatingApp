import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { AuthService } from '../Services/Auth.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: User[];
  pagination: Pagination;
  likesParam: string;

  constructor(private authService: AuthService,
              private userService: UserService,
              private route: ActivatedRoute, private alertify: AlertifyService ) { }

  ngOnInit() {

    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.users = data['users'].result;
      // tslint:disable-next-line: no-string-literal
      this.pagination = data['users'].pagination;
    } );

    // onload the application is gonna display Likers users
    this.likesParam = 'Likers';


  }

  // load the paginated result of uers when the navigating button click
  loadUsers() {
    this.userService
    .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
    .subscribe(
    (res: PaginatedResult<User[]>) => {
     this.users = res.result; // retriving users
     this.pagination = res.pagination;
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
    this.alertify.error(error); // show error messages
    }
    );
  }

   // pageChanged method that will make the pages navigate
   pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

}
