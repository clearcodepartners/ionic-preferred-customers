import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {CustomerService} from "../../app/customer.service";
import {DomSanitizer} from "@angular/platform-browser";
import {LoggerService} from "../../app/logger.service";
import {Config} from "../../app/config";
import {Camera} from "ionic-native";
import {Customer} from "../../app/Customer.interface";
import {SpinnerDialog} from '@ionic-native/spinner-dialog';


@Component({
	selector: 'page-register',
	templateUrl: 'register.html'
})
export class RegisterPage extends OnInit {

	email_exists:boolean = false;

	model: any;
	birthdate: Date | null;

	constructor(
		public navCtrl: NavController,
		public customer: CustomerService,
		private _DomSanitizer: DomSanitizer,
		private log: LoggerService,
		public config: Config,
		private spinnerDialog: SpinnerDialog
	) {
		super();
	}

	ngOnInit():void {
		this.model = {
			preferredCustomerProfileId: "",
			customerDimId: "",
			firstName: "",
			lastName:  "",
			phoneNumber:  "",
			emailAddress:  "",
			birthdate: null,
			addressLine1:  "",
			addressLine2:  "",
			city:  "",
			state:  "",
			zipCode:  "",
			country:  "",
			profilePicture:  "",
			createDate: new Date().toISOString(),
			updateDate: new Date().toISOString(),
			promoCode:  "",
		};
		this.birthdate = new Date();

	}

	onCancel(e):void {
		e.preventDefault();
		this.navCtrl.pop();

	}

	onSubmit(e):void {
		e.preventDefault();
		this.spinnerDialog.show("Please Wait", "Checking Email Address");
		this.model.birthdate = this.birthdate.getTime();
		this.customer.checkEmail(this.model.emailAddress)
			.subscribe(
			(data: Customer | null) => {
				if (data == null) this.createCustomer();
				else this.emailExists();
			},
			(err) => { this.customer.DisplayError("Error Connecting to API", err); },
			() => {}
		);
	}

	createCustomer():void{
		this.spinnerDialog.hide();
		this.spinnerDialog.show("Please Wait", "Adding User");
		this.customer.addCustomer(Object.assign({}, this.model));
	}

	emailExists():void {
		this.email_exists = true;
		this.spinnerDialog.hide();
	}

	backHome(e){
		e.preventDefault();

		this.navCtrl.pop();
	}

	set humanDate(birthdate: string) {
		let parts: string[] = birthdate.split('-');
		this.birthdate.setFullYear(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
	}

	get humanDate():string|null {
		return this.birthdate ? this.birthdate.toISOString().substring(0, 10) : null;
	}

	get imageString() {
		let pic:string = this.model.profilePicture ? this.model.profilePicture : this.config.defaultPicture;
		return this._DomSanitizer.bypassSecurityTrustStyle(`url(data:image/false;base64,${pic})`);
	}

	choosePicture(e):void {
		e.preventDefault();

		Camera.getPicture(Object.assign({}, this.config.picture.base, this.config.picture.upload)).then(
			(imageData) => { this.model.profilePicture = imageData; },
			(err) => { this.log.err(err); }
		);
	}

	takePicture(e):void {
		e.preventDefault();

		Camera.getPicture(Object.assign({}, this.config.picture.base, this.config.picture.take)).then(
			(imageData) => { this.model.profilePicture = imageData; },
			(err) => { this.log.err(err); }
		);
	}

}