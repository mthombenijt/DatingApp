import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/Services/Auth.service';
import { error } from 'util';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})

// get the user as an object (all data of user)
// use the activatedRoute to get the data for the active member
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', {static: false}) editForm: NgForm; // use static : false is the component is not static
  user: User;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }


  constructor(private route: ActivatedRoute, private alert: AlertifyService,
              private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    // get data for the active member
    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.user = data['user'];
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateProfile() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alert.success('Profile update succeded');
      this.editForm.reset(this.user); // to reset the form after the update,to hide the alert msg and button
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      this.alert.error(error);
    }
    );
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;

  }

}
