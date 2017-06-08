import { Component, Input, OnInit, Output, EventEmitter } 	from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { User } 		from './models/user';
import { Poll }			from './models/poll';
import { PollAnswer }   from './models/poll_answer';

import { WebService } 	from './services/web.service';
import { AuthService }  from './services/auth.service';
import { Router } 		from '@angular/router';



@Component({
	moduleId: module.id,
	selector: 'vote',
	templateUrl: './vote.component.html',
	styles: [``]
})
export class VoteComponent {
	answers = [];
	@Input() question_id: string;
	@Output() userVoted = new EventEmitter();
	voteForm: FormGroup;
	form_group = {}


	constructor(private fb: FormBuilder, 
		private webService: WebService,
		private authService: AuthService,
		private router: Router) {

		this.answers = new Array<PollAnswer>();

		this.voteForm = this.fb.group({
			'vote_option': ''
		});
	}


	ngOnInit(){
		this.loadData();
	}

	vote(vote_option): void{
		// vote
		this.webService.vote(vote_option);
		// reload
		this.userVoted.emit(true);

	}

	loadData(){
		if  (this.question_id) { 
			this.webService.getAnswersOfPollId(this.question_id).then(
					result => {
						//console.log(JSON.stringify(result));
						for (let key in result) {
							console.log(result[key]);
							this.answers.push(result[key]);
						}
					},
					err => console.log(err)
				)
		}
	}
}
