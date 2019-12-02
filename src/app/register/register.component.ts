import { Component, OnInit, Input, Output, EventEmitter, ɵConsole } from '@angular/core';
import { AuthService } from '../Services/Auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {}; // specify an empty object
  @Output() cancelRegister = new EventEmitter();


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() { // register method to call the register function in authservice
    this.authService.register(this.model).subscribe(() => {
      console.log('registration successful');
    }, error => {console.log(error); }
    );
  }

  cancel() { // cancell method/function
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
