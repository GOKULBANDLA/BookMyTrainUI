import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { SearchComponent } from './search/search.component';
import {
  AuthGuardService as AuthGuard
} from './shared/auth-guard.service';

const routes: Routes = [
  {path: 'search', component: SearchComponent},
  {path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
  {path: '**', redirectTo: 'search'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
