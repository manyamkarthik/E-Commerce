import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../interfaces/product.model';
import { ProductCategory } from '../interfaces/product-category.model';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  
  private baseUrl = 'http://localhost:8080/api/products';
  private prodcutsByCategoryIdUrl =
    'http://localhost:8080/api/products/search/findByCategoryId?id=';
  private categoryDataUrl = 'http://localhost:8080/api/product-category';
  private searchDataUrl =
    'http://localhost:8080/api/products/search/findByNameContaining?name=';
  private productsById='http://localhost:8080/api/products/'

  constructor(private http: HttpClient) {}
  getByProductId(Id: number):Observable<Product> {
    return this.http.get<Product>(this.productsById+Id)
  }
  

  getCategoryData(): Observable<ProductCategory[]> {
    return this.http.get<any[]>(this.categoryDataUrl).pipe(
      map((response: any) => {
        if (response._embedded && response._embedded.productCategory) {
          return response._embedded.productCategory.map((product: any) => {
            const { _links, ...rest } = product;
            return rest;
          });
        } else {
          return [];
        }
      })
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map((response: any) => {
        // Check if _embedded.products exists
        if (response._embedded && response._embedded.products) {
          // Return products array with each item
          return response._embedded.products.map((product: any) => {
            // Destructure _links from product
            const { _links, ...rest } = product;
            return rest; // Return product without _links
          });
        } else {
          return []; // Return empty array if no products found
        }
      })
    );
  }
  getByName(searchQuery: string): Observable<Product[]> {
    return this.http.get<any[]>(this.searchDataUrl + searchQuery).pipe(
      map((response: any) => {
        if (response._embedded && response._embedded.products) {
          return response._embedded.products.map((product: any) => {
            const { _links, ...rest } = product;
            return rest;
          });
        } else {
          return [];
        }
      })
    );
  }

  getById(currentCategoryId: number): Observable<Product[]> {
    return this.http
      .get<any[]>(this.prodcutsByCategoryIdUrl + currentCategoryId)
      .pipe(
        map((response: any) => {
          // console.log(this.prodcutsByCategoryIdUrl+currentCategoryId)
          // Check if _embedded.products exists
          if (response._embedded && response._embedded.products) {
            // Return products array with each item
            return response._embedded.products.map((product: any) => {
              // Destructure _links from product
              const { _links, ...rest } = product;
              // console.log("Success")
              return rest; // Return product without _links
            });
          } else {
            return []; // Return empty array if no products found
          }
        })
      );
  }

  
  
  getProductListPaginate(thePage:number,thePageSize:number,currentCategoryId: number): Observable<ProductResponse> {
    return this.http
      .get<any>(this.prodcutsByCategoryIdUrl + currentCategoryId+`&page=${thePage}&size=${thePageSize}`)
      .pipe(
        map((response: any) => {
          // Check if _embedded.products exists
          if (response._embedded && response._embedded.products) {
            const products = response._embedded.products.map((product: any) => {
              // Destructure _links from product
              const { _links, ...rest } = product;
              return rest; // Return product without _links
            });
            const page = response.page;
            return { products, page }; // Return products and pagination data
          } else {
            return { products: [], page: { size: 0, totalElements: 0, totalPages: 0, number: 0 } }; // Return empty array and default page if no products found
          }
        })
      );
  }

}
interface ProductResponse {
  products: Product[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}