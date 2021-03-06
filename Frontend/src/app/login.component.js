"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* This component needs to send a post request to
   the backend */
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var auth_service_1 = require("./services/auth.service");
var LoginComponent = (function () {
    function LoginComponent(fb, authService) {
        this.fb = fb;
        this.authService = authService;
        this.submitted = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        localStorage.setItem('testing', 'testing');
        this.loginForm = this.fb.group({
            username: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            password: ['', forms_1.Validators.required]
        });
    };
    LoginComponent.prototype.onSubmit = function (user, isValid) {
        this.submitted = true;
        /* POST to the api */
        this.authService.login(user);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'login',
        templateUrl: './login.component.html',
        styles: [""]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, auth_service_1.AuthService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map