import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, observable } from 'rxjs';
import { Language } from '../search/search.component';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  languageSettings = new BehaviorSubject<Language>({ Language :"en",Source:"Source", "Destination" :"Destination",
  "Search" : "Search","TrainName" :"Train Name", "TrainNumber" :"Train Number", "Arrival" :"Arrival","Reset":"Reset",
  "Departure" :"Departure", "Doj":"Date of Journey","Station" :"Select a Station","ChangeLanguage":"Change Language","Welcome":"Welcome to BookMyTrain"});
  constructor(private http:HttpClient) { }
  jsonUrl='assets/languageData.json';
  GetTrains(){
    return [{stationId:1,stationName:'Tirupati'},{stationId:2,stationName:'Bangalore'}]
  }
  FetchLanguageSetting(){
   return this.http.get(this.jsonUrl)
  }
}
