import {Component} from "@angular/core";
import {CustomerService} from "../../app/customer.service";
import {NavController, NavParams} from "ionic-angular";
import {EditPage} from "../edit/edit";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";

@Component({
	selector: 'page-card',
	templateUrl: 'card.html'
})
export class CardPage {

	constructor(
		public customer: CustomerService,
		public navCtrl: NavController,
		public navParams: NavParams,
		private nativePageTransitions: NativePageTransitions
	) {
		console.log("Card Page Hit");
	}

	flipped:boolean = false;

	flip(){
		setTimeout(() => {
			this.flipped = !this.flipped;
		}, 10);
		let options: NativeTransitionOptions = {
			direction: 'left',
			duration: 1000,
			iosdelay: 20,
		};
		this.nativePageTransitions.flip(options)
			.then(() => {

			})
			.catch(() => {
				console.log("Error");

			});
	}

	logout(e){
		e.preventDefault();
		this.customer.logout();
	}

	edit(e){
		e.preventDefault();
		this.navCtrl.push(EditPage);
	}

}