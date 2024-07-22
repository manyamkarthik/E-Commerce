import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import path from 'path';
import { AppComponent } from './app.component';
import { appConfig } from './app.config';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderhistoryComponent } from './components/orderhistory/orderhistory.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [

  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'orders',
    component:OrderhistoryComponent
  },
 
  {
    path:'checkout',
    component:CheckOutComponent
  },
  {
    path: 'search/:keyword',
    component: ProductListComponent,
  },
  {
    path:'cart-details',
    component:CartDetailComponent
  },
  {

    path:'product/:id',
    component:ProductDetailsComponent
  },
  {
    path: 'category/:id',
    component: ProductListComponent,
  },

  {
    path: 'category',
    component: ProductListComponent,
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  
  {
    path: '**',
    redirectTo: '/products',
    pathMatch: 'full',
  },
];

export default appConfig;
