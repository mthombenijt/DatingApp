import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-Nav',
  templateUrl: './Nav.component.html',
  styleUrls: ['./Nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {}; // Object which is going to store username and password and send them to a server

  constructor() { }

  ngOnInit() {
  }

  LogIn(){
    console.log(this.model);

  }

}
