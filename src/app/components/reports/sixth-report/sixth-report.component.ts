import { Component, Input, OnInit } from "@angular/core";
import { AllDataResponse } from "../../../services/api/base-api.service";

@Component({
  selector: 'app-sixth-report',
  templateUrl: './sixth-report.component.html',
  styleUrls: ['./sixth-report.component.scss']
})
export class SixthReportComponent implements OnInit {
  @Input() allData: AllDataResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
