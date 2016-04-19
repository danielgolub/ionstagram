import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {api_url} from '../backend/backend';

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class User {
  constructor(public http: Http) {}

	login(username: string, password: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.get(api_url+"/user/login", {
				search: "username={username}&password={password}".replace("{username}", username).replace("{password}", password)
			}).subscribe(
				// function sucess
				(response) => {
					resolve(response.json());
				},

				// function error
				(response) => {
					var obj: Object;
					switch(response.status) {
						// conflict
						case 404:
							obj = {
								title: "Oops",
								subTitle: "User don't exists",
								buttons: [ "OK" ]
							};
							break;
					}
					reject(obj);
				}
			);
		});
	}

	register(username: string, password: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.put(api_url+"/user/register", JSON.stringify({
				username,
				password
			})).subscribe(
				(response) => {
					resolve(response);
				},
				(response) => {
					var obj: Object;
					switch(response.status) {
						// conflict
						case 409:
							obj = {
								title: "Oops",
								subTitle: "User already exists",
								buttons: [ "OK" ]
							};
							break;
					}
					reject(obj);
				}
			);
		});
	}
}
