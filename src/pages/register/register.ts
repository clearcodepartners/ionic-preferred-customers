import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {CustomerService} from "../../app/customer.service";
import {DomSanitizer} from "@angular/platform-browser";
import {LoggerService} from "../../app/logger.service";
import {Config} from "../../app/config";
import {Camera} from "ionic-native";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage extends OnInit {

  model: any;
  birthdate: Date | null;

  constructor(public navCtrl: NavController, public customer: CustomerService, private _DomSanitizer: DomSanitizer, private log: LoggerService, public config: Config) {
    super();
  }

  ngOnInit():void {
    this.model = {
    	preferredCustomerProfileId: null,
	    customerDimId: null,
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
	    createDate: null,
	    updateDate: null,
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
    this.model.birthdate = this.birthdate.getTime();
    this.customer.addCustomer(Object.assign({}, this.model));

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