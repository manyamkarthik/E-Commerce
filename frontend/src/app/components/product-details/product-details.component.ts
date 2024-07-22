import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-Service';
import { Product } from '../../interfaces/product.model';
import { CurrencyPipe,Location } from '@angular/common';
import { ScrollService } from '../../services/ScrollService';
import { CartService } from '../../services/CartService.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  Id:number=0;
  data!:Product;

  constructor(private route: ActivatedRoute,
    private location:Location
  ) {}

  private productService = inject(ProductService);
  private scrollService=inject(ScrollService);
  private cartService=inject(CartService);

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProductsById();
    });
  }
  handleCart(arg0: Product) {
    this.cartService.addToCart(arg0);
  }
  listProductsById() {
    const hasId=this.route.snapshot.paramMap.has('id');
    if(hasId){
      this.Id=+this.route.snapshot.paramMap.get('id')!;
      this.productService.getByProductId(this.Id).subscribe(
        (data) =>{
          this.data=data
          // console.log(this.data)
        },
        (e)=>{
          console.log(e)
        }
      )

    }
    
  }
  goBack(): void {
    this.location.back();
    this.scrollService.restoreScrollPosition();
  }


}
