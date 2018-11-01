import { COUNTRIES, TITLES } from './../shared/lists';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateValidator } from '../shared/customValidator/dateValidator';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  userDataForm: FormGroup;
  private maxDate: Date;
  // tslint:disable-next-line:max-line-length
  private dateEnFormatRegex = new RegExp('(^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$)');
  formFields = {
    'firstName': '',
    'lastName' : ''
  };
  titles = TITLES;
  countries = COUNTRIES;
    constructor(private formBuilder: FormBuilder) {
    this.createUserDataForm();
    const maxYear = new Date().getFullYear() - 18;
    this.maxDate = new Date( maxYear, 11 , 31 );
   }

  ngOnInit() {
  }

  private createUserDataForm(): void {
    this.userDataForm = this.formBuilder.group({
      userTitle: ['', [ Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastName: ['', [Validators.required]],
      userCountry: ['', [Validators.required] ],
      street: ['', [Validators.required]],
      homeNumber: ['', [Validators.required]],
      postCode: ['', [Validators.required ] ],
      placeOfResidence : ['', [Validators.required]],
      // tslint:disable-next-line:max-line-length
      dateOfBirth: ['', [Validators.required , DateValidator.checkAgePlusEighteen ]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  private getErrorMessage(fieldName: string): string {
    const control = this.userDataForm.get(fieldName);
    return control.hasError('required') ? 'Dies ist ein Pflichtfeld' :
    control.hasError('underAge') ? 'Sie müssen mindestens 18 Jahre alt sein' :
    control.hasError('email') ? 'Bitte geben Sie eine gültige E-Mail Adresse ein. Zum Beispiel peter.mustermann@domain.de' : '';
    //  control.hasError('minlength') ? 'First name should be more than 2 characters' : '';
  }


}
