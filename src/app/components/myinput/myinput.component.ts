import { AfterViewInit, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-myinput',
  templateUrl: './myinput.component.html',
  styleUrls: ['./myinput.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MyinputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MyinputComponent),
      multi: true
    }
  ]
})
export class MyinputComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {

  form: FormGroup;

  subscriptions: Subscription[] = [];

  @Input()
  label: string = '';

  @Input()
  formControlName = '';

  @Input()
  parentForm!: FormGroup;

  @Input()
  required: boolean = true;

  get control() {
    return this.form.controls['value'];
  }

  get value(): any {
    return this.form.value;
  }

  set value(value: any) {
    this.control.setValue(value)
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: string): void {

  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      value: ['', Validators.required]
    });

    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form.valueChanges.subscribe(value => {
        this.onChange(value.value);
        this.onTouched();

        this.manipulateValidators();
      })
    );
  }

  ngAfterViewInit(): void {
    this.addStatusChangeSubscription();
    this.addValueChangeSubscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  addStatusChangeSubscription() {
    this.subscriptions.push(
      this.parentForm.statusChanges.subscribe(() => {
        if (this.parentForm.disabled && !this.form.disabled) {
          this.form.disable();
        }

        if (this.parentForm.enabled && !this.form.enabled) {
          this.form.enable();
        }

        if (!this.control.touched && this.parentForm.touched) {
          this.control.markAsTouched();
          this.control.updateValueAndValidity();
        }
      })
    );
  }

  addValueChangeSubscription() {
    this.subscriptions.push(
      this.parentForm.valueChanges.subscribe(value => {
        if (this.value.value !== value[this.formControlName]) {
          this.form.patchValue({ value: value[this.formControlName] }, { emitEvent: false })
        }
      })
    );
  }

  validate(_: FormControl) {
    let formInvalid: any = {};
    formInvalid[this.formControlName] = { valid: false };

    return this.form.valid ? null : formInvalid;
  }

  onChange: any = () => {
    /* Left blank intentionally */
  };
  onTouched: any = () => {
    /* Left blank intentionally */
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  manipulateValidators(): void {
    if (this.required && !this.form.controls['value'].hasValidator(Validators.required)) {
      this.form.controls['value'].addValidators(Validators.required);
    }
    if (!this.required && this.form.controls['value'].hasValidator(Validators.required)) {
      this.form.controls['value'].removeValidators(Validators.required);
    }
  }

}
