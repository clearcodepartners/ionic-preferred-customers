import {Component, ViewChild} from '@angular/core';
import {NavController, Platform, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ApiService } from "./api.service";
import {HomePage} from "../pages/home/home";
import {CardPage} from "../pages/card/card";
import {LoginPage} from "../pages/login/login";
import {EditPage} from "../pages/edit/edit";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: NavController;
  rootPage = HomePage;

  constructor(
      platform: Platform,
      statusBar: StatusBar,
      splashScreen: SplashScreen,
      api: ApiService,
      toast: ToastController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      api.setCtrl(this.nav, toast, LoginPage, CardPage, EditPage );
    });
  }
}
