import { Component, Input, OnInit } from "@angular/core";
import { AllDataResponse, Local } from "../../../services/api/base-api.service";
import { ChartData } from "chart.js";

@Component({
  selector: 'app-fifth-report',
  templateUrl: './fifth-report.component.html',
  styleUrls: ['./fifth-report.component.scss']
})
export class FifthReportComponent implements OnInit {
  @Input() allData: AllDataResponse;
  reportData: ChartData;
  barChartLabels: string[];
  barChartData: number[];

  ngOnInit(): void {
    this._doReport();
  }

  private _doReport(): void {
    this.generateChartData();

    const result: ChartData = {
      labels: this.barChartLabels,
      xLabels: this.barChartLabels,
      datasets: [
        { data: this.barChartData, label: 'Ocena', yAxisID: 'y-axis-l' },
      ],
    };
    this.reportData = result;
  }

  // generateChartData(): void {
  //   const uniqueLocals = this.getUniqueLocals(30);
  //   this.barChartLabels = uniqueLocals.map(local => local.name);
  //   this.barChartData = uniqueLocals.map(local => local.rating || 0);
  // }

  generateChartData(): void {
    const uniqueLocals = this.getUniqueLocals(100);

    uniqueLocals.sort((a, b) => {
      const ratingA = a.rating || 0;
      const ratingB = b.rating || 0;
      return ratingB - ratingA;
    });

    this.barChartLabels = uniqueLocals.map(local => local.name);
    this.barChartData = uniqueLocals.map(local => local.rating || 0);
  }

  getUniqueLocals(count: number): Local[] {
    const uniqueLocals: Local[] = [];
    const placeIds: string[] = [];

    for (const local of this.allData.locals) {
      if (uniqueLocals.length >= count) {
        break;
      }

      if (!placeIds.includes(local.placeId) && local.rating != null) {
        uniqueLocals.push(local);
        placeIds.push(local.placeId);
      }
    }

    return uniqueLocals;
  }
}
