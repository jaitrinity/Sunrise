import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './guard/AuthGuard';
import { LocationComponent } from './layout/location/location.component';
import { SmslogComponent } from './layout/smslog/smslog.component';
import { MessagesComponent } from './layout/messages/messages.component';
import { ClientComponent } from './layout/client/client.component';
import { WhatsappComponent } from './layout/whatsapp/whatsapp.component';
import { SchedulerComponent } from './layout/scheduler/scheduler.component';

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'layout', component:LayoutComponent, canActivate:[AuthGuard],
    children:[
      {path:'', redirectTo:'location', pathMatch:'full'},
      {path:'location', component:LocationComponent},
      {path:'smslog', component:SmslogComponent},
      {path:'messages', component:MessagesComponent},
      {path:'wid', component:WhatsappComponent},
      {path:'client', component:ClientComponent},
      {path:'scheduler', component:SchedulerComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
