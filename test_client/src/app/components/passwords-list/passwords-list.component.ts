import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable, combineLatest, debounceTime, filter, map, startWith } from 'rxjs';
import { Password } from '../../models/password.model';
import { PasswordValueElementComponent } from '../password-value-element/password-value-element.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordsService } from '../../services/passwords.service';

@Component({
  selector: 'passwords-list',
  standalone: true,
  imports: [AsyncPipe, DatePipe, PasswordValueElementComponent, ReactiveFormsModule],
  templateUrl: './passwords-list.component.html',
  styleUrl: './passwords-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordsListComponent implements OnInit {

  private readonly passwordsService = inject(PasswordsService);
  passwords$?: Observable<Password[]>;

  searchInput = new FormControl('');

  ngOnInit(): void {
    const searchInput$ = this.searchInput.valueChanges
      .pipe(debounceTime(300), startWith(''));

    this.passwords$ = combineLatest([
      this.passwordsService.passwords$, 
      searchInput$
    ])
      .pipe(
        map(([passwords, searchInput]) => {
          return passwords.filter(password =>
            password.name.toLowerCase().includes(searchInput?.toLowerCase() ?? '')
          );
        }));

    this.passwordsService.loadPasswords().subscribe();
  }

  deletePassword (passwordName: string) {
    this.passwordsService.deletePassword(passwordName).subscribe();
  }; 

  updateList() {
    this.passwordsService.loadPasswords().subscribe();
  }
}
