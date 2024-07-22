import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../services/product-Service';
import { Product } from '../../interfaces/product.model';
import { error } from 'console';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-component',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './search-component.component.html',
  styleUrl: './search-component.component.css',
})
export class SearchComponentComponent {
  
  searchQuery: string = '';
 

  onSubmit(form: NgForm) {
    // this.getDataByName(this.searchQuery);
    // console.log(this.searchQuery);
    form.resetForm();
  }

  
}
