import { Injectable, inject } from '@angular/core';
import { PasswordsClient } from './clients/passwords.client';
import { BehaviorSubject, tap } from 'rxjs';
import { Password } from './models/password.model';
import { CreatePassword } from './models/create-password.model';

@Injectable({
  providedIn: 'root'
})
export class PasswordsService {

  private passwordsSubj = new BehaviorSubject<Password[]>([]);
  public passwords$ = this.passwordsSubj.asObservable();

  private readonly passwordsClient = inject(PasswordsClient);

  loadPasswords() {
    return this.passwordsClient.getPasswords()
      .pipe(
        tap(passwords => {
          console.log('passwords loaded');
          this.passwordsSubj.next(passwords);
        })
      );
  }

  createPassword(createPassword: CreatePassword) {
    return this.passwordsClient.createPassword(createPassword)
      .pipe(tap(() => this.loadPasswords().subscribe()));
  }

  deletePassword(passwordName: string) {
    return this.passwordsClient.deletePassword(passwordName)
      .pipe(tap(() => this.loadPasswords().subscribe()));
  }
}
