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
  constructor(
    private platform: Platform,
    private inAppBrowser: InAppBrowser,
    private appAvailability: AppAvailability
  ) { }
  socialMedia(type) {
    switch (type) {
      case 'FACEBOOK': {
        this.openFacebook('saichoclate', 'https://www.facebook.com/saichoclate/');
        break;
      }
      case 'INSTAGRAM': {
        this.openInstagram('sai_kumar_korthivada_skk')
        break;
      }
      case 'TWITTER': {
        this.openTwitter('korthivadasai');
        break;
      }
    }
  }
  openTwitter(name: string) {
    let app: string;
    if (this.platform.is('ios')) {
      app = 'twitter://';
    } else if (this.platform.is('android')) {
      app = 'com.twitter.android';
    } else {
      this.openInApp('https://twitter.com/' + name);
      return;
    }
    this.appAvailability.check(app)
      .then((res) => {
        const data = 'twitter://user?screen_name=' + name;
        this.openInApp(data);
      }
      ).catch(err => {
        this.openInApp('https://twitter.com/' + name);
      });
  }
  openFacebook(name: string, url: string) {
    let app: string;
    if (this.platform.is('ios')) {
      app = 'fb://';
    } else if (this.platform.is('android')) {
      app = 'com.facebook.katana';
    } else {
      this.openInApp('https://www.facebook.com/' + name);
      return;
    }
    this.appAvailability.check(app)
      .then(res => {
        const fbUrl = 'fb://facewebmodal/f?href=' + url;
        this.openInApp(fbUrl);
      }
      ).catch(() => {
        this.openInApp('https://www.facebook.com/' + name);
      });
  }
  openInApp(url: string) {
    this.inAppBrowser.create(url, '_system')
  }
  openInstagram(name: string) {
    let app: string;
    if (this.platform.is('ios')) {
      app = 'instagram://';
    } else if (this.platform.is('android')) {
      app = 'com.instagram.android';
    } else {
      this.openInApp('https://www.instagram.com/' + name);
      return;
    }
    this.appAvailability.check(app)
      .then((res) => {
        this.openInApp('instagram://user?username=' + name);
      }
      ).catch(err => {
        this.openInApp('https://www.instagram.com/' + name);
      });
  }
}