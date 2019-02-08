import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Subject, throwError, Observable } from "rxjs";
import { Customer } from "../model/customer.model";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  private baseUrl = "http://localhost:8888/customers";
  customerChanged = new Subject<Customer[]>();
  customers: Customer[];
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(private http: HttpClient) {}

  // Function to fetch the customer's details
  getCustomersList() {
    return this.http
      .get<Customer[]>(`${this.baseUrl}`)
      .pipe(catchError(this.handleError));
  }

  getData() {
    this.getCustomersList().subscribe((response: Customer[]) => {
      this.customers = response;
      this.customerChanged.next(this.customers.slice());
    });
  }

  // Function to fetch the single customer details
  getCustomer(id: number) {
    return this.http
      .get<Customer>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Function to add a new customer details
  addCustomer(customer: Customer) {
    return this.http.post(`${this.baseUrl}`, customer, this.httpOptions).pipe(
      map(res => console.log(res)),
      catchError(this.handleError)
    );
  }

  // Function to update a new customer details
  updateCustomer(id: number, customer: Customer) {
    return this.http
      .put(`${this.baseUrl}/${id}`, customer, this.httpOptions)
      .pipe(
        map(res => console.log(res)),
        catchError(this.handleError)
      );
  }

  // Function to delete a new customer details
  deleteCustomer(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`, this.httpOptions).pipe(
      map(res => console.log(res)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
