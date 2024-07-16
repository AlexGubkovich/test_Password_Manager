import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'password-value-element',
  standalone: true,
  imports: [],
  templateUrl: './password-value-element.component.html',
  styleUrl: './password-value-element.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordValueElementComponent {
  @Input({required: true}) text!: string;

  hidden = true;

  switchVisibility = () => this.hidden = !this.hidden;
}
