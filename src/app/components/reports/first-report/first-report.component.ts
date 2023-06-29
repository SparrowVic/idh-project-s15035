import { Component, Input, OnInit } from "@angular/core";

import { ChartData } from "chart.js/dist/types";
import { AllDataResponse, Local } from "../../../services/api/base-api.service";

@Component({
  selector: 'app-first-report',
  templateUrl: './first-report.component.html',
  styleUrls: ['./first-report.component.scss']
})
export class FirstReportComponent implements OnInit {
  @Input() allData: AllDataResponse;
  reportData: ChartData;

  ngOnInit(): void {
      this._doReport();
  }

  private _doReport(): void {
    const randomLocals: Local[] = this.getRandomLocals(15);
    const maxReviewCount: number = this.getMaxReviewCount(randomLocals);
    const reviewCountLabels: number[] = this.generateReviewCountLabels(maxReviewCount);
    const datasets = this.generateDatasets(randomLocals);
    const result: ChartData = {
      // ratingLabels: [1, 2, 3, 4, 5],
      // reviewCountLabels,
      // datasets

      labels: randomLocals.map(x => x.name),
      xLabels: randomLocals.map(x => x.name),
      // yLabels: this.labelsY,
      datasets: datasets,
    };
    console.log(result);
    this.reportData = result;
  }

  getRandomLocals(count: number): Local[] {
    const shuffledLocals = this.shuffleArray(this.allData.locals);
    return shuffledLocals.slice(0, count);
  }

  shuffleArray(array: any[]): any[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  getMaxReviewCount(locals: Local[]): number {
    const maxReviewCount = Math.max(...locals.map(l => l.reviewCount || 0));
    return maxReviewCount;
  }

  generateReviewCountLabels(maxReviewCount: number): number[] {
    const result: number[] = [];
    const step = Math.floor(maxReviewCount / 15);
    for (let i = 0; i <= maxReviewCount; i += step) {
      result.push(i);
    }
    return result;
  }

  generateDatasets(locals: Local[]): any[] {
    const ratingData = locals.map(l => l.rating || 0);
    const reviewCountData = locals.map(l => l.reviewCount || 0);
    return [
      { data: ratingData, label: 'Ocena', yAxisID: 'y-axis-l' },
      { data: reviewCountData, label: 'Liczba ocen', yAxisID: 'y-axis-r' }
    ];
  }

  // labels = ['A','B','C','D','E','F', 'G'];
  // labelsX = ['000','1111','222','333','444','555', '666', '777','888'];
  // labelsY = ['999','888','777','666','555','444', '333'];
  //
  //
  // data2: ChartData = {
  //   labels: this.labels,
  //   xLabels: this.labelsX,
  //   // yLabels: this.labelsY,
  //   datasets: [
  //     { data: [65, 59, 80, 81, 56, 55, 40, 65, 59], label: 'Dataset 1', yAxisID: 'y-axis-l'},
  //     { data: [12, 34, 56, 23, 45, 67, 89, 12, 34], label: 'Dataset 2', yAxisID: 'y-axis-ll' }
  //   ],
  // };

}

