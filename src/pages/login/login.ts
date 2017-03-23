import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import {ApiService} from "../../app/api.service";
import {TermsPage} from "../terms/terms";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  model:any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public api: ApiService,
      public popoverCtrl: PopoverController
  ){
    this.model = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSubmit(e){
    e.preventDefault();
    this.api.login(e, this.model.email);
    return false;
  }

  showTerms(e){
    let popover = this.popoverCtrl.create(TermsPage);
    popover.present();
  }
}
