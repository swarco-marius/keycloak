import { Component, OnInit } from '@angular/core';
import { KeycloakService } from './keycloak-service/keycloak.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../environments/environment';
import { KeycloakHttp } from './keycloak-service/keycloak.http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private serviceUrl = 'http://localhost:8080/auth/realms/demo/account';
  private serverPath = environment.keyCloakPath;

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

  private createHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    });
  }

  realm() {
    // this.http.get(`${this.serverPath}/auth/realms/${this.kc.realm()}`)  // is working

    // this.http.delete('http://localhost:8080/auth/demo/attack-detection/brute-force/users')
    // this.http.get('http://localhost:8080/auth/demo/attack-detection/brute-force/users/e77e3713-c1dc-46bc-b41d-777957699d09')
    // this.http.delete('http://localhost:8080/auth/demo/attack-detection/brute-force/users/e77e3713-c1dc-46bc-b41d-777957699d09')

    // this.http.get(`${this.kc.authServerUrl()}/${this.kc.realm()}/clients`)

    // this.http.get(`${this.serverPath}/auth/realms/${this.kc.realm()}`)
    // this.http.get(`${this.kc.authServerUrl()}/`)
    // this.http.get(`${this.kc.authServerUrl()}/${this.kc.realm()}/primeng/admin`)
    // this.http.get(`http://localhost:8080/auth/`)

    this.kc.getProfile();

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.kc.getToken()
      }
    };

    this.http.get(`${this.serverPath}/auth/realms/${this.kc.realm()}`)  // is working
      .subscribe(result => {
        console.log(result);
      }, error => {
        console.log(error);
      });
  }

  account1() {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.kc.getToken()
      }
    };

    this.http.get(`${this.serverPath}/auth/${this.kc.realm()}/users`)  // is working
      .subscribe(result => {
        console.log(result);
      }, error => {
        console.log(error);
      });
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
