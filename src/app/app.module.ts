import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {MyApp} from "./app.component";
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contact/contact";
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {TermsPage} from "../pages/terms/terms";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {LoggerService} from "./logger.service";
import {ApiService} from "./api.service";
import {Config} from "./config";

import {CardPage} from "../pages/card/card";
import {EditPage} from "../pages/edit/edit";

@NgModule({
	declarations: [
		MyApp,
		AboutPage,
		ContactPage,
		HomePage,
		LoginPage,
		CardPage,
		TermsPage,
		EditPage
	],
	imports: [
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		AboutPage,
		ContactPage,
		HomePage,
		LoginPage,
		CardPage,
		TermsPage,
		EditPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		LoggerService,
		ApiService,
		Config,

		{provide: ErrorHandler, useClass: IonicErrorHandler}
	]
})
export class AppModule {
}
