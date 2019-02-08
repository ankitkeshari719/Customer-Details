import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Customer } from "src/app/model/customer.model";
import { CustomerService } from "src/app/services/customer.service";

@Component({
  selector: "app-customers-list",
  templateUrl: "./customers-list.component.html",
  styleUrls: ["./customers-list.component.css"]
})
export class CustomersListComponent implements OnInit {
  customers: Customer[];
  subscription: Subscription;
  error: string;

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customerService.customerChanged.subscribe(
      (customers: Customer[]) => {
        this.customers = customers;
      },
      error => (this.error = error)
    );
    this.reloadData();
  }

  reloadData() {
    this.customerService
      .getCustomersList()
      .subscribe(
        (customers: Customer[]) => (this.customers = customers),
        error => (this.error = error)
      );
  }
}
