import { Component, OnInit, Input, Output, EventEmitter, ɵConsole } from '@angular/core';
import { AuthService } from '../Services/Auth.service';
import { AlertifyService } from '../services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>; // use it to change the theme of the calendar



  constructor(private authService: AuthService, private alertify: AlertifyService,
              private fb: FormBuilder, private rout: Router) { }

  ngOnInit() {
   this.createRegisterForm();
   this.bsConfig = {
     containerClass: 'theme-blue'
   };
  }

  createRegisterForm() {
     // FormGroup contains FormControls and formcontrols are basically our  fields that we will use in our form
    // I used the formbuilder for validation 

    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required,
                     Validators.minLength(4), Validators.maxLength(8)]], // for more than one validation use array validators
                     // I have to use custome validation for password confirmation, angular doesnt have password confirmation validators
      confirmPassword: ['', Validators.required]

    }, {validators: this.passwordMatchValidator}); // call the customer validation method to globally
  }

  // method to check that the password is the same as the confirmation
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }

  register() {
    if (this.registerForm.valid) {
      // use java script object.assign method to copy the data from register form and assign it to user object
      this.user = Object.assign({}, this.registerForm.value); // NB
      this.authService.register(this.user).subscribe(() => {
      this.alertify.success('Registration is Success');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.rout.navigate(['/members']);
        });
      } );

    }

    
    
    // register method to call the register function in authservice
    // this.authService.register(this.model).subscribe(() => {
    // this.alertify.success('registration successful');
    // }, error => {
    // this.alertify.error(error); }
    // );
    console.log(this.registerForm.value);
  }

  cancel() { // cancell method/function
    this.cancelRegister.emit(false);

  }

}
