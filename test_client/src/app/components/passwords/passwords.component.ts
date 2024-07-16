import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PasswordsListComponent } from '../passwords-list/passwords-list.component';
import { AddPasswordComponent } from '../add-password/add-password.component';

@Component({
  selector: 'passwords',
  standalone: true,
  imports: [PasswordsListComponent, AddPasswordComponent],
  templateUrl: './passwords.component.html',
  styleUrl: './passwords.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordsComponent {

}
