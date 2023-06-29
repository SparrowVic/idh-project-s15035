import { Component, Input, OnInit } from "@angular/core";
import { Accessibility, AllDataResponse, Local } from "../../../services/api/base-api.service";
import { ChartData } from "chart.js";

@Component({
  selector: 'app-second-report',
  templateUrl: './second-report.component.html',
  styleUrls: ['./second-report.component.scss']
})
export class SecondReportComponent implements OnInit {
  @Input() allData: AllDataResponse;
  reportData: Local[];
  displayedColumns: string[] = ['name', 'rating', 'reviewCount', 'wheelchairAccessible'];

  ngOnInit(): void {
    this._doReport();
  }

  private _doReport(): void {
    this.reportData = this.getTopRatedAccessibleLocals(15);
  }

  getTopRatedAccessibleLocals(count: number): Local[] {
    const accessibleLocals = this.allData.locals.filter(local => {
      const accessibility = this.getAccessibilityByLocalId(local.accessibilityId);
      return (
        local.rating != null &&
        local.reviewCount != null &&
        local.wheelchairAccessible &&
        accessibility?.publicTransport &&
        accessibility?.drivingAccess
      );
    });

    const sortedLocals = accessibleLocals.sort((a, b) => {
      if (a.rating === b.rating) {
        return (b.reviewCount || 0) - (a.reviewCount || 0); // Sortowanie po liczbie ocen malejąco
      } else {
        return (b.rating || 0) - (a.rating || 0); // Sortowanie po ocenie malejąco
      }
    });

    const uniqueLocals = this.getUniqueLocals(sortedLocals, count);

    return uniqueLocals;
  }

  getAccessibilityByLocalId(localId: string): Accessibility | undefined {
    return this.allData.accessibilities.find(accessibility => accessibility.id === localId);
  }

  getUniqueLocals(locals: Local[], count: number): Local[] {
    const uniqueLocals: Local[] = [];
    const placeIds: string[] = [];

    for (const local of locals) {
      if (uniqueLocals.length >= count) {
        break;
      }

      if (!placeIds.includes(local.placeId)) {
        uniqueLocals.push(local);
        placeIds.push(local.placeId);
      }
    }

    return uniqueLocals;
  }
}
