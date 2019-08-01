import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import * as firebase from 'firebase';

import { IonicStorageModule } from '@ionic/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAInneLppzxQrMvkt48JF9leRFWSoikNCk",
  authDomain: "tcf-quiz.firebaseapp.com",
  databaseURL: "https://tcf-quiz.firebaseio.com",
  projectId: "tcf-quiz",
  storageBucket: "",
  messagingSenderId: "489880780591",
  appId: "1:489880780591:web:687bc44babb27b9c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent ],
  entryComponents: [ ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
