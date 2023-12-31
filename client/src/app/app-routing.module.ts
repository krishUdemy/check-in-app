import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckInComponent } from './check-in/check-in.component';
import { CheckInSuccessComponent } from './check-in-success/check-in-success.component';

const routes: Routes = [
  { path: '', component: CheckInComponent },
  { path: 'success', component: CheckInSuccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
