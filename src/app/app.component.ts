import { Component, OnInit } from '@angular/core';
import { KeycloakService } from './keycloak-service/keycloak.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private serviceUrl = 'http://127.0.0.1:8080/service/';

  public message: string;
  public errorClass: string;

  constructor(private http: HttpClient, private kc: KeycloakService) {
  }

  authenticated(): boolean {
    return this.kc.authenticated();
  }

  login() {
    this.kc.login();
  }

  logout() {
    this.kc.logout();
  }

  account() {
    this.kc.account();
  }

  request(endpoint: string) {
    this.http.get(this.serviceUrl + endpoint)
        .subscribe((res: Response) => this.handleResponse(res, this),
                   (error: Response) => this.handleServiceError(error, this));
  }

  private handleResponse(res: Response, comp: AppComponent) {
    comp.errorClass = '';
    comp.message = 'Message: ' + res.json();
  }

  private handleServiceError(error: Response, comp: AppComponent) {
    comp.errorClass = 'error';
    if (error.status === 0) {
      comp.message = 'Request failed';
    } else {
      comp.message = error.status + ' ' + error.statusText;
    }
  }
}
