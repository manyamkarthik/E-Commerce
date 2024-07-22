import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product.model';
import { BlobOptions } from 'buffer';
import { CartItem } from '../interfaces/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    
     cartItems: CartItem[]= this.getCartItemsFromSessionStorage();
     cartStatus$ = new BehaviorSubject<CartItem[]>(this.cartItems);
     totalPrice$ = new BehaviorSubject<number>(0);
     totalItems$ = new BehaviorSubject<number>(0);
     storage:Storage | null=null;

     constructor(){
      this.initializeCart();
  }

  private initializeCart() {
    if (this.isSessionStorageAvailable()) {
      this.storage = sessionStorage;
      const data = this.getCartItemsFromSessionStorage();
      if (data) {
        this.cartItems = data;
        this.updateCartStatus();
      }
    }
  }
  
    getCartStatus() {
      return this.cartStatus$.asObservable();
    }
  
    getTotalPrice() {
      return this.totalPrice$.asObservable();
    }
  
    getTotalItems() {
      return this.totalItems$.asObservable();
    }
  
    addToCart(product: Product) {
      let alreadyExistsInCart: boolean = false;
      let existingCartItem: CartItem | undefined = undefined;
  
      if (this.cartItems.length > 0) {
        existingCartItem = this.cartItems.find(item => item.product.id === product.id);
        alreadyExistsInCart = (existingCartItem !== undefined);
      }
  
      if (alreadyExistsInCart) {
        if (existingCartItem) {
          existingCartItem.quantity++;
        }
      } else {
        this.cartItems.push({ product: product, quantity: 1 });
      }
  
      this.updateCartStatus();
    }
  
    private updateCartStatus() {
      this.cartStatus$.next(this.cartItems);
      this.calculateTotals();
      this.saveCartItemsToSessionStorage();
    }
  
    private saveCartItemsToSessionStorage() {
      if (this.storage) {
        this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
      }
    }
  
    private getCartItemsFromSessionStorage(): CartItem[] {
      if (this.storage) {
        const cartItems = this.storage.getItem('cartItems');
        return cartItems ? JSON.parse(cartItems) : [];
      }
      return [];
    }
  
    private isSessionStorageAvailable(): boolean {
      try {
        const test = '__sessionStorage_test__';
        sessionStorage.setItem(test, test);
        sessionStorage.removeItem(test);
        return true;
      } catch (e) {
        return false; 
      }
    }
  
    private calculateTotals() {
      const totalPrice = this.cartItems.reduce((sum, item) => sum + (item.product.unitPrice * item.quantity), 0);
      const totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
      this.totalPrice$.next(totalPrice);
      this.totalItems$.next(totalItems);
    }
    decrement(_t10: CartItem) {
        const item=this.cartItems.find(item=> _t10.product.id===item.product.id);
        if(item && _t10.quantity==1){
            this.removeFromCart(_t10)
        }
        if(item && _t10.quantity>1){
            item.quantity--;
            this.updateCartStatus();
        }
    }
    removeFromCart(cartItem: CartItem) {
        const index = this.cartItems.findIndex(item => item.product.id === cartItem.product.id);
        if (index !== -1) {
          this.cartItems.splice(index, 1);
          this.updateCartStatus();
        }
      }
      increment(_t10: CartItem) {
        const item=this.cartItems.find(item => _t10.product.id===item.product.id);
        if(item){
            item.quantity++;
            this.updateCartStatus();
        }
      }
  }