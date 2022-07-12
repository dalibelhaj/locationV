import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { VoitureListComponent } from './voiture-list/voiture-list.component';
import { ReservationComponent } from './reservation/reservation.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { ReservationService } from './services/reservation.service';
import { VoitureService } from './services/voiture.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SubreservationComponent } from './subreservation/subreservation.component';
import { SingelReservationComponent } from './reservation/singel-reservation/singel-reservation.component';
import { FormReservationComponent } from './reservation/form-reservation/form-reservation.component';
import { HomeComponent } from './home/home.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from "src/environments/environment";

import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp(environment.firebase);

//,canActivate:[AuthGuardService]
const appRoutes:Routes = [
  {path: 'auth/signup', component:SignupComponent},
  {path: 'auth/signin', component:SigninComponent},
  {path: 'voiture', component:VoitureListComponent},
  {path: 'reservation',canActivate:[AuthGuardService],component:ReservationComponent},
  {path: 'reservation/new',canActivate:[AuthGuardService],component:FormReservationComponent},
  {path: 'reservation/view/:id',canActivate:[AuthGuardService],component:SingelReservationComponent},
  {path:'home',component:HomeComponent},
  {path: '',redirectTo :'home',pathMatch:'full'},
  {path:'**',redirectTo:'home'}
  
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    VoitureListComponent,
    ReservationComponent,
    HeaderComponent,
    SubreservationComponent,
    SingelReservationComponent,
    FormReservationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule, // Only required for auth features,
    AngularFireStorageModule, // Only required for storage features
    AngularFireMessagingModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
  AuthService,
  ReservationService,
  VoitureService,
  AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 