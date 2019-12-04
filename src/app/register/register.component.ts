import { Component, OnInit, Input, Output, EventEmitter, ɵConsole } from '@angular/core';
import { AuthService } from '../Services/Auth.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {}; // specify an empty object
  @Output() cancelRegister = new EventEmitter();


  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() { // register method to call the register function in authservice
    this.authService.register(this.model).subscribe(() => {
    this.alertify.success('registration successful');
    }, error => {
    this.alertify.error(error); }
    );
  }

  cancel() { // cancell method/function
    this.cancelRegister.emit(false);

  }

}
