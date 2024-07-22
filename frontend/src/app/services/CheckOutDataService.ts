import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class CheckOutYearsData{

    getCreditCardMonths(startmonth:number):Observable<number[]>{
        const data:number[]=[];
        for(let i=startmonth;i<=12;i++){
            data.push(i)
        }
        return of(data);
    }
    getCreditCardYears(year:number):Observable<number[]>{
        // const year:number=new Date().getFullYear()
        
        const data:number[]=[];
        for(let i=year;i<=year+10;i++){
            data.push(i)
        }
        return of(data);
    }


}