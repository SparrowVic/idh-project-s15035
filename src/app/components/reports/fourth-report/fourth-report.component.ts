import { Component, Input, OnInit } from "@angular/core";
import { AllDataResponse } from "../../../services/api/base-api.service";

@Component({
  selector: 'app-fourth-report',
  templateUrl: './fourth-report.component.html',
  styleUrls: ['./fourth-report.component.scss']
})
export class FourthReportComponent implements OnInit {
  @Input() allData: AllDataResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
