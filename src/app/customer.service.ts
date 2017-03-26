import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {LoggerService} from "./logger.service";
import "rxjs/add/operator/map";
import {NavController, ToastController} from "ionic-angular";

import {Config} from "./config";
import {Customer} from "./Customer.interface";
import {ApiService} from "./api.service";
import {SpinnerDialog} from '@ionic-native/spinner-dialog';


@Injectable()
export class CustomerService {
	public local_storage_name: string = "customer_data";
	public toast_defaults = {showCloseButton: true, closeButtonText: 'Ok', duration: 3000};
	public error: string | null = null;
	public navCtrl: NavController;
	public toastCtrl: ToastController;
	public customer: Customer | null;
	public loginPage;
	public welcomePage;

	constructor(
		public http: Http,
		public log: LoggerService,
		public api: ApiService,
		public config: Config,
	    private spinnerDialog: SpinnerDialog

	) {
		this.loadCustomer();
	}

	hasCustomer() {
		return this.customer !== null;
	}

	flushCustomer() {
		this.customer = null;
		localStorage.removeItem(this.local_storage_name);
	}

	logout():void {
		event.preventDefault();
		this.navCtrl.setRoot(this.loginPage);
		this.flushCustomer();
	}

	login(email): void {
		event.preventDefault();

		this.api.get({email}, ...this.config.api_locations.login)
			.subscribe(
				(data: Customer | null) => {
					if (data == null) this.DisplayInvalid("No Customer Found");
					else {
						this.setCustomer(data);
						this.spinnerDialog.hide();
						this.navCtrl.setRoot(this.welcomePage);
						this.log.info('Login Successful');
					}
				},
				(err) => {
					if(this.config.tries == 0) {
						this.log.info("Attempting Crossorigin");
						this.config.base_url = `https://crossorigin.me/${this.config.base_url}`;
						this.config.tries++;
						this.login(email);
					}
					else {
						this.spinnerDialog.hide();
						this.DisplayError("Error Connecting to API", err);
					}
				},
				() => {}
			);

	}

	setCustomer(customer: Customer) {
		this.customer = customer;
		localStorage.setItem(this.local_storage_name, JSON.stringify(customer));
	}

	loadCustomer() {
		this.customer = JSON.parse(localStorage.getItem(this.local_storage_name));
	}

	DisplayError(str:string, err?) {
		this.log.err(str);
		if (err) this.log.err(err);
		this._doToast({ message: str });
	}

	DisplayInvalid(str:string) {
		this.log.info(str);
		this._doToast({ message: str });
	}

	_doToast(settings){
		const toast = this.toastCtrl.create(Object.assign({}, this.toast_defaults, settings));
		toast.present();
	}

	checkEmail(email){
		return this.api.get({email}, ...this.config.api_locations.login);
	}

	addCustomer(customer: Customer):void {
		this.api.put(customer, ...this.config.api_locations.add).subscribe(
			(data) => {
				this.log.info("Added Customer");
				this.spinnerDialog.hide();
				this.navCtrl.pop();
			},
			(err) => {
				this.spinnerDialog.hide();
				this.DisplayError("There was an error adding the customer", err);
			},
			() => {}
		);
	}

	saveCustomer():void {
		this.log.info("Saving Customer");
		this.api.put_params(this.customer, {preferredCustomerProfileId: this.customer.preferredCustomerProfileId}, ...this.config.api_locations.update)
			.subscribe(
				(data) => {
					this.log.info("Saved Customer");
					this.spinnerDialog.hide();
					this.navCtrl.pop();
				},
				(err) => {
					this.spinnerDialog.hide();
					this.DisplayError("There was an error editing the customer", err);
				},
				() => {}
			);
	}

	updateCustomer(newCustomer: Customer):void {
		this.customer = newCustomer;
		this.saveCustomer();
	}

	getCopy():Customer {
		return Object.assign({}, this.customer);
	}


}
