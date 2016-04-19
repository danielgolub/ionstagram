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
export class Photo {
  constructor(public http: Http) {}

	list(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.get(api_url+"/photo/list").subscribe(
				// function sucess
				(response) => {
					resolve(response);
				},

				// function error
				(response) => {
					reject(response);
				}
			);
		});
	}

	create(description: string, base64: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.put(api_url+"/photo/create", JSON.stringify({
				description,
				base64
			})).subscribe(
				(response) => {
					resolve(response);
				},
				(response) => {
					reject(response);
				}
			);
		});
	}
}
