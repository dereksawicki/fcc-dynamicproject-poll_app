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
var web_service_1 = require("./services/web.service");
var auth_service_1 = require("./services/auth.service");
var router_1 = require("@angular/router");
var VoteComponent = (function () {
    function VoteComponent(fb, webService, authService, router) {
        this.fb = fb;
        this.webService = webService;
        this.authService = authService;
        this.router = router;
        this.answers = [];
        this.userVoted = new core_1.EventEmitter();
        this.form_group = {};
        this.answers = new Array();
        this.voteForm = this.fb.group({
            'vote_option': ''
        });
    }
    VoteComponent.prototype.ngOnInit = function () {
        this.loadData();
    };
    VoteComponent.prototype.vote = function (vote_option) {
        // vote
        this.webService.vote(vote_option);
        // reload
        this.userVoted.emit(true);
    };
    VoteComponent.prototype.loadData = function () {
        var _this = this;
        if (this.question_id) {
            this.webService.getAnswersOfPollId(this.question_id).then(function (result) {
                //console.log(JSON.stringify(result));
                for (var key in result) {
                    console.log(result[key]);
                    _this.answers.push(result[key]);
                }
            }, function (err) { return console.log(err); });
        }
    };
    return VoteComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], VoteComponent.prototype, "question_id", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], VoteComponent.prototype, "userVoted", void 0);
VoteComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'vote',
        templateUrl: './vote.component.html',
        styles: [""]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        web_service_1.WebService,
        auth_service_1.AuthService,
        router_1.Router])
], VoteComponent);
exports.VoteComponent = VoteComponent;
//# sourceMappingURL=vote.component.js.map