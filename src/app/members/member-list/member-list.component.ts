import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../services/alertify.service';
import { User } from '../../_models/user';
import { error } from 'util';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult } from 'src/app/_models/pagination';
import {Pagination} from '../../_models/pagination';
  

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user')); // get users and convert them to an object,drop down
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}]; // drop down gender
  userParams: any = {}; // user params of type any is equal to an object
  pagination: Pagination;

  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadUsers();
    // use the route resolver to retrive the users instead of the loadUser method

    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.users = data['users'].result;
      // tslint:disable-next-line: no-string-literal
      this.pagination = data['users'].pagination; // adding the list of users to pagination
    });

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';

  }

  // pageChanged method that will make the pages navigate
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilter() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();

  }

  // load the paginated result of uers when the navigating button click
    loadUsers() {
    this.userService
    .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
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

  // loadUsers with out using resolver
  // loadUsers() {
  //  this.userService.getUsers().subscribe((users: User[]) => {
  //  this.users = users; // retriving users
  // tslint:disable-next-line: no-shadowed-variable
  //  }, error => {
  //    this.alertify.error(error); // show error messages
  //  }
  //  );
  }




