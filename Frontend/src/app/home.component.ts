import { Component } 	from '@angular/core';
import { AuthService }  from './services/auth.service'

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styles: [`



	`]
	 
})
export class HomeComponent {
	constructor (private authService: AuthService) {
		
	}
}