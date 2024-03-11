import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  chartData: any = [];
  serverData: any = [];
  currentActive: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/data').subscribe((res: any) => {
      this.serverData = res;
      this.organizeData(0);
    })
  }

  organizeData(id: number) {
    this.currentActive = id;
    const singleItem = this.serverData[id];
    const customChartData: any[] = [];
    for (let ele in singleItem) {
      if (isNaN(singleItem[ele])) {
        delete singleItem[ele];
      } else {
        const data = {
          name: ele, type: 'bar', data: [Number(singleItem[ele])]
        }
        customChartData.push(data);
      }
    }
    this.chartData = customChartData;
    this.initializechart();
  }

  initializechart() {
    const options: Highcharts.Options = {
      chart: {
        type: 'column'
      },
      accessibility: {
        enabled: false
      },
      title: {
        text: 'Data Visualize'
      },
      xAxis: {
        title: {
          text: 'Values'
        }
      },
      yAxis: {
        title: {
          text: 'Range'
        }
      },
      series: this.chartData
    };

    Highcharts.chart('container', options);
  }

}
