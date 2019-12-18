import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize } from 'ngx-gallery';

@Component ({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  gallaryOptions: NgxGalleryOptions[];
  gallaryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit(){
    // this.loadUser();
    // use the route resolver to get the data/user instead of the laoduser method,
    // to avoid using safe navigation '?'
    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.user = data['user'];
    });

    this.gallaryOptions = [  // image configuarations
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.gallaryImages = this.getImages(); // contain the array of images

  }

  getImages() {  // method that contain the array of images
    const imageUrl = [];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.user.photos.length; i++) { // for loop that gets the images from the database
      imageUrl.push({
       small: this.user.photos[i].url,
       medium: this.user.photos[i].url,
       big: this.user.photos[i].url,
       description: this.user.photos[i].description,
      });

    }
    return imageUrl;
  }

 // loadUser() {
   // tslint:disable-next-line: no-string-literal
   // this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) => {
   // this.user = user;
   // tslint:disable-next-line: no-shadowed-variable
  // }, error => {
  //   this.alertify.error(error); }
  // );
// }

}
