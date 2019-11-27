import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { HttpClient } from 'selenium-webdriver/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  values: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues(); // call the values method to load when you run the application
  }

  getValues() {
    this.http.get('http://localhost:59514/api/values').subscribe(Response => {
      this.values = Response; }, // the data will be storred on a values
     error => {
       return console.log('Error' + error);
     }
     );
  }

}
