/* This component needs to send a post request to
   the backend */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './models/user';
import { WebService } from './services/web.service';
import { AuthService } from './services/auth.service';


@Component({
	moduleId: module.id,
	selector: 'mypoll',
	templateUrl: './mypolls.component.html',
	styles: [`
		ul{
			list-style-type:None;
			width: 60%;
			margin:auto;
		}
		li{
			text-align:left;
			font-size: 1.6em;
			background-color:#CFCFCF;
			margin-top:1em;
			padding-left: 1em;
		}
		li button{
			text-align:right;
		}
	`]
})
export class MyPollsComponent {

	polls = [];
	constructor(private webService: WebService,
				private authService: AuthService,
				private router: Router ) {
		this.loadPollsOfUser();
	}

	loadPollsOfUser() {
		this.polls = [];
		this.webService.getQuestionsOfUser(localStorage.getItem('id')).then(
			result => this.parseResponse(result),
			error  => console.log(error)
			);
	}

	delete(pollid) {
		this.webService.deletePoll(pollid).then(
			res=> {
				this.loadPollsOfUser()
			},
			err=> console.log(err)
		);
	}

	private parseResponse(res){
		console.log(res);
		for (let key in res)
			this.polls.push(res[key])
	}

}