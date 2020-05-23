import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularInterceptor } from './angularInterceptor';
import { ServiceEngine } from '../serviceEngine/serviceEngine';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent, ServiceEngine
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule
  ],
  providers: [ServiceEngine,
    { provide: HTTP_INTERCEPTORS, useClass:
      AngularInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
