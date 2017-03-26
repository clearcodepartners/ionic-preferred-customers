import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CardPage} from "../card/card";
import {LoginPage} from "../login/login";
import {CustomerService} from "../../app/customer.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public customer: CustomerService) {
    console.log("Home Page Hit");
    if(customer.hasCustomer()) this.toWelcome();
    else this.toLogin();
  }

  toWelcome():void {
    console.log("To Welcome Page");
    this.navCtrl.setRoot(CardPage);
  }

  toLogin():void {
    console.log("To Login Page")
    this.navCtrl.setRoot(LoginPage);
  }

}
