import { Component, Input, OnInit } from "@angular/core";
import { AllDataResponse, Local } from "../../../services/api/base-api.service";
import { ChartData } from "chart.js";

@Component({
  selector: 'app-eighth-report',
  templateUrl: './eighth-report.component.html',
  styleUrls: ['./eighth-report.component.scss']
})
export class EighthReportComponent implements OnInit {
  @Input() allData: AllDataResponse;
  reportData: ChartData;

  ngOnInit(): void {
    this.doReport();
  }

  private doReport(): void {
    const first50Locals: Local[] = this.getFirst50Locals();
    const accessibilityData = this.generateAccessibilityData(first50Locals);
    const ratingData = this.generateRatingData(first50Locals);

    const result: ChartData = {
      labels: ['Dostępne dla niepełnosprawnych', 'Niedostępne dla niepełnosprawnych'],
      datasets: [
        { data: accessibilityData, label: 'Dostępność', yAxisID: 'y-axis-l' },
        { data: ratingData, label: 'Ocena', yAxisID: 'y-axis-r' }
      ]
    };

    this.reportData = result;
  }

  getFirst50Locals(): Local[] {
    return this.allData.locals.slice(0, 50);
  }

  generateAccessibilityData(locals: Local[]): number[] {
    const accessibleCount = locals.filter(l => l.wheelchairAccessible).length;
    const inaccessibleCount = locals.length - accessibleCount;
    return [accessibleCount, inaccessibleCount];
  }

  generateRatingData(locals: Local[]): number[] {
    const accessibleLocals = locals.filter(l => l.wheelchairAccessible);
    const accessibleRatingSum = accessibleLocals.reduce((sum, local) => sum + (local.rating || 0), 0);
    const accessibleRatingAverage = accessibleRatingSum / accessibleLocals.length;

    const inaccessibleLocals = locals.filter(l => !l.wheelchairAccessible);
    const inaccessibleRatingSum = inaccessibleLocals.reduce((sum, local) => sum + (local.rating || 0), 0);
    const inaccessibleRatingAverage = inaccessibleRatingSum / inaccessibleLocals.length;

    return [accessibleRatingAverage, inaccessibleRatingAverage];
  }
}
