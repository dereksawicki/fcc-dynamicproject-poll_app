import { Component } from '@angular/core';
import { NavComponent } from './nav.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'my-app',
  template: `
	<navigation></navigation>
	<router-outlet></router-outlet>
  `,
})
export class AppComponent  { name = 'Angular'; }
