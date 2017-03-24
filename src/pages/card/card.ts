import {Component} from "@angular/core";
import {CustomerService} from "../../app/customer.service";
import {NavController, NavParams} from "ionic-angular";
import {EditPage} from "../edit/edit";

@Component({
	selector: 'page-card',
	templateUrl: 'card.html'
})
export class CardPage {

	constructor(public customer: CustomerService, public navCtrl: NavController, public navParams: NavParams) {}

	logout(e){
		e.preventDefault();
		this.customer.logout();
	}

	edit(e){
		e.preventDefault();
		this.navCtrl.push(EditPage);
	}

}