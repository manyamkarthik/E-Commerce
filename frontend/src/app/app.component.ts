import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from "./components/product-list/product-list.component";
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { ProductCategoryComponent } from "./components/product-category/product-category.component";
import { SearchComponentComponent } from "./components/search-component/search-component.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from "./components/cart-status/cart-status.component";
import { OrderhistoryComponent } from "./components/orderhistory/orderhistory.component";
import { AuthService } from './services/auth-service.service';
import { AsyncPipe } from '@angular/common';

// import myAppConfig from '../../config/my-app-config';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ProductListComponent, RouterLink, ProductCategoryComponent, SearchComponentComponent, NgbModule, CartStatusComponent, OrderhistoryComponent,AsyncPipe]
})
export class AppComponent {
 title='commerce'
 username: string | null = null;

 constructor(private router: Router, private cd: ChangeDetectorRef) {}

 ngOnInit() {
  const storedUsername = this.authService.getUsername();
  if (storedUsername) {
    this.username = this.extractUsername(storedUsername);
  }
  this.authService.isLoggedIn.subscribe(isLoggedIn => {
    if (isLoggedIn) {
      const storedUsername = this.authService.getUsername();
      if (storedUsername) {
        this.username = this.extractUsername(storedUsername);
      }
      this.cd.detectChanges(); // Trigger change detection
    } else {
      this.username = null;
    }
  });
}
extractUsername(storedUsername: string): string {
  if (storedUsername.includes('@')) {
    return storedUsername.split('@')[0];
  }
  return storedUsername;
}
  authService=inject(AuthService);



  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.username=null;
  }
}
