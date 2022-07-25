import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'form-test';

  testForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.testForm = this._formBuilder.group({
      comment: [],
      name: [],
      email: [],
      password: [],
    });
  }

  onSubmit() {
    console.log(this.testForm.valid)
    this.testForm.markAllAsTouched();
    this.testForm.updateValueAndValidity();
  }
}
