import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Language } from './search/search.component';
import { ApiService } from './shared/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[MessageService]
})
export class AppComponent implements OnInit {

  constructor(public apiService:ApiService,private messageService:MessageService) {

  }
  title = 'BookMyTrain';
  languages = [{ label: 'English', value: 'en' }, { label: 'German', value: 'german' }];
  language = new FormControl();
  languageData: Language;
  ngOnInit(){
    this.apiService.languageSettings.subscribe(result => {
      this.languageData = result;
    })
  }
  ChangeLanguageSettings(event) {
    this.apiService.FetchLanguageSetting().subscribe((data: any) => {
      let constant = data[event.value];
      if (constant == null) {
        this.messageService.add({ severity: 'error', summary: 'Error while converting to selected language', detail: 'Error' });
      }
      constant.Language = event.value;
      this.apiService.languageSettings.next(constant);
    })
  }
}
