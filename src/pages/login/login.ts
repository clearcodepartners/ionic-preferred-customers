import {Component} from "@angular/core";
import {ModalController, NavController} from "ionic-angular";
import {TermsPage} from "../terms/terms";
import {CustomerService} from "../../app/customer.service";
import {LoginFields} from "../../app/LoginFields.interface";
import {LoggerService} from "../../app/logger.service";
import {RegisterPage} from "../register/register";
import {SpinnerDialog} from '@ionic-native/spinner-dialog';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {

	model: LoginFields;

	constructor(
		public customer: CustomerService,
		public modalCtrl: ModalController,
		public log: LoggerService,
		public navCtrl: NavController,
		private spinnerDialog: SpinnerDialog
	) {
		this.model = {email: ""};
	}

	onSubmit(e) {
		e.preventDefault();
		this.spinnerDialog.show("Please Wait", "Logging In");
		this.log.info("Logging in as: ");
		this.log.info(this.model);
		this.customer.login(this.model.email);
		return false;
	}

	showTerms(e) {
		e.preventDefault();
		let modal = this.modalCtrl.create(TermsPage);
		modal.present();
	}

	register(e){
		e.preventDefault();
		this.navCtrl.push(RegisterPage);
	}
}
