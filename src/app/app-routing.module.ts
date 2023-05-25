import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageEtlContainerComponent} from "./components/main-page-etl-container/main-page-etl-container.component";

const routes: Routes = [
  {
    path: "",
    component: MainPageEtlContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
