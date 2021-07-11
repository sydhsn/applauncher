import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [InAppBrowser, AppAvailability]
})
export class HomePage {
  
  constructor(private appAvailability: AppAvailability, private platform: Platform, private iab: InAppBrowser) {

  }

  openApp() {
    let app: string;
    if (this.platform.is('android')) {
      app = 'com.facebook.katana';

    this.appAvailability.check(app)
      .then(
        (yes: boolean) => {
          let sApp = (window as any).startApp.set({
            "package": app
          });
          sApp.start();
        },
        (no: boolean) => {
          let target = "_system";
          this.iab.create('https://play.google.com/store/apps/details?id=com.facebook.katana', target);
        }
      );
    }

      if (this.platform.is('ios')) {
        app = 'app.facebook.katana';  
      this.appAvailability.check(app)
        .then(
          (yes: boolean) => {
            let sApp = (window as any).startApp.set({
              "package": app
            });
            sApp.start();
          },
          (no: boolean) => {
            let target = "_system";
            this.iab.create('https://apps.apple.com/in/app/facebook/id284882215', target);
          }
        );
      }
  }
    
  
}