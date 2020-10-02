import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
 constructor(private apiService: ApiService, private router: Router) {

 }
  canActivate(): boolean {
    if (this.apiService.selectedTrain === undefined) {
      this.router.navigate(['search']);
      return false;
    }
    return true;
  }
}
