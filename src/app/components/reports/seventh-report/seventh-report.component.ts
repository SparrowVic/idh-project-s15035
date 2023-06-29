import { Component, Input, OnInit } from "@angular/core";
import { Accessibility, AllDataResponse, Local } from "../../../services/api/base-api.service";
import { ChartData, ChartOptions } from "chart.js";

@Component({
  selector: 'app-seventh-report',
  templateUrl: './seventh-report.component.html',
  styleUrls: ['./seventh-report.component.scss']
})
export class SeventhReportComponent implements OnInit {
  @Input() allData: AllDataResponse;
  reportData: ChartData;
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  ngOnInit(): void {
    this.doReport();
  }

  private doReport(): void {
    const scatterPlotData = this.calculateScatterPlotData();
    const result: ChartData = {
      labels: this.allData.locals.map(x => x.name).slice(0, 50),
      xLabels: this.allData.locals.map(x => x.name).slice(0, 50),
      datasets: [
        {
          data: scatterPlotData,
          label: 'Ocena',
          pointRadius: 10
        }
      ]
    };

    console.log(result);
    this.reportData = result;
  }

  calculateScatterPlotData(): { x: number; y: number }[] {
    const scatterPlotData: { x: number; y: number }[] = this.allData.locals.map(local => {
      const accessibility = this.getAccessibilityByLocalId(local.accessibilityId);
      const hasParking = accessibility && accessibility.drivingAccess;
      return { x: hasParking ? 1 : 0, y: local.rating || 0 };
    }).slice(0, 50);

    return scatterPlotData;
  }

  getAccessibilityByLocalId(accessibilityId: string): Accessibility | undefined {
    return this.allData.accessibilities.find(accessibility => accessibility.id === accessibilityId);
  }

}
