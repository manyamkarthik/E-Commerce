import { Component } from '@angular/core';
import { CartService } from '../../services/CartService.service';
import { Product } from '../../interfaces/product.model';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../../interfaces/CartItem';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-status',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalItems:number=0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartStatus().subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
    this.cartService.getTotalPrice().subscribe((price: number) => {
      this.totalPrice = price;
    });

    this.cartService.getTotalItems().subscribe((items: number) => {
      this.totalItems = items;
    });
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.product.unitPrice * item.quantity), 0);
    this.totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);

  }

}
