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
var router_1 = require("@angular/router");
var web_service_1 = require("./services/web.service");
var auth_service_1 = require("./services/auth.service");
var MyPollsComponent = (function () {
    function MyPollsComponent(webService, authService, router) {
        this.webService = webService;
        this.authService = authService;
        this.router = router;
        this.polls = [];
        this.loadPollsOfUser();
    }
    MyPollsComponent.prototype.loadPollsOfUser = function () {
        var _this = this;
        this.polls = [];
        this.webService.getQuestionsOfUser(localStorage.getItem('id')).then(function (result) { return _this.parseResponse(result); }, function (error) { return console.log(error); });
    };
    MyPollsComponent.prototype.delete = function (pollid) {
        var _this = this;
        this.webService.deletePoll(pollid).then(function (res) {
            _this.loadPollsOfUser();
        }, function (err) { return console.log(err); });
    };
    MyPollsComponent.prototype.parseResponse = function (res) {
        console.log(res);
        for (var key in res)
            this.polls.push(res[key]);
    };
    return MyPollsComponent;
}());
MyPollsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'mypoll',
        templateUrl: './mypolls.component.html',
        styles: ["\n\t\tul{\n\t\t\tlist-style-type:None;\n\t\t\twidth: 60%;\n\t\t\tmargin:auto;\n\t\t}\n\t\tli{\n\t\t\ttext-align:left;\n\t\t\tfont-size: 1.6em;\n\t\t\tbackground-color:#CFCFCF;\n\t\t\tmargin-top:1em;\n\t\t\tpadding-left: 1em;\n\t\t}\n\t\tli button{\n\t\t\ttext-align:right;\n\t\t}\n\t"]
    }),
    __metadata("design:paramtypes", [web_service_1.WebService,
        auth_service_1.AuthService,
        router_1.Router])
], MyPollsComponent);
exports.MyPollsComponent = MyPollsComponent;
//# sourceMappingURL=mypolls.component.js.map