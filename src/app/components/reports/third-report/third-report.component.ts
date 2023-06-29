import { Component, Input, OnInit } from "@angular/core";
import { AllDataResponse, Local, Location as Locc} from "../../../services/api/base-api.service";
import { ChartData } from "chart.js";

@Component({
  selector: 'app-third-report',
  templateUrl: './third-report.component.html',
  styleUrls: ['./third-report.component.scss']
})
export class ThirdReportComponent implements OnInit {
  @Input() allData: AllDataResponse;
  reportData: ChartData;

  ngOnInit(): void {
    this._doReport();
  }

  private _doReport(): void {
    const datasetss = this.calculateScatterPlotData();
    const result: ChartData = {

      labels: this.allData.locals.map(x => x.name),
      xLabels: this.allData.locals.map(x => x.name),
      datasets: [
        {
          data: datasetss,
          label: 'Ocena',
          pointRadius: 10
        }

      ],
    };
    this.reportData = result;
  }

  calculateScatterPlotData(): { x: number; y: number }[] {
    const scatterPlotData: { x: number; y: number }[] = this.allData.locals.map(local => {
      const location = this.getLocationByLocalId(local.locationId);
      // @ts-ignore
      return { x: location.latitude, y: location.longitude };
    });

    return scatterPlotData;
  }

  getLocationByLocalId(locationId: string): Locc | undefined {
    return this.allData.locations.find(location => location.id === locationId);
  }

  // generateDatasets(locals: Local[]): any[] {
  //   const ratingData = locals.map(l => l.rating || 0);
  //   const reviewCountData = locals.map(l => l.reviewCount || 0);
  //   return [
  //     { data: [
  //         { x: 1, y: 1 },
  //         { x: 2, y: 3 },
  //         { x: 3, y: -2 },
  //         { x: 4, y: 4 },
  //         { x: 5, y: -3},
  //         { x: 1, y: 1 },
  //         { x: 2, y: 3 },
  //         { x: 3, y: -2 },
  //         { x: 4, y: 4 },
  //         { x: 5, y: -3},
  //         { x: 1, y: 1 },
  //         { x: 2, y: 3 },
  //         { x: 3, y: -2 },
  //         { x: 4, y: 4 },
  //         { x: 5, y: -3},
  //       ], label: 'Ocena', pointRadius: 10},
  //   ];
  // }
}

