import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Language } from '../search/search.component';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  constructor(private apiService:ApiService) { }
  Columns:any[]=[];
  SelectedTrain :any;
  ngOnInit() {
   this.apiService.languageSettings.subscribe(x=>{
    this.SetColumns(x);
    this.SelectedTrain = this.apiService.selectedTrain;
    console.log(this.SelectedTrain);
   });
  }
  
  SetColumns(data:Language){
    this.Columns=[];
    this.Columns.push(data.TrainName);
    this.Columns.push(data.TrainNumber);
   this.Columns.push(data.Source);
   this.Columns.push(data.Destination);
   this.Columns.push(data.Arrival);
   this.Columns.push(data.Departure);
   this.Columns.push(data.Doj);
  }
  Confirm(){ 
    let bookingDetails={
    trainId:this.SelectedTrain.selectedData.trainId,
    source:this.SelectedTrain.from.value,
    destination:this.SelectedTrain.to.value,
    dateOfJourney:this.SelectedTrain.searchData.dateOfJourney
    }
    this.apiService.BookTicket(bookingDetails).subscribe(response=>{

    })
  }
}
