import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product-Service';
import { Product } from '../../interfaces/product.model';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import{ScrollService} from '../../services/ScrollService'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../services/CartService.service';
import { CartItem } from '../../interfaces/CartItem';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe,RouterLink,NgbModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number=1;
  searchQuery: string | null = '';
  //pagination
  pagenumber:number=0;
  pagesize:number=5;
  totalElements:number=0;
  previousCategoryId: number=1;
  constructor(private route: ActivatedRoute){}

  private productService = inject(ProductService);
  private scrollService=inject(ScrollService);
  private cartService=inject(CartService);
  

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  ngAfterViewInit(): void {
    this.scrollService.restoreScrollPosition();
  }

  saveScrollPosition() {
    this.scrollService.saveScrollPosition();
  }
  handleCart(_t5: Product) {
    this.cartService.addToCart(_t5);
    console.log(_t5.id+'is activated');
  }

  listProducts() {
    const hasId = this.route.snapshot.paramMap.has('id');
    const hasName = this.route.snapshot.paramMap.has('keyword');
    if (hasId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      // console.log(this.currentCategoryId)
    } else {
      this.currentCategoryId = 1;
    }

    this.searchQuery = this.route.snapshot.paramMap.get('keyword')!;

    if (hasName && this.searchQuery) {
      console.log(this.searchQuery);

      this.productService.getByName(this.searchQuery).subscribe(
        (data) => {
          this.products = data;
          // console.log(this.products);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {

      if(this.previousCategoryId!=this.currentCategoryId){
        this.pagenumber=1;
      }
      // console.log(this.currentCategoryId+"fsdfsd" + this.previousCategoryId)
      this.previousCategoryId=this.currentCategoryId
      

      this.productService.getProductListPaginate(this.pagenumber-1,this.pagesize,this.currentCategoryId).subscribe(
        (data) => {
          this.products = data.products;
          this.pagenumber=data.page.number+1
          this.pagesize=data.page.size
          this.totalElements=data.page.totalElements
          // console.log(this.products);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
