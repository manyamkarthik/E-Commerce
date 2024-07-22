import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderhistoryService } from '../../services/orderhistory.service';
import { CurrencyPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { AuthService } from '../../services/auth-service.service';


@Component({
    selector: 'app-orderhistory',
    standalone: true,
    templateUrl: './orderhistory.component.html',
    styleUrl: './orderhistory.component.css',
    imports: [CurrencyPipe, TableModule]
})
export class OrderhistoryComponent implements OnInit {

  private orderService=inject(OrderhistoryService);
  private authService=inject(AuthService);

  orders:any[]=[];
  email:string='';
  isDataAvalaiable:boolean=false;

  ngOnInit(): void {
    const storedUsername = this.authService.getUsername();
    if (storedUsername) {
      this.email = storedUsername;
      this.getByEmail()
    } else {
      return;
      // console.error('localStorage is not available. Cannot retrieve email.');
      // Handle the absence of localStorage as needed
    }
  }

  getByEmail():void{
    this.orderService.getByEmail(this.email).subscribe( 
      (data:any) =>{
        console.log(data);
        this.orders=data._embedded.orders
      },
      (error) =>{
        console.log(error)
        

      }
    )
  }

  


}


