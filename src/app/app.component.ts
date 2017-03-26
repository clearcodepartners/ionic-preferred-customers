import {Component, ViewChild} from "@angular/core";
import {NavController, Platform, ToastController} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";

import {HomePage} from "../pages/home/home";
import {CustomerService} from "./customer.service";
import {LoggerService} from "./logger.service";
import {LoginPage} from "../pages/login/login";
import {CardPage} from "../pages/card/card";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('myNav') nav: NavController;

  rootPage = HomePage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              customer: CustomerService,
              toastCtrl: ToastController,
              log: LoggerService
  ) {
    log.info("App Opened");
    platform.ready().then(() => {
      log.info("Loading App");
      statusBar.styleDefault();
      splashScreen.hide();

      customer.navCtrl = this.nav;
      customer.toastCtrl = toastCtrl;
      customer.loginPage = LoginPage;
      customer.welcomePage = CardPage;
    });
  }
}
