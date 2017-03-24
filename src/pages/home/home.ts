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

  constructor(public navCtrl: NavController, public customer: CustomerService ) {
    if(customer.hasCustomer()) navCtrl.setRoot(CardPage);
    else navCtrl.setRoot(LoginPage);
  }

}
