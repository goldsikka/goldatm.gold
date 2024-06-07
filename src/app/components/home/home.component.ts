import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  //  show stock and close

  contentVisible: boolean[] = [];
  state_value: any;
  cities: any;
  city: any;
  user_id: any;
  location_list: any;
  location_value: any;
  atmId: any;
  stockList: any;
  atmIds: any[] = [];
  newwwatmid: any;
  newwww: any;
  atmlocation: string = ""; // Initialize atmlocation property


  // live price
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
  constructor(private api: ApiService) { }

  ngOnInit() {

    // Initialize contentVisible array
    this.contentVisible = [true, false, false];
    //live price
    this.getliveprices();
    // stock 
    // this.api.getStocks(this.newwwatmid).subscribe(data => {
    //   this.stocks = data.map((stock, index) => ({
    //     data: stock
    //   }));

    //   console.log(data[0][0].atmlocation,'hhhhhhhhhhhhhh');
    // });



    this.api.getStates().subscribe(data => {
      this.states = data.map((item: { state: string }) => item.state);
    });

  }

  selectState(data: any) {
    this.state_value = data.target.value;
    this.api.getCities(this.state_value).subscribe((res: any) => {
      this.cities = res.adminCities;
      // Reset city and location_list when state changes
      this.city = "";
      this.location_list = [];
      // Show the next dropdown if there are cities
      this.contentVisible[1] = this.cities && this.cities.length > 0;
    });
  }

  selectCity(data: any) {
    this.city = data.target.value;
    const user = this.cities.find((value: any) => value.city == this.city)
    if (user) {
      this.user_id = user.user_id;
      this.api.getLocation(this.user_id).subscribe((res: any) => {
        this.location_list = res.atms;
        // Reset location_list when city changes
        this.location_value = "";
        // Show the next dropdown if there are locations
        this.contentVisible[2] = this.location_list && this.location_list.length > 0;
      });
    }
  }

  selectLocation(data: any) {
    this.location_value = data.target.value;
    const atmId = this.location_list.find((value: any) => value.atmlocation == this.location_value);
    if (atmId) {
      this.atmId = atmId.atmid;
      this.api.getStock(this.atmId).subscribe((res: any) => {
        this.stockList = res;
        this.atmIds.push(this.stockList[0].atmid);
        this.newwwatmid = this.atmIds[0];

        this.api.getStocks(this.newwwatmid).subscribe((res: any) => {
          this.newwww = res;
          // Filter data into gold and silver lists
          this.goldData = this.newwww.filter((item: any) => item.type === 'Gold');
          this.silverData = this.newwww.filter((item: any) => item.type === 'Silver');

          // Set atmlocation property to the selected ATM location
          this.atmlocation = this.location_value;
        });
      });
    }
  }

  clearFields() {
    // Clear all selected values
    this.state_value = "";
    this.city = "";
    this.location_value = "";
    // Reset dropdown visibility
    this.contentVisible = [true, false, false];
  }

  // Initialize the lists
  goldData: any[] = [];
  silverData: any[] = [];


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

      this.previousLivesellprice24 = currentLivesellprice24;
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

  //stock details 

  stockData: any[] = [];
  stocks: any[] = [];

  isAvailable(count: number): string {
    return count > 0 ? 'Yes' : 'No';
  }

  //states

  states: string[] = [];

  // view & close
  isShown = false;

  toggleShow() {
    this.isShown = !this.isShown;
  }
  closeBox() {
    this.isShown = false;
  }
}
