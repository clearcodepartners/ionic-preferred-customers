import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {ApiService} from "../../app/api.service";
import {CardPage} from "../card/card";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public api:ApiService, public navParams: NavParams) {
    if(api.hasCustomer()) navCtrl.setRoot(CardPage);
    else navCtrl.setRoot(LoginPage);
  }

}
