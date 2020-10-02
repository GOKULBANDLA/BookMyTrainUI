import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [MessageService]
})

export class SearchComponent implements OnInit {

  constructor(private apiSevice: ApiService, private messageService: MessageService, private route: Router) { }
  searchFormGroup: FormGroup;
  rowLength = 2;
  minDate = new Date();
  maxDate: Date;
  stations = [];
  trainsList: any[] = [];
  columns = [];
  languages = [{ label: 'English', value: 'en' }, { label: 'German', value: 'german' }];
  language = new FormControl();
  languageData: Language;
  messages = [];
  ngOnInit() {
    this.SetCalenderRange();
    this.apiSevice.FetchLanguageSetting();
    this.FetchStations();
    this.InitializeForm();
  }

  SetCalenderRange() {
    const today = new Date();
    this.maxDate = new Date(today.setMonth(today.getMonth() + 3));
  }

  InitializeForm() {
    this.searchFormGroup = new FormGroup({
      source: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
      dateOfJourney: new FormControl('', Validators.required)
    });
    this.language.patchValue(this.languages[0].label);
    this.apiSevice.languageSettings.subscribe(result => {
      this.languageData = result;
      this.messages = result.Messages;
      this.SetColumns();
    });
  }
  SearchTrains() {
    if (this.searchFormGroup.value.source === this.searchFormGroup.value.destination) {
      this.messageService.add({ severity: 'error', summary: this.messages[1].summary, detail: this.messages[1].detail});
    } else {
      this.searchFormGroup.value.dateOfJourney = new Date(this.searchFormGroup.value.dateOfJourney).toLocaleString();
      this.apiSevice.GetTrains(this.searchFormGroup.value).subscribe((x: any[]) => {
        this.trainsList = x;
        if (x.length === 0) {
          this.messageService.add({ severity: 'warn', summary: this.messages[2].summary, detail: this.messages[2].detail });
        }
      }, error => {
        this.messageService.add({ severity: 'error', summary: this.messages[0].summary, detail: this.messages[0].detail });
      });
    }
    this.SetColumns();
  }
  SetColumns() {
    this.columns = [
      { field: 'trainName', header: this.languageData.TrainName },
      { field: 'trainNumber', header: this.languageData.TrainNumber },
      { field: 'source', header: this.languageData.Source },
      { field: 'destination', header: this.languageData.Destination },
      { field: 'departure', header: this.languageData.Departure },
      { field: 'arrival', header: this.languageData.Arrival },
      { field: 'proceed', header: this.languageData.Proceed }
    ];
  }
  FetchStations() {
    let stationsList;
    this.apiSevice.GetStations().subscribe(x => {
      stationsList = x;
      if (stationsList != null) {
        stationsList.forEach((data: any) => {
          this.stations.push({ label: data.stationName, value: data.stationId });
        });
      } else {
        this.messageService.add({ severity: 'error', summary: this.messages[0].summary, detail: this.messages[0].detail });
      }

    }, error => {
      this.messageService.add({ severity: 'error', summary: this.messages[0].summary, detail: this.messages[0].detail });
    });

  }

  ViewTrainDetails(rowData) {
    const data = {
      selectedData: rowData,
      searchData: this.searchFormGroup.value,
      from: this.stations.find(x => x.value === this.searchFormGroup.value.source),
      to: this.stations.find(x => x.value === this.searchFormGroup.value.destination),
    };
    this.apiSevice.selectedTrain = data;
    this.route.navigate(['/booking']);
  }
}

export interface Language {
  Language: string;
  Source: string;
  Destination: string;
  Search: string;
  TrainName: string;
  TrainNumber: string;
  Arrival: string;
  Departure: string;
  Doj: string;
  Station: string;
  ChangeLanguage: string;
  Welcome: string;
  Reset: string;
  Availability: string;
  Proceed: string;
  ConfirmBooking: string;
  TrainDetails: string;
  Messages: any[];
}
