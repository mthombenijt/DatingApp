import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/Services/Auth.service';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from 'src/app/services/alertify.service';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-Photo-Editor',
  templateUrl: './Photo-Editor.component.html',
  styleUrls: ['./Photo-Editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>(); // output property
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: Photo;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService){ }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new  FileUploader({
      url: this.baseUrl + 'users/' +  this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

   // Method to make the photo to be visible imidiatly after it is uploaded
    this.uploader.onSuccessItem = (item, response, status, hearders) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAded: res.dateAded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);

        if (photo.isMain ) { // check if there is a main photo, if is not there make the pic that you upload to be the main pic
           this.authService.changeMemberPhoto(photo.url); // change photo at the parent component and to the nav bar
           this.authService.currentUser.photoUrl = photo.url;
           localStorage.setItem('user', JSON.stringify(this.authService.currentUser));

        }

      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
     this.currentMain = this.photos.filter(p => p.isMain === true)[0];
     this.currentMain.isMain = false;
     photo.isMain = true;
     this.authService.changeMemberPhoto(photo.url); // change photo at the parent component and to the nav bar
     this.authService.currentUser.photoUrl = photo.url;
     localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      this.alertify.error(error);
    }
    );

  }

  deletePhoto(id: number) {
    this.alertify.confirm('are you sure you want to delete the photo?', () => {
    this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(() => {
    this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
    this.alertify.success('Photo has been deleted');
    }, error => {
      this.alertify.error('Failed to delete the photo');
    });
    });
  }

}
