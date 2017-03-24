import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {MyApp} from "./app.component";
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {TermsPage} from "../pages/terms/terms";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {LoggerService} from "./logger.service";
import {ApiService} from "./api.service";
import {Config} from "./config";
import {QRCodeModule} from "angular2-qrcode";


import {CardPage} from "../pages/card/card";
import {EditPage} from "../pages/edit/edit";
import {CustomerService} from "./customer.service";
import {RegisterPage} from "../pages/register/register";

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		LoginPage,
		CardPage,
		TermsPage,
		EditPage,
		RegisterPage
	],
	imports: [
		IonicModule.forRoot(MyApp),
		QRCodeModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		LoginPage,
		CardPage,
		TermsPage,
		EditPage,
		RegisterPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		LoggerService,
		ApiService,
		Config,
		CustomerService,
		{provide: ErrorHandler, useClass: IonicErrorHandler}
	]
})
export class AppModule {
}
