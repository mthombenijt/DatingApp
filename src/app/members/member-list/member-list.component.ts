import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../services/alertify.service';
import { User } from '../../_models/user';
import { error } from 'util';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
    this.users = users; // retriving users
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      this.alertify.error(error); // show error messages
    }
    );
  }



}
