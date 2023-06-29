import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainPageEtlContainerComponent} from './components/main-page-etl-container/main-page-etl-container.component';
import {
  MainPageEtlFormComponent
} from './components/main-page-etl-container/main-page-etl-form/main-page-etl-form.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MainToolbarPanelComponent} from './core/components/main-toolbar-panel/main-toolbar-panel.component';
import {MatIconModule} from "@angular/material/icon";
import {
  MainPageEtlHeaderComponent
} from './components/main-page-etl-container/main-page-etl-header/main-page-etl-header.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import { NgChartsModule } from "ng2-charts";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FirstReportComponent } from './components/reports/first-report/first-report.component';
import { ReportsContainerComponent } from './components/reports/reports-container/reports-container.component';
import { SecondReportComponent } from './components/reports/second-report/second-report.component';
import { ThirdReportComponent } from './components/reports/third-report/third-report.component';
import { FourthReportComponent } from './components/reports/fourth-report/fourth-report.component';
import { FifthReportComponent } from './components/reports/fifth-report/fifth-report.component';
import { SixthReportComponent } from './components/reports/sixth-report/sixth-report.component';
import { SeventhReportComponent } from './components/reports/seventh-report/seventh-report.component';
import { EighthReportComponent } from './components/reports/eighth-report/eighth-report.component';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

const MODULES = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  CommonModule,
  FormsModule,
  MatButtonModule,
  HttpClientModule,
  NgChartsModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatDividerModule,
  MatListModule
]

const COMPONENTS = [
  AppComponent,
  MainPageEtlContainerComponent,
  MainPageEtlFormComponent,
  MainToolbarPanelComponent,
  MainPageEtlHeaderComponent,
  FirstReportComponent,
]

@NgModule({
  declarations: [
    ...COMPONENTS,
    ReportsContainerComponent,
    SecondReportComponent,
    ThirdReportComponent,
    FourthReportComponent,
    FifthReportComponent,
    SixthReportComponent,
    SeventhReportComponent,
    EighthReportComponent,
  ],
  imports: [
    ...MODULES,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
