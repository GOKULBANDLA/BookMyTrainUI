import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  {path:'search',component:SearchComponent},
  {path:'booking',component:BookingComponent},
  {path:'**',redirectTo:'search'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
