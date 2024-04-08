import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { LocationComponent } from './layout/location/location.component';
import { SmslogComponent } from './layout/smslog/smslog.component';
import { MessagesComponent } from './layout/messages/messages.component';
import { ClientComponent } from './layout/client/client.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './pagination/pagination.component';
import { OnlyNumber } from './validator/OnlyNumber';
import { WhatsappComponent } from './layout/whatsapp/whatsapp.component';
import { SchedulerComponent } from './layout/scheduler/scheduler.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CommonModule, DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    LocationComponent,
    SmslogComponent,
    MessagesComponent,
    ClientComponent,
    MenuComponent,
    PaginationComponent,
    OnlyNumber,
    WhatsappComponent,
    SchedulerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
