import { PRODUCTS } from './../shared/product/products';
import { Product } from './../shared/product/product';
import { COUNTRIES, TITLES } from './../shared/lists';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateValidator } from '../shared/customValidator/dateValidator';
import { Order } from '../shared/user/order';
import { User } from '../shared/user/user';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  userDataForm: FormGroup;
  private orderData: Order;
  private userData: User;
  private selectedProduct: Product;
  private maxDate: Date;
  private quantityArray: number[];
  private quantityPrice = 0;
  private oneItemPrice = 0;
  private totalPriceWithFees = 0;
  private delivaryFees = 0;
  private quantityOrder = 1 ;
  private  ChargeOutSideGermany = 13.88;
  // tslint:disable-next-line:max-line-length
  private dateEnFormatRegex = new RegExp('(^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$)');
  formFields = {
    'firstName': '',
    'lastName' : ''
  };
  titles = TITLES;
  countries = COUNTRIES;
  // localProducts //= PRODUCTS;
    constructor(private formBuilder: FormBuilder) {
    this.createUserDataForm();
    const maxYear = new Date().getFullYear() - 18;
    this.maxDate = new Date( maxYear, 11 , 31 );
    const localProducts: Product[] = [{
      sku: 1111 ,
      name: '5-Euro-Münzen 2016–2021',
      regularPrice: 17.9,
      onSale: true,
      isAvailable: true,
      salePrice: 4.32,
      delivaryFees: 7.33,
      quantityLimitToOrder: 3 ,
       currency: 'EUR',
      // salePercentage: number;
      shortDescription: 'Die offiziellen deutschen 5-Euro-Münzen 2016–2021 komplett',
      shortDescriptionHtml: '',
      lognDescription: '',
      longDescriptionHtml: '',
      wight: 9 ,
      wightUnit: 'g',
      dimension: 27.25,
      dimensionUnit: 'mm',
      // tslint:disable-next-line:max-line-length
      imageThumbUrl: 'https://mdm.scene7.com/is/image/MDM/mf_liste_Sammlung_folderabo_rund_neu_miniwarenkorb?$miniwarenkorb$&$muenze_1=subtropische_zone_vs&$muenze_2=Subtropisch_A&$muenze_3=5-Euro-Motiv&$muenze_4=5-E-Klimazone-VS_neu&$muenze_5=Planet_Erde&$muenze_6=Planet_Erde_5&$muenze_7=G_350044-001_350045-001_350046-001_1&$muenze_8=350044_1&$muenze_9=350044_2_1&$muenze_11=350044_3&$wa_1=1303260103_geschlossen&$wa_2=subtropische_zone_ehz', // thumnail image url
      imagesUrls: [],
      preOwned: false // if there is old owner
      }];
      this.selectedProduct = localProducts[0];
      this.quantityArray = Array.apply(null, Array(this.selectedProduct.quantityLimitToOrder)).map(function (_, i) {return i; });
      this.oneItemPrice = this.selectedProduct.onSale ? this.selectedProduct.salePrice : this.selectedProduct.regularPrice;
      this.quantityPrice = this.oneItemPrice;
      this.totalPriceWithFees = this.quantityPrice + this.selectedProduct.delivaryFees;
      this.delivaryFees = this.selectedProduct.delivaryFees;
       // [...Array(this.selectedProduct.quantityLimitToOrder).keys()];
      // this.quantityArray  = [...Array(3).keys()];
      console.log(this.selectedProduct);
   }

  ngOnInit() {

  }
  private makeOrder() {
    console.log('AAA');

    if ( !this.userDataForm.invalid ) {
     this.userData = this.userDataForm.value;
    //  this.userData.userTitle = this.userDataForm.value['userTitle'];
    //  this.userData.firstName = this.userDataForm.value['firstName'];
    //  this.userData.lastName = this.userDataForm.value['lastName'];
    //  this.userData.country = this.userDataForm.value['userCountry'];
    //  this.userData.street = this.userDataForm.value['street'];
    //  this.userData.homeNumber = this.userDataForm.value['homeNumber'];
    //  this.userData.postCode = this.userDataForm.value['postCode'];
    //  this.userData.placeOfResidence = this.userDataForm.value['placeOfResidence'];
    //  this.userData.dateOfBirth = this.userDataForm.value['dateOfBirth'];
    //  this.userData.email = this.userDataForm.value['email'];

     this.orderData = new Order();
     this.orderData.date = Date.now().toString();
     this.orderData.user = this.userData;
     this.orderData.quantity = this.quantityOrder;
     this.orderData.product = this.selectedProduct;

     this.resetForm();
     alert(`${this.orderData.user.userTitle} ${this.orderData.user.lastName}, \n Ihre Bestellung wurde erfolgreich übermittelt.
     Sie erhalten innerhalb von wenigen Minuten eine Bestell-Bestätigungs-E-Mail an ${this.orderData.user.email}.`);

    }
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

  private changeQuantity(value) {
    this.quantityOrder = value;
    this.quantityPrice = this.oneItemPrice * value;
    this.totalPriceWithFees = this.quantityPrice +  this.delivaryFees;
  }
  private changeCountry(countryCode) {
    if ( countryCode.toLowerCase() === 'de' || countryCode === '') {
      this.updateDelivaryFeesAndTotalFees(0);
    } else {
      this.updateDelivaryFeesAndTotalFees(this.ChargeOutSideGermany );
    }

  }
  updateDelivaryFeesAndTotalFees(extraFees) {
    this.updateDelivaryFees(extraFees);
    this.totalPriceWithFees = this.quantityPrice +  this.delivaryFees;
  }
  updateDelivaryFees(extraFees) {
    this.delivaryFees = this.selectedProduct.delivaryFees + extraFees;
  }

  resetForm() {
    this.userDataForm.reset({
      userTitle: '',
      firstName: '',
      lastName: '',
      userCountry: '',
      street: '',
      homeNumber: '',
      postCode: '',
      placeOfResidence : '',
      // tslint:disable-next-line:max-line-length
      dateOfBirth: '',
      email: ''
    });
    this.userDataForm.markAsPristine();
    this.userDataForm.markAsUntouched();
    this.userDataForm.updateValueAndValidity();
  }

}
