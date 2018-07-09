import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '../../node_modules/@angular/common/http';


import { KeycloakService } from './keycloak-service/keycloak.service';
import { KEYCLOAK_HTTP_PROVIDER } from './keycloak-service/keycloak.http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
  ],
  providers: [
    KeycloakService,
    KEYCLOAK_HTTP_PROVIDER
],
  bootstrap: [AppComponent]
})
export class AppModule { }
