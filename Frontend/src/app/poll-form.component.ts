import { Component, OnInit } 	from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { User } 		from './models/user';
import { Poll }			from './models/poll';
import { WebService } 	from './services/web.service';
import { AuthService }  from './services/auth.service';
import { Router } 		from '@angular/router';



@Component({
	moduleId: module.id,
	selector: 'poll-form',
	templateUrl: './poll-form.component.html',
	styles: [``]
})
export class PollFormComponent {
	//pollForm: FormGroup;
	//poll_form;
	poll_opt_ids:string[] = [];
	submitted = false;
	num_options = 2;

	constructor(private fb: FormBuilder, 
		private webService: WebService,
		private authService: AuthService,
		private router: Router) {

		this.poll_opt_ids = new Array<string>();
	}

	ngOnInit(){
		this.loadFormGroup();
	}

	addOption(){
		this.num_options += 1;
		this.loadFormGroup();
	}

	loadFormGroup(){
		this.poll_opt_ids = []; // reset
		for (let i = 1; i < this.num_options+1; i++) {
			let key_string = i.toString();
			console.log(key_string);
			this.poll_opt_ids.push(key_string);
		}

	}

	onSubmit(form: any) {
		console.log("Form" + JSON.stringify(form));
		let question = form['question'];
		delete form['question'];
		let answers = []
		for (var key in form ){
			console.log(key);
			answers.push(form[key]);
		}

		let poll = new Poll(question, answers);
		this.webService.newPoll(poll).then(
			res=> {
				console.log("newpoll response" + res);
				this.router.navigate(['mypolls']);
			},
			err=> console.log(err)
			);
			
	}

}
