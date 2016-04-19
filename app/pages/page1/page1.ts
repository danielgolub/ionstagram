import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
	test: string = "This is a test"

	click() {
		this.test = "asd"
	}
}
