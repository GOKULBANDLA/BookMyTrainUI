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

  languageSettings = new BehaviorSubject<Language>({ Language : 'en', Source: 'Source', Destination : 'Destination',
  Search : 'Search', TrainName : 'Train Name', TrainNumber : 'Train Number', Arrival : 'Arrival', Reset: 'Reset',
  Departure : 'Departure', Doj: 'Date of Journey', Station : 'Select a Station',
  ChangeLanguage: 'Change Language', Welcome: 'Welcome to BookMyTrain',
  Availability: 'Availability', Proceed: 'Proceed', ConfirmBooking: 'Confirm Booking',
  TrainDetails : 'Train Details', Messages: [{type: 'serverError', summary: 'Oops!!!!',
  detail: 'There is an server outage. Please try again'}, {
    type: 'searchWithSameValues', summary: 'Sorry!!!!',
    detail: 'Source and destination cannot be same'},
    {type: 'searchTrains_NoResults', summary: 'Sorry!!!!',
    detail: 'No trains are running based on search criteria'},
    {type: 'booking_Success', summary: 'Congratulations',
    detail: 'Your booking is successful. We have sent an acknowledgement to your email'},
    {type: 'booking_Failure', summary: 'Sorry!!!!!!!!!',
    detail: 'There is a issue while booking the ticket. Please try later'}
    ]});
  selectedTrain: any;

 private readonly url = environment.Api_Url;
  constructor(private http: HttpClient) { }
  jsonUrl = 'assets/languageData.json';
  GetStations() {
    return this.http.get(this.url + 'GetStations').pipe(catchError(err => this.errorHandler(err)));
  }
  GetTrains(searchData) {
    return this.http.post(this.url + 'FetchTrains', searchData).pipe(catchError(err => this.errorHandler(err)));
  }
  FetchLanguageSetting() {
   return this.http.get(this.jsonUrl);
  }
  BookTicket(ticketData) {
    return this.http.post(this.url + 'BookTicket', ticketData);
   }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error.');
  }
}
