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

  constructor(private apiSevice: ApiService, private messageService: MessageService,private route:Router) { }
  searchFormGroup: FormGroup;
  minDate = new Date();
  maxDate: Date;
  stations = [];
  trainsList: any[] = [];
  columns = [];
  languages = [{ label: 'English', value: 'en' }, { label: 'German', value: 'german' }];
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
      this.SetColumns();
    })
  }
  SearchTrains() {
    if (this.searchFormGroup.value.source === this.searchFormGroup.value.destination) {
      this.messageService.add({ severity: 'error', summary: 'Sorry', detail: 'Source and destination cannot be same' });
    }
    else {
      this.searchFormGroup.value.dateOfJourney = new Date(this.searchFormGroup.value.dateOfJourney).toLocaleString();
      this.apiSevice.GetTrains(this.searchFormGroup.value).subscribe((x: any[]) => {
        this.trainsList = x;
        if (x.length === 0) {
          this.messageService.add({ severity: 'warn', summary: 'Sorry', detail: 'No trains are running based on search criteria' });
        }
      })
    }
    this.SetColumns();
  }
  SetColumns() {
    this.columns = [
      { field: 'trainName', header: this.languageData.TrainName },
      { field: 'trainNumber', header: this.languageData.TrainNumber },
      { field: 'source', header: this.languageData.Source },
      { field: 'destination', header: this.languageData.Destination },
      { field: 'departure', header: this.languageData.Arrival },
      { field: 'proceed', header: this.languageData.Proceed }
    ];
  }
  FetchStations() {
    var stationsList;
    this.apiSevice.GetStations().subscribe(x => {
      stationsList = x;
      if (stationsList != null) {
        stationsList.forEach(x => {
          this.stations.push({ 'label': x.stationName, 'value': x.stationId });
        });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Oops!!!!', detail: 'Error while retriving the details' });
      }

    });

  }
  /* ChangeLanguageSettings(event) {
    this.apiSevice.FetchLanguageSetting().subscribe((data: any) => {
      let constant = data[event.value];
      if (constant == null) {
        this.messageService.add({ severity: 'error', summary: 'Error while converting to selected language', detail: 'Error' });
      }
      constant.Language = event.value;
      this.apiSevice.languageSettings.next(constant);
      this.SetColumns();
    })
  } */
  viewTrainDetails(rowData) {
    const data = {
      selectedData: rowData,
      searchData: this.searchFormGroup.value,
      from:this.stations.find(x=>x.value === this.searchFormGroup.value.source),
      to:this.stations.find(x=>x.value === this.searchFormGroup.value.destination),
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
}