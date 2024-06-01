
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Environment } from '../environments/environment';
import { BehaviorSubject, Observable, forkJoin,Subject, catchError, interval, merge, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverEndpoint = `${Environment.apiUrl}`;
  public cartData$:Subject<any> = new Subject;
  public wishCountData$:Subject<any> = new Subject;
  private refreshInterval = 1000;
 
  constructor(private http: HttpClient) {
    if (Environment.production) {
      this.serverEndpoint = Environment.apiUrl;
    }
  }
 
  /**
   *
   * @param endpoint
   * @param data
   * @param headers
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  post(endpoint: any, data: any, headers?: {}) {
    return this.http.post(this.serverEndpoint + endpoint, data, headers);
  }

  /**
   *
   * @param endpoint
   * @param params
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  get(endpoint: string, params?: {}) {
    return this.http.get(this.serverEndpoint + endpoint, params);
  }
  liveprice() {
    const endPoint = `/global/price/list`
    // return this.http.get(this.serverEndpoint + endPoint),interval(this.refreshInterval);
    return merge(this.http.get<any>(this.serverEndpoint + endPoint),interval(this.refreshInterval).pipe(
      switchMap(() => this.http.get<any>(this.serverEndpoint + endPoint))
    ));
  }
 

  /**
   *
   * @param endpoint
   * @param params
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  delete(endpoint: string, params?: {}) {
    return this.http.delete(this.serverEndpoint + endpoint, params);
  }

  /**
   *
   * @param endpoint
   * @param params
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  put(endpoint: string, params?: {}) {
    return this.http.put(this.serverEndpoint + endpoint, params);
  }

  //atm stock 
  @Injectable({
    providedIn: 'root'
  })
  private stockUrl = Environment.stockUrl;



  getStock(atmId: string): Observable<any> {
    return this.http.get(`${this.stockUrl}${atmId}`);
  }

  getStocks(atmIds: string[]): Observable<any[]> {
    const requests = atmIds.map(id => this.getStock(id));
    return forkJoin(requests);
  }
   
}