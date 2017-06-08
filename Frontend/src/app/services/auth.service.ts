import { Http, Headers, RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Router } 		from '@angular/router';

//import { MdSnackBar } from '@angular/material'

@Injectable()
export class AuthService {

	BASE_URL = 'http://localhost:5000';
	//NAME_KEY = 'name';
	//TOKEN_KEY = 'token';


	constructor(private http:Http, 
			    private router:Router,
			    private authHttp:AuthHttp ) {}

	//get name() {
	//	return localStorage.getItem(this.NAME_KEY);
	//}

	isAuthenticated() : boolean{
		return !!localStorage.getItem('token') && tokenNotExpired();
	}

	login(user) {
		// Parse user into json
		let send = {
			'username': user.username, 
			'password': user.password };
			
		localStorage.setItem("test", "test");

		// send  the data
		console.log("Sending: " + JSON.stringify(send));
		
		
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
		this.http.post(this.BASE_URL + '/login', 
			send, 
			options)
			.map((response: Response) => response.json())
			.subscribe( 
				result => {
					let token = result.access_token;
					console.log("Token received: " + token);
					console.log("Id: " + result.id);
					localStorage.setItem("token", token);
					localStorage.setItem("id", result.id)
				},
				error => console.log(error) 
			);
			
		this.router.navigate(['/']);	
	}

	async register(user) {
		try {
			// Parse user into json
			let send = {
				'username': user.username, 
				'password': user.password };
			

			// send  the data
			console.log("Sending: " + JSON.stringify(send));

			let headers = new Headers({ 'Content-Type': 'application/json' });
    		let options = new RequestOptions({ headers: headers });
			let response = await this.http.post(this.BASE_URL + '/signup', send, options).toPromise();
			
			// log response
			console.log(response);
			this.router.navigate(['/login']);

			
		} catch (error) {
			this.handleError("Unable to create new user");
		}
	}

	logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('id');

		this.router.navigate(['/']);
	}

	private handleError (error: Response | any) {
      // In a real world app, you might use a remote logging infrastructure
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
    }
}