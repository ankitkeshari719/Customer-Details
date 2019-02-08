import { Component, OnInit, OnDestroy } from "@angular/core";
import { CustomerService } from "src/app/services/customer.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Customer } from "src/app/model/customer.model";
import { Subscription } from "rxjs/internal/Subscription";

@Component({
  selector: "app-customer-details",
  templateUrl: "./customer-details.component.html",
  styleUrls: ["./customer-details.component.css"]
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  id: number;
  customer: Customer;
  paramsSubscription: Subscription;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.customerService
        .getCustomer(this.id)
        .subscribe((customer: Customer) => {
          this.customer = customer;
        });
    });
  }

  // Funtion to delete the customer
  onDeleteCustomer() {
    this.customerService.deleteCustomer(this.id).subscribe(response => {
      console.log("Customer data deleted successfully!!");
      this.customerService.getData();
    });
    this.router.navigate(["../customer"]);
  }

  //Fuction to edit the customer
  onEditCustomer() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
