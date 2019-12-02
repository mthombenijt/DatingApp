import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {}; // specify an empty object

  constructor() { }

  ngOnInit() {
  }

  register(){
    console.log(this.model);
  }

  cancel() {
    console.log('cancelled');
  }

}
