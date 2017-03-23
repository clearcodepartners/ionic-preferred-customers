import {Component, OnInit}                from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService }               from "../../app/api.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html'
})
export class EditPage extends OnInit{
  model:any;
  birthdate: Date;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiService, private _DomSanitizer: DomSanitizer ) {
    super();
  }

  ngOnInit(){
    this.model = Object.assign({},this.api.customer);
    this.birthdate = new Date(this.model.birthdate);
  }

  onCancel(e){
    e.preventDefault();
    this.navCtrl.pop();
    return false;
  }

  onSubmit(e){
    e.preventDefault();
    this.model.birthdate = this.birthdate.getTime();
    this.api.customer = Object.assign({}, this.model);
    //this.api.updateCurrentCustomer();
    return false;
  }

  set humanDate(birthdate:string){
    let sparts:string[] = birthdate.split('-');
    let parts = [ Number(sparts[0]), Number(sparts[1]), Number(sparts[2])];
    let d = new Date(Date.UTC(parts[0], parts[1]-1, parts[2]));
    this.birthdate.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
  }

  get humanDate(){
    return this.birthdate.toISOString().substring(0, 10);
  }

}
