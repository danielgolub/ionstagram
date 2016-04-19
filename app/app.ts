import 'es6-shim';
import {App, Platform, LocalStorage, Storage} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  rootPage: any = TabsPage;
	storage: Storage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

		this.storage = new Storage(LocalStorage);

		// get user
		this.storage.getJson("user").then((result) => {
			if(!result) {
				this.rootPage = LoginPage;
			}
		})
  }
}
