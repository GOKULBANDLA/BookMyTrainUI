import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [MessageService]
})

export class SearchComponent implements OnInit {

  constructor(private apiSevice:ApiService,private messageService: MessageService) { }
  searchFormGroup:FormGroup;
  minDate = new Date();
  maxDate :Date;
  stations =[];
  trainsList=[];
  columns=[];
  languages=[{label:'English',value:'en'},{label:'German',value:'german'}];
  language = new FormControl();
  languageData: Language;
  ngOnInit() {
    this.SetCalenderRange();
    this.apiSevice.FetchLanguageSetting();
    this.FetchStations();
    this.InitializeForm();
  }

  SetCalenderRange() {
    let today = new Date();
    this.maxDate = new Date(today.setMonth(today.getMonth()+3));
  }

  InitializeForm(){
    this.searchFormGroup = new FormGroup({
      source: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
      dateOfJourney: new FormControl('', Validators.required)
    });
    this.language.patchValue(this.languages[0].label);
    this.apiSevice.languageSettings.subscribe(result=>{
      this.languageData=result;
    })
  }
  SearchTrains(){
    if(this.searchFormGroup.value.source === this.searchFormGroup.value.destination){
     this.messageService.add({severity:'error',summary:'Source and destination cannot be same',detail:'Error'});
    }
    this.SetColumns();
  }
  SetColumns() {
    this.columns = [
      { field: 'trainName', header: this.languageData.TrainName},
      { field: 'trainNumber', header: this.languageData.TrainNumber },
      { field: 'source', header: this.languageData.Source },
      { field: 'destination', header: this.languageData.Destination },
      { field: 'departure', header: this.languageData.Arrival },
      { field: 'arrival', header: this.languageData.Departure }
  ];
  }
  FetchStations(){
  let stationsList = this.apiSevice.GetTrains();
  stationsList.forEach(x=>{
    this.stations.push({'label':x.stationName,'value':x.stationId});
  })
  }
  ChangeLanguageSettings(event){
    this.apiSevice.FetchLanguageSetting().subscribe((data:any)=>{
     let constant = data[event.value];
     if(constant==null){
      this.messageService.add({severity:'error',summary:'Error while converting to selected language',detail:'Error'});
     }
     constant.Language = event.value;
   this.apiSevice.languageSettings.next(constant);
   this.SetColumns();
    })
  }
}

export interface Language{
  Language:string;
  Source : string;
  Destination : string;
  Search : string;
  TrainName:string;
  TrainNumber:string;
 Arrival : string;
 Departure : string;
 Doj : string;
 Station:string;
 ChangeLanguage:string,
 Welcome:string,
 Reset:string
}