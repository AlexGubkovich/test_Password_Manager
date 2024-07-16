import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Password } from '../models/password.model';
import { CreatePassword } from '../models/create-password.model';
import { isValidationErrorResult } from '../models/validation-error-result.model';

@Injectable({
  providedIn: 'root'
})
export class PasswordsClient {
  private httpClient = inject(HttpClient);
  private readonly passwordsUrl = environment.apiRoot + environment.urlPaths.passwords;

  getPasswords(): Observable<Password[]> {
    return this.httpClient.get<Password[]>(this.passwordsUrl);
  }

  createPassword(createPassword: CreatePassword) {
    return this.httpClient.post(this.passwordsUrl, createPassword)

  }

  deletePassword(passwordName: string) {
    return this.httpClient.delete(this.passwordsUrl + "/" + passwordName)
  }
}
