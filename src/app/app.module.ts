import { SearchComponent } from './search/search.component';
import { AppComponent } from './app.component';
// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
// Prime Ng Modules
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {MenubarModule} from 'primeng/menubar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { BookingComponent } from './booking/booking.component';
import { LoaderComponent } from './loader/loader.component';
import {  LoaderInterceptor } from './shared/LoaderInterceptor';
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    BookingComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    CardModule,
    ButtonModule,
    ToastModule,
    TableModule,
    MenubarModule,
    ProgressSpinnerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor ,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
