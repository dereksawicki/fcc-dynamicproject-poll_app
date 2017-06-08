import { Component, OnInit, OnDestroy } 	from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } 	from './services/auth.service';
import { WebService }   from './services/web.service';
//import { Poll } from './models/poll';

import { VoteComponent } from './vote.component';


@Component({
	moduleId: module.id,
	selector: 'poll-detail',
	templateUrl: './poll-detail.component.html'
})
export class PollDetailComponent {
  	public barChartOptions:any = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
      	yAxes: [{
      		ticks: {
      			beginAtZero:true
      		}
      	}]
      }

    };
    public barChartLabels:string[] = [];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;
    public barChartData:any[] = [];
 
	question_id: number;
	private sub: any;

	vote_counts: number[];
	has_voted: boolean = false;

	constructor (private authService: AuthService, 
				 private webService: WebService,
				// private poll:Poll,
				 private route: ActivatedRoute,){

		this.barChartLabels = new Array<string>();
		this.vote_counts = new Array<number>();

		// recover the id of the question
		this.sub = this.route.params.subscribe(
			params=> {
				this.question_id = +params['id'];
			})

		// Get the answer data associated with that
		// question id
		this.loadData();


	}

	hasVoted(){
		this.webService.hasVotedOnPoll(this.question_id).then(
			result => {
				this.has_voted = result['msg'];
				//console.log("HasVoted response: " + this.hasVoted);
			},
			err => console.log(err)
			);
	}

	handleUserVoted(val:any){
		this.has_voted=true;
		this.loadData();
	}

	loadData(){
		this.webService.getAnswersOfPollId(this.question_id).then(
				result => {
					console.log(JSON.stringify(result));
					for (let key in result) {
		   			 	this.barChartLabels.push(result[key].body)
		   			 	this.vote_counts.push(result[key].vote_count);
					}


					this.loadChart();
				},
				err => console.log(err)
			);
	}

	loadChart() {
		this.barChartData = [{
				label: "# of Votes",
				data: this.vote_counts
			}
		]
	}

	ngOnInit() {
		this.hasVoted();
		//this.loadChart();

	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}