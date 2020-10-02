import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Language } from '../search/search.component';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [MessageService]
})
export class BookingComponent implements OnInit {
  constructor(private apiService: ApiService, private route: Router, private messageService: MessageService) { }
  columns: any[] = [];
  selectedTrain: any;
  languageSettings: Language;
  messages = [];
  ngOnInit() {
   this.apiService.languageSettings.subscribe(x => {
    this.SetColumns(x);
    this.languageSettings = x;
    this.selectedTrain = this.apiService.selectedTrain;
    this.messages = x.Messages;
   });
  }

  SetColumns(data: Language) {
    this.columns = [];
    this.columns.push(data.TrainName);
    this.columns.push(data.TrainNumber);
    this.columns.push(data.Source);
    this.columns.push(data.Destination);
    this.columns.push(data.Departure);
    this.columns.push(data.Arrival);
    this.columns.push(data.Doj);
  }
  Confirm() {
    const bookingDetails = {
    trainId: this.selectedTrain.selectedData.trainId,
    sourceId: this.selectedTrain.from.value,
    destinationId: this.selectedTrain.to.value,
    dateOfJourney: this.selectedTrain.searchData.dateOfJourney,
    Source: this.selectedTrain.from.label,
    Destination: this.selectedTrain.to.label,
    trainName: this.selectedTrain.selectedData.trainName,
    trainNumber: this.selectedTrain.selectedData.trainNumber
    };
    this.apiService.BookTicket(bookingDetails).subscribe(response => {
     if (response) {
      this.messageService.add({ severity: 'success', summary: this.messages[3].summary, detail: this.messages[3].detail  });
     } else {
      this.messageService.add({ severity: 'error', summary: this.messages[4].summary, detail: this.messages[4].detail });
     }
    }, error => {
      this.messageService.add({ severity: 'error', summary: this.messages[0].summary, detail: this.messages[0].detail });
    });
    setTimeout(() => {
      this.route.navigate(['search']);
    }, 10000);
  }
}
