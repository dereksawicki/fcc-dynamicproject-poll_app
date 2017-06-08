/* This component needs to send a post request to
   the backend */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from './models/user'
import { AuthService } from './services/auth.service'

@Component({
	moduleId: module.id,
	selector: 'login',
	templateUrl: './login.component.html',
	styles: [``]
})

export class LoginComponent {
	loginForm: FormGroup;
	submitted = false;

	constructor(private fb: FormBuilder, private authService: AuthService) {

	}

	ngOnInit() {
		localStorage.setItem('testing', 'testing');

		this.loginForm = this.fb.group({
			username: ['', [Validators.required, Validators.minLength(5)]],
			password: ['', Validators.required]
		});
	}

	onSubmit(user: User, isValid: boolean) {
		this.submitted=true;

		/* POST to the api */
		this.authService.login(user);
	}

}