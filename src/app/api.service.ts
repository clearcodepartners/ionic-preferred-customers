import { Http, Headers}	        from '@angular/http';
import { Injectable }	        from '@angular/core';
import { LoggerService }        from './logger.service';
import { Observable }           from 'rxjs';
import 'rxjs/add/operator/map';
import {NavController, ToastController} from 'ionic-angular';

import { Config }               from './config';
import { Customer }             from "./Customer.interface";
import {CardPage} from "../pages/card/card";
import {LoginPage} from "../pages/login/login";
import {EditPage} from "../pages/edit/edit";

@Injectable()
export class ApiService {
	public apiUrl:string;
	public error:string|null = null;
	public navCtrl: NavController;
	public toastCtrl: ToastController;
	public login_page: LoginPage;
	public welcome_page: CardPage;
	public edit_page: EditPage;

	constructor ( public http: Http, public log: LoggerService, public config: Config) {
		this.apiUrl = config.base_url;
		this.loadCustomer();
	}

	setCtrl(nav:NavController, toast:ToastController, login, card, edit){
		this.navCtrl = nav;
		this.toastCtrl = toast;
		this.login_page = login;
		this.welcome_page = card;
		this.edit_page = edit;
	}

	url (...segments) {
		let url = this.apiUrl;
		for (let segment of segments) url += `/${segment}`;
		return url;
	};

	params (params = {}) {

		let url = '?';
		let i = 0;
		for (let param in params) {
			if(i != 0) url += "&";
			url += `${param}=${params[param]}`;
			i++;
		}
		return url;
	};

	getHeaders (){
		return new Headers({
			'Content-Type': 'application/json',
			// 'x-access-token' : this.token
		});
	}

	_get (...segments) {
		return this.http.get(
			this.url(...segments),
			{ headers: this.getHeaders() })
			.map(response => response.json());
	}

	_post (data = {}, ...segments) {
		return this.http.post(
			this.url(...segments),
			JSON.stringify(data),
			{headers: this.getHeaders()})
			.map(response => response.json());
	}

	_put (data = {}, ...segments) {
		return this.http.put(
			this.url(...segments),
			JSON.stringify(data),
			{headers: this.getHeaders()})
			.map(response => response.json());
	}

	_delete (...segments) {
		return	this.http.delete(
			this.url(...segments),
			{ headers: this.getHeaders() });
	}


	get( params = {}, ...segments){
		return this._get(...segments, this.params(params));
	}


	public customer:Customer|null;

	hasCustomer() {
		return this.customer !== null;
	}

	flushCustomer() {
		this.customer = null;
		localStorage.removeItem('customer');
		this.navCtrl.setRoot(this.login_page);
	}

	logout(event) {
		event.preventDefault();
		this.flushCustomer();
	}

	login(event, email){
		event.preventDefault();
		this.get({email},'preferredcustomerprofile','byemail')
			.subscribe(
				(data:Customer|null) => {
					if(data == null){
						this.log.info("No Customer Found");
						this.error = "No Customer Found";
						this.DisplayLoginError();
					}
					else {
						this.setCustomer(data);

						this.navCtrl.setRoot(this.welcome_page);

						this.log.info('Login Successful');
					}
				},
				() => {
					this.error = "No Customer Found with that email address";
					this.log.info('Login Failed');
				},
				() => {
					this.log.info('Login Complete')
				}
			);
	}

	setCustomer(customer:Customer) {
		this.customer = customer;
		localStorage.setItem('customer', JSON.stringify(customer));
	}

	loadCustomer() {
		this.customer = JSON.parse(localStorage.getItem('customer'));
	}

	DisplayLoginError() {
		const toast = this.toastCtrl.create({
			message: this.error,
			showCloseButton: true,
			closeButtonText: 'Ok'
		});
		toast.present();
	}

	DisplayError() {
		const toast = this.toastCtrl.create({
			message: this.error,
			showCloseButton: true,
			closeButtonText: 'Ok'
		});
		toast.present();
	}


	addCustomer(customer:Customer){
		return this._put(customer, "preferredcustomerprofile", "add");
	}

	updateCustomer(customer:Customer){
		return this._put(customer, "preferredcustomerprofile", "update", this.params({preferredCustomerProfileId:customer.preferredCustomerProfileId}))
			.subscribe(
				(data) => {
					console.log(data);
					console.log("Edited Customer");
					this.navCtrl.pop();
				},
				(err) => {
					console.log(err)
					console.log("Error Editing");
					this.error = "Error Editing";
					this.DisplayError();
				},
				() => {
					console.log("Done Editing");
				}
			);
	}

	updateCurrentCustomer(){
		return this.updateCustomer(this.customer);
	}



}
