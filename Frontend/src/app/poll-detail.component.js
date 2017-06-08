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
var router_1 = require("@angular/router");
var auth_service_1 = require("./services/auth.service");
var web_service_1 = require("./services/web.service");
var PollDetailComponent = (function () {
    function PollDetailComponent(authService, webService, 
        // private poll:Poll,
        route) {
        var _this = this;
        this.authService = authService;
        this.webService = webService;
        this.route = route;
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true,
            scales: {
                yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
            }
        };
        this.barChartLabels = [];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartData = [];
        this.has_voted = false;
        this.barChartLabels = new Array();
        this.vote_counts = new Array();
        // recover the id of the question
        this.sub = this.route.params.subscribe(function (params) {
            _this.question_id = +params['id'];
        });
        // Get the answer data associated with that
        // question id
        this.loadData();
    }
    PollDetailComponent.prototype.hasVoted = function () {
        var _this = this;
        this.webService.hasVotedOnPoll(this.question_id).then(function (result) {
            _this.has_voted = result['msg'];
            //console.log("HasVoted response: " + this.hasVoted);
        }, function (err) { return console.log(err); });
    };
    PollDetailComponent.prototype.handleUserVoted = function (val) {
        this.has_voted = true;
        this.loadData();
    };
    PollDetailComponent.prototype.loadData = function () {
        var _this = this;
        this.webService.getAnswersOfPollId(this.question_id).then(function (result) {
            console.log(JSON.stringify(result));
            for (var key in result) {
                _this.barChartLabels.push(result[key].body);
                _this.vote_counts.push(result[key].vote_count);
            }
            _this.loadChart();
        }, function (err) { return console.log(err); });
    };
    PollDetailComponent.prototype.loadChart = function () {
        this.barChartData = [{
                label: "# of Votes",
                data: this.vote_counts
            }
        ];
    };
    PollDetailComponent.prototype.ngOnInit = function () {
        this.hasVoted();
        //this.loadChart();
    };
    PollDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    return PollDetailComponent;
}());
PollDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'poll-detail',
        templateUrl: './poll-detail.component.html'
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        web_service_1.WebService,
        router_1.ActivatedRoute])
], PollDetailComponent);
exports.PollDetailComponent = PollDetailComponent;
//# sourceMappingURL=poll-detail.component.js.map