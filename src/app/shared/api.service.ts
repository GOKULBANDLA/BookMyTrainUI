import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject, Observable, observable, throwError } from 'rxjs';
import { Language } from '../search/search.component';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  languageSettings = new BehaviorSubject<Language>({ Language :"en",Source:"Source", "Destination" :"Destination",
  "Search" : "Search","TrainName" :"Train Name", "TrainNumber" :"Train Number", "Arrival" :"Arrival","Reset":"Reset",
  "Departure" :"Departure", "Doj":"Date of Journey","Station" :"Select a Station","ChangeLanguage":"Change Language","Welcome":"Welcome to BookMyTrain",
  "Availability":"Availability", "Proceed":"Proceed"});
  selectedTrain:any;
 
 private readonly url=environment.Api_Url;
  constructor(private http:HttpClient) { }
  jsonUrl='assets/languageData.json';
  GetStations(){
    return this.http.get(this.url+'GetStations').pipe(catchError(err => { return this.errorHandler(err)}));
  }
  GetTrains(searchData){
    return this.http.post(this.url+'FetchTrains',searchData).pipe(catchError(err => { return this.errorHandler(err)}));
  }
  FetchLanguageSetting(){
   return this.http.get(this.jsonUrl);
  }
  BookTicket(ticketData) {
    return this.http.post(this.url+'BookTicket',ticketData);
   }
  errorHandler(error: HttpErrorResponse) {
    if(error.status === 0){
      alert('Server is not running. Please try again');
    }
    return throwError(error.message || "server error.");
  }
}
