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

	list(photoId: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.get(api_url+"/photo/{photoId}/comment/list".replace("{photoId}", photoId)).subscribe(
				// function sucess
				(response) => {
					resolve(response);
				},

				// function error
				(response) => {
					var obj: Object;
					switch(response.status) {
						// conflict
						case 404:
							obj = {
								title: "Oops",
								subTitle: "Photo don't exists",
								buttons: [ "OK" ]
							};
							break;
					}
					reject(obj);
				}
			);
		});
	}

	create(photoId, text: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.put(api_url+"/photo/{photoId}/comment/create", JSON.stringify({
				text,
			})).subscribe(
				(response) => {
					resolve(response);
				},
				(response) => {
					var obj: Object;
					switch(response.status) {
						// conflict
						case 404:
							obj = {
								title: "Oops",
								subTitle: "Photo don't exists",
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
