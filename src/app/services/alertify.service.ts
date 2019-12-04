import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({          // * use alertify as a service globally for notifications
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

confirm(message: string, okCallback: () => any) {

  // tslint:disable-next-line: only-arrow-functions
  alertify.confirm(message, function(e) {
    if (e) {
      okCallback();
    } else {}
  });
}

success(message: string) {
  alertify.success(message);
}

error(message: string) {
  alertify.error(message);
}

warning(message: string) {
  alertify.warning(message);
}

message(message: string) {
  alertify.message(message);
}


}
