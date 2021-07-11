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
  openAppUrl(app: string, name: string, id?: string) {
    switch (app) {
        case 'facebook':
            this.launchApp(
              'fb://', 'com.facebook.katana',
              'fb://profile/' + id,
              'fb://page/' + id,
              'https://play.google.com/store/apps/details?id=com.facebook.katana');
            break;
        case 'instagram':
            this.launchApp(
              'instagram://',
              'com.instagram.android',
              'instagram://user?username=' + name,
              'instagram://user?username=' + name,
              'https://play.google.com/store/apps/details?id=com.instagram.android');
            break;
        case 'twitter':
            this.launchApp(
              'twitter://', 'com.twitter.android',
              'twitter://user?screen_name=' + name,
              'twitter://user?screen_name=' + name,
              'https://play.google.com/store/apps/details?id=com.twitter.android');
            break;
        default:
            break;
      }
  }

private launchApp(iosApp: string, androidApp: string, appUrlIOS: string, appUrlAndroid: string, webUrl: string) {
    let app: string;
    let appUrl: string;
    // check if the platform is ios or android, else open the web url
    if (this.platform.is('ios')) {
      app = iosApp;
      appUrl = appUrlIOS;
    } else if (this.platform.is('android')) {
      app = androidApp;
      appUrl = appUrlAndroid;
    } else {
      this.iab.create(webUrl, '_system');
      return;
    }
    this.appAvailability.check(app).then(
        () => {
            // success callback, the app exists and we can open it
            this.iab.create(appUrl, '_system');
        },
        () => {
            // error callback, the app does not exist, open regular web url instead
            this.iab.create(webUrl, '_system');
        }
    );
}
    
  
}