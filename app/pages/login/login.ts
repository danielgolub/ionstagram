import {Storage, LocalStorage, Alert, Page, NavController} from 'ionic-angular';
import {User} from '../../providers/user/user';
import {TabsPage} from '../tabs/tabs';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/login/login.html',
	providers: [ User ]
})
export class LoginPage {
	username: string;
	password: string;

	storage: Storage;

  constructor(public nav: NavController, private user: User) {
    this.nav = nav;

		this.username = "";
		this.password = "";

		this.storage = new Storage(LocalStorage)
  }

	login(): void {
		if (!this.username.length || !this.password.length) {
			let alert = Alert.create({
				title: "Oops",
				subTitle: "You forgot to enter your username and password",
				buttons: [ "OK" ]
			});
			this.nav.present(alert);
			return ;
		}

		this.user.login(this.username, this.password).then((response) => {
			this.storage.setJson("user", response);
			this.nav.push(TabsPage);
		}).catch((object: { title: string, subTitle: string, buttons: Array<any> }) => {
			let alert = Alert.create({
				title: object.title,
				subTitle: object.subTitle,
				buttons: object.buttons
			});
			this.nav.present(alert);
			return ;
		})
	}
}
