import { CurrencyPipe, JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CheckOutYearsData } from '../../services/CheckOutDataService';
import { CountryAndStateService } from '../../services/CountriesService';
import { Country } from '../../interfaces/Country';
import { State } from '../../interfaces/State';
import { CartService } from '../../services/CartService.service';
import { Purchase } from '../../common/purchase';
import { Router } from '@angular/router';
import { CheckOutService } from '../../services/check-out.service';
import { Order } from '../../common/order';
import { OrderItem } from '../../common/order-item';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  // purchase!:Purchase;

  totalPrice: number = 0;
  totalQuantity: number = 0;
  private checkout_yearsService = inject(CheckOutYearsData);
  private countryService = inject(CountryAndStateService);
  private cartService = inject(CartService);
  private checkoutService = inject(CheckOutService);
  months: number[] = [];
  years: number[] = [];
  countryData: Country[] = [];
  stateData: State[] = [];
  stateData2: State[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.cartService.getTotalPrice().subscribe((price: number) => {
      this.totalPrice = price;
    });

    this.cartService.getTotalItems().subscribe((items: number) => {
      this.totalQuantity = items;
    });
    this.countryService.getCountries().subscribe((data) => {
      this.countryData = data;
    });

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: [
          '',
          [
            Validators.email,
            Validators.required,
            Validators.pattern(
              '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
            ),
          ],
        ],
      }),
      shippingAddress: this.formBuilder.group({
        street: ['', [Validators.required, Validators.minLength(5)]],
        city: ['', [Validators.required, Validators.minLength(2)]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        zipCode: ['', [Validators.required, Validators.minLength(5)]], // US ZIP code pattern
      }),
      billingAddress: this.formBuilder.group({
        street: ['', [Validators.required, Validators.minLength(5)]],
        city: ['', [Validators.required, Validators.minLength(2)]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        zipCode: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')],
        ], // US ZIP code pattern
      }),
      creditCard: this.formBuilder.group({
        cardType: ['', [Validators.required]],
        nameOnCard: ['', [Validators.required, Validators.minLength(2)]],
        cardNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{16}$')],
        ], // Credit card number pattern
        securityCode: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{3,4}$')],
        ], // CVV pattern
        expirationMonth: ['', [Validators.required]],
        expirationYear: ['', [Validators.required]],
      }),
    });
    const startmonth: number = new Date().getMonth() + 1;
    const starYear: number = new Date().getFullYear();
    this.checkout_yearsService
      .getCreditCardMonths(startmonth)
      .subscribe((data) => {
        this.months = data;
      });
    this.checkout_yearsService
      .getCreditCardYears(starYear)
      .subscribe((data) => {
        this.years = data;
      });
  }
  handleMonthsAndYears() {
    const creditcardGroup = this.checkoutFormGroup.get('creditCard');
    const starYear: number = new Date().getFullYear();
    let startmonth: number;
    const selectedYear = Number(creditcardGroup?.get('expirationYear')?.value);
    if (starYear === selectedYear) {
      startmonth = new Date().getMonth() + 1;
    } else {
      startmonth = 1;
    }
    this.checkout_yearsService
      .getCreditCardMonths(startmonth)
      .subscribe((data) => {
        this.months = data;
      });
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
      const selectedCountry =
        this.checkoutFormGroup.controls['shippingAddress'].get(
          'country'
        )?.value;
      if (selectedCountry) {
        this.countryService.getStates(selectedCountry).subscribe((data) => {
          this.stateData2 = data;
          const selectedState =
            this.checkoutFormGroup.controls['shippingAddress'].get(
              'state'
            )?.value;
          this.checkoutFormGroup.controls['billingAddress']
            .get('state')
            ?.setValue(selectedState);
        });
      }
      // this.stateData2 = this.stateData
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.stateData2 = [];
    }
  }
  handleStatesData(event: any, addressType: string) {
    const selectedCountry = event.target.value;
    if (selectedCountry) {
      this.countryService.getStates(selectedCountry).subscribe((data) => {
        if (addressType === 'shipping') {
          this.stateData = data;
        } else {
          this.stateData2 = data;
        }
      });
    }
  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    // new purchase class object
    let purchase = new Purchase();
    //populate customer data
    const customerFormGroup = this.checkoutFormGroup.get('customer');

    if (customerFormGroup) {
      const customer = customerFormGroup.value;

      purchase.customer = customer;
    } else {
      console.error('Customer FormGroup is undefined');
    }

    //populate shippingAddress
    purchase.shippingAddress =
      this.checkoutFormGroup.get('shippingAddress')?.value;
      console.log("shipping value"+purchase.shippingAddress);
    const state: State = JSON.parse(
      JSON.stringify(purchase.shippingAddress.state)
    );
    const country: Country = JSON.parse(
      JSON.stringify(purchase.shippingAddress.country)
    );
    purchase.shippingAddress.state = state.name;
    purchase.shippingAddress.country = country.name;

    //poopulate billingAddress
    purchase.billingAddress =
      this.checkoutFormGroup.get('billingAddress')?.value;
    const state2: State = JSON.parse(
      JSON.stringify(purchase.billingAddress.state)
    );
    const country2: Country = JSON.parse(
      JSON.stringify(purchase.billingAddress.country)
    );
    purchase.billingAddress.state = state2.name;
    purchase.billingAddress.country = country2.name;

    //populate order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;
    purchase.order = order;

    //populate orderItem
    const cartItems = this.cartService.cartItems;
    let orderitems: OrderItem[] = [];
    orderitems = cartItems.map((item) => new OrderItem(item));
    console.log(orderitems);
    purchase.orderItems = orderitems;
    console.log(purchase);
    // localStorage.setItem('email',purchase.customer.email)

    this.checkoutService.sendProducts(purchase).subscribe((data) => {
      alert(
        'Your Order Has been Recieved \n with tracking number     ' +
          data.orderTrackingNumber
      );
      this.resetcart();
    });
  }
  resetcart() {
    this.cartService.cartItems = [];
    
    this.cartService.cartStatus$.next(this.cartService.cartItems); // Update cart status BehaviorSubject

    // Reset total price and total quantity
    this.cartService.totalPrice$.next(0);
    this.cartService.totalItems$.next(0);
    // localStorage.removeItem('email');

    this.checkoutFormGroup.reset();

    this.router.navigateByUrl('/products');
  }
  get firstName() {
    const control = this.checkoutFormGroup.get('customer.firstName');
    return control;
  }

  get lastName() {
    const control = this.checkoutFormGroup.get('customer.lastName');
    return control;
  }

  get email() {
    const control = this.checkoutFormGroup.get('customer.email');
    return control;
  }

  get streetShipping() {
    const control = this.checkoutFormGroup.get('shippingAddress.street');
    return control;
  }

  get cityShipping() {
    const control = this.checkoutFormGroup.get('shippingAddress.city');
    return control;
  }

  get stateShipping() {
    const control = this.checkoutFormGroup.get('shippingAddress.state');
    return control;
  }

  get countryShipping() {
    const control = this.checkoutFormGroup.get('shippingAddress.country');
    return control;
  }

  get zipCodeShipping() {
    const control = this.checkoutFormGroup.get('shippingAddress.zipCode');
    return control;
  }

  get streetBilling() {
    const control = this.checkoutFormGroup.get('billingAddress.street');
    return control;
  }

  get cityBilling() {
    const control = this.checkoutFormGroup.get('billingAddress.city');
    return control;
  }

  get stateBilling() {
    const control = this.checkoutFormGroup.get('billingAddress.state');
    return control;
  }

  get countryBilling() {
    const control = this.checkoutFormGroup.get('billingAddress.country');
    return control;
  }

  get zipCodeBilling() {
    const control = this.checkoutFormGroup.get('billingAddress.zipCode');
    return control;
  }

  get cardType() {
    const control = this.checkoutFormGroup.get('creditCard.cardType');
    return control;
  }

  get nameOnCard() {
    const control = this.checkoutFormGroup.get('creditCard.nameOnCard');
    return control;
  }

  get cardNumber() {
    const control = this.checkoutFormGroup.get('creditCard.cardNumber');
    return control;
  }

  get securityCode() {
    const control = this.checkoutFormGroup.get('creditCard.securityCode');
    return control;
  }

  get expirationMonth() {
    const control = this.checkoutFormGroup.get('creditCard.expirationMonth');
    return control;
  }

  get expirationYear() {
    const control = this.checkoutFormGroup.get('creditCard.expirationYear');
    return control;
  }
}
