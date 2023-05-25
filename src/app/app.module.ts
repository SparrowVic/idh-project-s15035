import {NgModule} from '@angular/core';
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
  HttpClientModule
]

const COMPONENTS = [
  AppComponent,
  MainPageEtlContainerComponent,
  MainPageEtlFormComponent,
  MainToolbarPanelComponent,
  MainPageEtlHeaderComponent,
]

@NgModule({
  declarations: [
    ...COMPONENTS,

  ],
  imports: [
    ...MODULES,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
