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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var poll_1 = require("./models/poll");
var web_service_1 = require("./services/web.service");
var auth_service_1 = require("./services/auth.service");
var router_1 = require("@angular/router");
var PollFormComponent = (function () {
    function PollFormComponent(fb, webService, authService, router) {
        this.fb = fb;
        this.webService = webService;
        this.authService = authService;
        this.router = router;
        //pollForm: FormGroup;
        //poll_form;
        this.poll_opt_ids = [];
        this.submitted = false;
        this.num_options = 2;
        this.poll_opt_ids = new Array();
    }
    PollFormComponent.prototype.ngOnInit = function () {
        this.loadFormGroup();
    };
    PollFormComponent.prototype.addOption = function () {
        this.num_options += 1;
        this.loadFormGroup();
    };
    PollFormComponent.prototype.loadFormGroup = function () {
        this.poll_opt_ids = []; // reset
        for (var i = 1; i < this.num_options + 1; i++) {
            var key_string = i.toString();
            console.log(key_string);
            this.poll_opt_ids.push(key_string);
        }
    };
    PollFormComponent.prototype.onSubmit = function (form) {
        var _this = this;
        console.log("Form" + JSON.stringify(form));
        var question = form['question'];
        delete form['question'];
        var answers = [];
        for (var key in form) {
            console.log(key);
            answers.push(form[key]);
        }
        var poll = new poll_1.Poll(question, answers);
        this.webService.newPoll(poll).then(function (res) {
            console.log("newpoll response" + res);
            _this.router.navigate(['mypolls']);
        }, function (err) { return console.log(err); });
    };
    return PollFormComponent;
}());
PollFormComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'poll-form',
        templateUrl: './poll-form.component.html',
        styles: [""]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        web_service_1.WebService,
        auth_service_1.AuthService,
        router_1.Router])
], PollFormComponent);
exports.PollFormComponent = PollFormComponent;
//# sourceMappingURL=poll-form.component.js.map