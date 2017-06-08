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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
var core_1 = require("@angular/core");
var angular2_jwt_1 = require("angular2-jwt");
var router_1 = require("@angular/router");
//import { MdSnackBar } from '@angular/material'
var AuthService = (function () {
    //NAME_KEY = 'name';
    //TOKEN_KEY = 'token';
    function AuthService(http, router, authHttp) {
        this.http = http;
        this.router = router;
        this.authHttp = authHttp;
        this.BASE_URL = 'http://localhost:5000';
    }
    //get name() {
    //	return localStorage.getItem(this.NAME_KEY);
    //}
    AuthService.prototype.isAuthenticated = function () {
        return !!localStorage.getItem('token') && angular2_jwt_1.tokenNotExpired();
    };
    AuthService.prototype.login = function (user) {
        // Parse user into json
        var send = {
            'username': user.username,
            'password': user.password
        };
        localStorage.setItem("test", "test");
        // send  the data
        console.log("Sending: " + JSON.stringify(send));
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post(this.BASE_URL + '/login', send, options)
            .map(function (response) { return response.json(); })
            .subscribe(function (result) {
            var token = result.access_token;
            console.log("Token received: " + token);
            console.log("Id: " + result.id);
            localStorage.setItem("token", token);
            localStorage.setItem("id", result.id);
        }, function (error) { return console.log(error); });
        this.router.navigate(['/']);
    };
    AuthService.prototype.register = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var send, headers, options, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        send = {
                            'username': user.username,
                            'password': user.password
                        };
                        // send  the data
                        console.log("Sending: " + JSON.stringify(send));
                        headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                        options = new http_1.RequestOptions({ headers: headers });
                        return [4 /*yield*/, this.http.post(this.BASE_URL + '/signup', send, options).toPromise()];
                    case 1:
                        response = _a.sent();
                        // log response
                        console.log(response);
                        this.router.navigate(['/login']);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        this.handleError("Unable to create new user");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        this.router.navigate(['/']);
    };
    AuthService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        router_1.Router,
        angular2_jwt_1.AuthHttp])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map