import { CartItem } from "../interfaces/CartItem";

export class OrderItem {
    imageUrl!:String;
    quantity!:number;
    unitPrice!:number;
    productId!:number;
    constructor(cart:CartItem){
        this.imageUrl=cart.product.imageUrl;
        this.quantity=cart.quantity;
        this.unitPrice=cart.product.unitPrice;
        this.productId=cart.product.id;

    }


}
