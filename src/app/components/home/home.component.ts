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

  isLocationSelectedd: boolean = true;

  isFormValid = true;

  noDataFound: boolean = false;

  errorMessage: boolean = false;




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
  MyAllPincodes: any;
  PinCodeGet: any;
  pin_code: any;
  coordinateService: any;
  latitude: any;
  longitude: any;
  isSearchActive: any;
  locationid: any;
  location_pin: any;
  goldData_pin: any;
  silverData_pin: any;
  stockList_pin: any;

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





    this.coordinateService.getCoordinates().subscribe(
      (PinCodeGet: { latitude: any; longitude: any; }) => {
        this.latitude = PinCodeGet.latitude;
        this.longitude = PinCodeGet.longitude;
      },
    );
  }






  selectState(data: any) {
    this.state_value = data.target.value;
    this.api.getCities(this.state_value).subscribe((res: any) => {
      this.cities = res.adminCities;
      this.city = "";
      this.location_list = [];
      this.updateFormValidity();
      this.contentVisible[2] = false;
      this.contentVisible[1] = this.cities.length > 0;
    });
  }



















  selectCity(data: any) {
    this.city = data.target.value;
    const user = this.cities.find((value: any) => value.city == this.city)
    if (user) {
      this.user_id = user.user_id;
      this.api.getLocation(this.user_id).subscribe((res: any) => {
        this.location_list = res.atms;


        console.log('location---list', this.location_list)
        this.atmlocation = res.atms[0].atmlocation;
        console.log(this.atmlocation, "ATMMMMMMMMMMMMMM")
        this.latitude = this.location_list[0].latitude
        this.longitude = this.location_list[0].longitude,
          console.log(this.location_list, "listtttt")
        this.location_value = "";
        this.updateFormValidity();
        this.contentVisible[2] = this.location_list.length > 0;
      });
    }
  }














  selectLocation(data: any) {
    this.locationid = 1
    this.location_value = data.target.value;
    this.isLocationSelected = this.location_value;

    this.updateFormValidity();
    console.log(this.isLocationSelectedd, "ssssssssssssssssssss")

    const atmId = this.location_list.find((value: any) => value.atmlocation === this.location_value);
    if (atmId) {
      this.atmId = atmId.atmid;
      this.api.getStock(this.atmId).subscribe((res: any) => {
        this.stockList = res;
        this.errorMessage = false
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&', this.stockList)
        this.atmIds.push(this.stockList[0].atmid);
        this.newwwatmid = this.atmIds[0];

        this.api.getStocks(this.newwwatmid).subscribe((res: any) => {
          this.newwww = res;
          this.goldData = this.newwww.filter((item: any) => item.type === 'Gold');
          this.silverData = this.newwww.filter((item: any) => item.type === 'Silver');
          this.atmlocation = this.location_value;
        });
      });
    }
  }






















  clearFields() {
    window.location.reload();
  }

  pincodefields() {
    window.location.reload();
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
  show_flag: { [key: string]: boolean } = {};
  toggleShow1() {
    this.isShown = !this.isShown;
  }

  toggleShow(id: any) {
    const atmId = id;
    const selected_id = this.PinCodeGet.find((item: any) => item.atmid == atmId);

    if (selected_id) {
      if (this.show_flag[atmId]) {
        this.show_flag[atmId] = false; // Toggle visibility
      } else {
        // Close all other boxes
        this.show_flag = {};
        this.show_flag[atmId] = true; // Open the selected one
      }
    } else {
      this.show_flag[atmId] = false; // Ensure it's hidden if no match is found
    }

    if (atmId) {
      this.atmId = atmId;
      this.api.getStock(this.atmId).subscribe((res: any) => {
        this.stockList_pin = res;
        if (this.stockList_pin && this.stockList_pin.length > 0) {
          this.atmIds.push(this.stockList_pin[0].atmid);
          this.newwwatmid = this.atmIds[0];
          this.api.getStocks(this.atmId).subscribe((res: any) => {
            this.newwww = res;
            this.errorMessage = false;
            this.goldData_pin = this.newwww.filter((item: any) => item.type === 'Gold');
            this.silverData_pin = this.newwww.filter((item: any) => item.type === 'Silver');
            this.atmlocation = this.location_value;
          }, error => {
            this.handleError("Error fetching stocks data");
          });
        } else {
          this.handleError("Stock list is empty");
        }
      }, error => {
        this.handleError("Error fetching stock data");
      });
    } else {
      this.handleError("ATM ID not found for the selected location");
    }
  }


  closeBox() {
    this.isShown = false;
  }
  closeBox1() {
    this.show_flag = {};
  }
  // stock view
  isLocationSelected = false;

  PinCode(event: any) {
    this.locationid = 2
    this.MyAllPincodes = event.target.value;
    console.log(this.MyAllPincodes, 'pincode');

    this.api.getPincode(this.pin_code).subscribe(
      (res: any) => {

        if (res.atm && res.atm.length > 0) {
          this.PinCodeGet = res.atm;
          console.log('myyyyyyyyyyyyyy', this.PinCodeGet)
          this.location_pin = this.PinCodeGet;
          this.location_value = this.PinCodeGet[0].atmlocation;
          this.isLocationSelected = this.location_value;
          this.latitude = this.location_pin[0].latitude;
          this.longitude = this.location_pin[0].longitude;
          this.atmlocation = res.atm[0].atmlocation;

          console.log(this.location_pin[0].latitude, "vvvvvvvvvvvvvv");
          console.log(this.location_pin[0].longitude, "vvvvvvvvvvvvvv");


        } else {
          this.handleError("No ATMs found for the provided pincode");
        }
        console.log(this.isLocationSelected, "llllllllllllllllllllllllll");
        console.log('my-Pincodes&&&&&&', this.PinCodeGet);
      },
      error => {
        this.handleError("Error fetching pincode ");
      }
    );
  }

  handleError(errorMessage: string) {

    this.errorMessage = true

    console.error(errorMessage, "LLLLLLLLLLLLLLLLLLLLL");


  }








  clear() {
    this.pin_code = '';
    this.isLocationSelectedd = false;
  }



  updateFormValidity() {
    this.isFormValid = this.state_value == '' && this.city == '' && this.location_value !== '';
  }





  openMap(event: MouseEvent): void {
    event.preventDefault();
    if (this.latitude && this.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${this.latitude},${this.longitude}`;
      window.open(url, '_blank');
    } else {
      console.error('Coordinates not available');
    }
  }



















}
