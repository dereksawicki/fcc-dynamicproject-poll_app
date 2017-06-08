import { Component } 	from '@angular/core';
import { AuthService } 	from './services/auth.service';

@Component({
	selector: 'navigation',
	templateUrl: './nav.component.html'
	 
})
export class NavComponent {
	constructor (private authService : AuthService ){

	}

	logout(){
		this.authService.logout();
	}
}