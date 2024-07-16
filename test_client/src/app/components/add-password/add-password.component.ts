import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { PasswordsService } from '../../passwords.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordType, PasswordTypeLabels, PasswordTypes } from '../../models/passwors-type.enum';
import { getValidationMessages, isValidationErrorResult } from '../../models/validation-error-result.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'add-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-password.component.html',
  styleUrl: './add-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPasswordComponent implements OnInit, OnDestroy {
  @ViewChild('addPasswordDialog') 
  private addPasswordDialog!: ElementRef<HTMLDialogElement>;

  private readonly passwordsService = inject(PasswordsService);
  private destroy$ = new Subject<void>();

  public passwordTypes = PasswordTypes;
  public passwordTypeLabels = PasswordTypeLabels;

  errors = signal<string[]>([]);
  
  ngOnInit(): void {
    this.purpose.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(purpose => {
        if (purpose === PasswordType.Email) {
          this.nameControl.addValidators(Validators.email)
        }
        else {
          this.nameControl.removeValidators(Validators.email)
        }

        this.nameControl.updateValueAndValidity()
      });
  }

  passwordForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required, Validators.minLength(8)]),
    purpose: new FormControl<PasswordType>(1)
  });

  get nameControl() {
    return this.passwordForm.get('name') as FormControl;
  }

  get valueControl() {
    return this.passwordForm.get('value') as FormControl;
  }

  get purpose() {
    return this.passwordForm.get('purpose') as FormControl;
  }

  onSubmit() {
    if (!this.passwordForm.valid) return;

    this.passwordsService.createPassword({
      name: this.nameControl.value,
      value: this.valueControl.value,
      purpose: this.purpose.value,
    })
    .subscribe({
      next: () => this.close(),
      error: (httpError: HttpErrorResponse) => {
        if (httpError.status === 400 && isValidationErrorResult(httpError.error)) {
          const errorsMessages = getValidationMessages(httpError.error);
          this.errors.set(errorsMessages);
        }
      }
    });
  }

  close() {
    this.passwordForm.reset();
    this.purpose.setValue(1);
    this.errors.set([]);
    this.addPasswordDialog.nativeElement.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
