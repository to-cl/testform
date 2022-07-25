import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyinputComponent } from './components/myinput/myinput.component';
import { MyloginComponent } from './components/mylogin/mylogin.component';

@NgModule({
  declarations: [
    AppComponent,
    MyinputComponent,
    MyloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
