import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../data.service';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

	chart = [];   // for printing canvas
	height:any;   // storing height
	coefficient:any;  // storing coefficient
	bounces:any;      // stroing bounces
	constructor (private _data: DataService) {}

	ngOnInit(): void {
		//
	}

  	onSubmit() {  // On Clicking Submit this function is called

    	if(this.height && this.coefficient){            // check if height and coefficient exist
            this._data.getPoints(this.height,this.coefficient) // call API using data service
            .subscribe(res => {

				this.bounces = res['bounces'];          // get bounce and set it to bounces
              this.chart = new Chart('canvas', {
                type: 'line',
                data: {
                  labels: res['x'],         // set x coordinates
                  datasets: [{
                    data: res['y'],         // set y coordinates
                    borderColor: "#8e5ea2",
                    backgroundColor: "rgba(170,120,200,0.8)",
                  }]
                },
                options: {
                  legend: {
                    display: false
                  },
                  scales: {
                    xAxes: [{
						scaleLabel: {
							display: true,
              labelString: 'Time',
              fontColor: '#000',
              fontSize: '30',
						}
                    }],
                    yAxes: [{
						scaleLabel: {
							display: true,
              labelString: 'Height',
              fontColor: '#000',
              fontSize: '30',
						}
                    }],
                  }
                }
              })
            });
    	}
  	}
}
