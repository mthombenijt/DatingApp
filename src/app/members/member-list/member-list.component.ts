import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../services/alertify.service';
import { User } from '../../_models/user';
import { error } from 'util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadUsers();
    // use the route resolver to retrive the users instead of the loadUser method

    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.users = data['users'];
    });

  }

  // loadUsers() {
  //  this.userService.getUsers().subscribe((users: User[]) => {
  //  this.users = users; // retriving users
  // tslint:disable-next-line: no-shadowed-variable
  //  }, error => {
  //    this.alertify.error(error); // show error messages
  //  }
  //  );
  }




