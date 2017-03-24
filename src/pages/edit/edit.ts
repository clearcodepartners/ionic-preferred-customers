import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {DomSanitizer} from "@angular/platform-browser";
import {Camera} from "ionic-native";
import {CustomerService} from "../../app/customer.service";
import {LoggerService} from "../../app/logger.service";
import {Config} from "../../app/config";

@Component({
	selector: 'page-edit',
	templateUrl: 'edit.html'
})
export class EditPage extends OnInit {
	model: any;
	birthdate: Date;

	constructor(public navCtrl: NavController, public customer: CustomerService, private _DomSanitizer: DomSanitizer, private log: LoggerService, public config: Config) {
		super();
	}

	ngOnInit() {
		this.model = this.customer.getCopy();
		this.birthdate = new Date(this.model.birthdate);
	}

	onCancel(e) {
		e.preventDefault();
		this.navCtrl.pop();
		return false;
	}

	onSubmit(e) {
		e.preventDefault();
		this.model.birthdate = this.birthdate.getTime();
		this.customer.updateCustomer(Object.assign({}, this.model));
		return false;
	}

	set humanDate(birthdate: string) {
		let parts: string[] = birthdate.split('-');
		this.birthdate.setFullYear(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
	}

	get humanDate() {
		return this.birthdate.toISOString().substring(0, 10);
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
