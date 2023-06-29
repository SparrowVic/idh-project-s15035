import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageEtlContainerComponent} from "./components/main-page-etl-container/main-page-etl-container.component";
import { ReportsContainerComponent } from "./components/reports/reports-container/reports-container.component";

const routes: Routes = [
  {
    path: "",
    component: MainPageEtlContainerComponent
  },
  {
    path: "reports",
    component: ReportsContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
