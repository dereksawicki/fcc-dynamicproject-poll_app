/* This component needs to send a post request to
   the backend */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from './models/user'
import { AuthService } from './services/auth.service'

@Component({
	moduleId: module.id,
	selector: 'signup',
	templateUrl: './signup.component.html',
	styles: [``]
})

export class SignupComponent {
	signupForm: FormGroup;
	submitted = false;

	constructor(private fb: FormBuilder, 
		private authService: AuthService) {

		this.signupForm = this.fb.group({
			username: ['', [Validators.required, Validators.minLength(5)]],
			password: ['', Validators.required]
		});
	}

	onSubmit(user: User, isValid: boolean) {
		this.submitted=true;
		this.authService.register(user);
	}

}