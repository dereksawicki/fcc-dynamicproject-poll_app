import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { MaterialModule } from '@angular/material';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes }                from '@angular/router';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpModule, Http, RequestOptions }    from '@angular/http';
import { AuthHttp, AuthConfig, provideAuth }   from 'angular2-jwt';
import { ChartsModule } from 'ng2-charts';

// my components
import { AppComponent }      from './app.component';
import { NavComponent }      from './nav.component';
import { HomeComponent }     from './home.component';
import { SignupComponent }   from './signup.component';
import { MyPollsComponent }  from './mypolls.component';
import { LoginComponent }    from './login.component';
import { PollFormComponent } from './poll-form.component';
import { PollDetailComponent } from './poll-detail.component';
import { VoteComponent }       from './vote.component';

// my services
import { WebService }    from './services/web.service';
import { AuthService }   from './services/auth.service';
import { AuthGuard }     from './services/auth-guard.service';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

const appRoutes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'signup',
		component: SignupComponent
	},
		{
		path: 'login',
		component: LoginComponent
	},
   {
    path: 'newpoll',
    component: PollFormComponent,
    canActivate: [AuthGuard]
  },
	{
		path: 'mypolls',
		component: MyPollsComponent,
		canActivate: [AuthGuard]
	},
  {
    path: 'poll-detail/:id',
    component: PollDetailComponent,
  }
];


@NgModule({
  imports:  [ BrowserModule,
  						RouterModule.forRoot(appRoutes),
  						FormsModule,
  						ReactiveFormsModule,
  						HttpModule,
              ChartsModule,
  						//BrowserAnimationsModule,
  						//MaterialModule 
  						],
  declarations: [ AppComponent,
  					   NavComponent,
  					   HomeComponent,
  					   SignupComponent,
  					   MyPollsComponent,
  					   LoginComponent,
               PollFormComponent,
               PollDetailComponent,
               VoteComponent ],
  bootstrap:    [ AppComponent ],


  providers:	 [  WebService,
  						    AuthService,
  						    AuthGuard,
                  {
                    provide: AuthHttp,
                    useFactory: authHttpServiceFactory,
                    deps: [Http, RequestOptions]
                  },
                  provideAuth({
                    headerPrefix:'Bearer'
                  })
              ]
})
export class AppModule { }
