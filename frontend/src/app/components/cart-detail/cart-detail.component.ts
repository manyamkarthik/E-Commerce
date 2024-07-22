import { Component } from '@angular/core';
import { CartItem } from '../../interfaces/CartItem';
import { CartService } from '../../services/CartService.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.css'
})
export class CartDetailComponent {


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
  getSubtotal(item: CartItem): number {
    return item.quantity * item.product.unitPrice;
  }
  incrementQuantity(_t10: CartItem) {
    this.cartService.increment(_t10)
    
    }
    decrementQuantity(_t10: CartItem) {
      this.cartService.decrement(_t10)
    
    }
    remove(_t10: CartItem) {
      this.cartService.removeFromCart(_t10)
      }


}
