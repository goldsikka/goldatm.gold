import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  livesellprice24: any = 0;
  // livesellprice22: any = 0;
  livesellpricesilver: any = 0;
  private destroy$ = new Subject<void>();
  livesellprice24color: string = 'black';
  // livesellprice22color: string = 'black';
  livesellpricesilvercolor: string = 'black';
  previousLivesellprice24: number = 0;
  // previousLivesellprice22: number = 0;
  previousLivesellpricesilver: number = 0;
  updatedDate: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getliveprices();
   
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getliveprices() {
    this.api.liveprice().subscribe((res: any) => {

      const currentLivesellprice24 = res.carat24.sell_price_per_gram + 10;
      // const currentLivesellprice22 = res.carat22.sell_price_per_gram;
      const currentLivesellpricesilver = res.silverPrice.sell_price_per_gram + 10;
      this.updatedDate = res.carat24.updated_at;

      this.livesellprice24color = this.getTextColor(
        currentLivesellprice24,
        this.previousLivesellprice24
      );
      // this.livesellprice22color = this.getTextColor(
      //   currentLivesellprice22,
      //   this.previousLivesellprice22
      // );
      this.livesellpricesilvercolor = this.getTextColor(
        currentLivesellpricesilver,
        this.previousLivesellpricesilver
      );

      this.livesellprice24 = currentLivesellprice24;
      // this.livesellprice22 = currentLivesellprice22;
      this.livesellpricesilver = currentLivesellpricesilver;

      this.previousLivesellprice24 =  currentLivesellprice24;
      // this.previousLivesellprice22 = currentLivesellprice22;
      this.previousLivesellpricesilver = currentLivesellpricesilver;
    });
  }

  getTextColor(currentPrice: number, previousPrice: number): string {
    if (currentPrice > previousPrice) {
      return 'red';
    } else if (currentPrice < previousPrice) {
      return 'green';
    } else {  
      return 'black';
    }
  }
}
