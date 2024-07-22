import { Component, OnInit, inject } from '@angular/core';
import { ProductCategory } from '../../interfaces/product-category.model';
import { ProductService } from '../../services/product-Service';
import { error } from 'console';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css'
})
export class ProductCategoryComponent implements OnInit {

private productService=inject(ProductService)
categoryData:ProductCategory[]=[];

  ngOnInit(): void {
    this.getCategoryData();
  }
  getCategoryData() {
    this.productService.getCategoryData().subscribe(
      (data) =>{
        this.categoryData=data
        console.log(this.categoryData)
      },
      (error) =>{
        console.log(error);

      }
    )
  }

  



}
