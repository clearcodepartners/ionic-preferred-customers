import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiService } from "../../app/api.service";
import {EditPage} from "../edit/edit";

@Component({
  selector: 'page-card',
  templateUrl: 'card.html'
})
export class CardPage {

  edit:EditPage;

  constructor(
      public navCtrl: NavController,
      public api: ApiService
  ) {
    this.edit = api.edit_page;
  }

}
