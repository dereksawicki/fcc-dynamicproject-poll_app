import { Http, Headers, RequestOptions, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

import { PollQuestion } from '../models/poll_question';
import { PollAnswer }   from '../models/poll_answer';
import { Poll } from '../models/poll';
import { AuthService } 	from './auth.service';

//import { MdSnackBar } from '@angular/material'

@Injectable() 
export class WebService{
	
	BASE_URL = 'http://localhost:5000'

	constructor(private http: Http, 
				private authHttp: AuthHttp,
				private authService: AuthService,
		){
	}

	// get all poll questions
	async getQuestionsOfUser(userid) {
		let data = {
			'id': userid
		}

		return await this.authHttp.post(this.BASE_URL + '/mypolls', data).toPromise()
						.then((response:Response)=>{return response.json() });
	}

	async getAnswersOfPollId(poll_id) {
		if (this.authService.isAuthenticated()){
			let data = {
				'poll_id': poll_id
			}

			return await this.authHttp.post(this.BASE_URL + '/polldetail', data).toPromise()
				.then((response:Response)=>{ return response.json() });

		}
	}

	// Create a new poll
	async newPoll(poll: Poll){
		if (this.authService.isAuthenticated()){
			let user_id = localStorage.getItem('id')

			let data = {
				'id': user_id,
				'question': poll.question
			}

			for (let i = 0; i< poll.answers.length; i++){
				data[i] = poll.answers[i];
			}

			console.log("Attempt to create poll " + JSON.stringify(data));

			return await this.authHttp.post(this.BASE_URL + '/newpoll', data).toPromise();
		}
	}

	async deletePoll(poll_id){
		if(this.authService.isAuthenticated()){
			console.log("attempting to delete poll " + poll_id)
			let data = {
				'poll_id': poll_id.toString()
			}

			return await this.authHttp.post(this.BASE_URL + '/deletepoll', data).toPromise()
				.then((response:Response)=>{return response.json()});
		}
	}

	vote(answer_id){
		let data = {
			'ans_id': answer_id,
			'user_id': localStorage.getItem('id')
		}	

		this.authHttp.post(this.BASE_URL +'/vote', data).toPromise();
	}

	hasVotedOnPoll(poll_id){
		let data= {
			'poll_id': poll_id.toString(),
			'user_id': localStorage.getItem('id')
		}

		console.log("Has voted :" + JSON.stringify(data));

		return this.authHttp.post(this.BASE_URL + '/hasvoted', data).toPromise()
			.then((response:Response)=>{return response.json()});

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