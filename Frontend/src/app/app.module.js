"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
//import { MaterialModule } from '@angular/material';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var angular2_jwt_1 = require("angular2-jwt");
var ng2_charts_1 = require("ng2-charts");
// my components
var app_component_1 = require("./app.component");
var nav_component_1 = require("./nav.component");
var home_component_1 = require("./home.component");
var signup_component_1 = require("./signup.component");
var mypolls_component_1 = require("./mypolls.component");
var login_component_1 = require("./login.component");
var poll_form_component_1 = require("./poll-form.component");
var poll_detail_component_1 = require("./poll-detail.component");
var vote_component_1 = require("./vote.component");
// my services
var web_service_1 = require("./services/web.service");
var auth_service_1 = require("./services/auth.service");
var auth_guard_service_1 = require("./services/auth-guard.service");
function authHttpServiceFactory(http, options) {
    return new angular2_jwt_1.AuthHttp(new angular2_jwt_1.AuthConfig(), http, options);
}
exports.authHttpServiceFactory = authHttpServiceFactory;
var appRoutes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: 'signup',
        component: signup_component_1.SignupComponent
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'newpoll',
        component: poll_form_component_1.PollFormComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'mypolls',
        component: mypolls_component_1.MyPollsComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'poll-detail/:id',
        component: poll_detail_component_1.PollDetailComponent,
    }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule,
            router_1.RouterModule.forRoot(appRoutes),
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            ng2_charts_1.ChartsModule,
        ],
        declarations: [app_component_1.AppComponent,
            nav_component_1.NavComponent,
            home_component_1.HomeComponent,
            signup_component_1.SignupComponent,
            mypolls_component_1.MyPollsComponent,
            login_component_1.LoginComponent,
            poll_form_component_1.PollFormComponent,
            poll_detail_component_1.PollDetailComponent,
            vote_component_1.VoteComponent],
        bootstrap: [app_component_1.AppComponent],
        providers: [web_service_1.WebService,
            auth_service_1.AuthService,
            auth_guard_service_1.AuthGuard,
            {
                provide: angular2_jwt_1.AuthHttp,
                useFactory: authHttpServiceFactory,
                deps: [http_1.Http, http_1.RequestOptions]
            },
            angular2_jwt_1.provideAuth({
                headerPrefix: 'Bearer'
            })
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map