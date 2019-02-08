import { Component, OnInit, OnDestroy } from "@angular/core";
import { CustomerService } from "src/app/services/customer.service";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Customer } from "src/app/model/customer.model";

@Component({
  selector: "app-customer-edit",
  templateUrl: "./customer-edit.component.html",
  styleUrls: ["./customer-edit.component.css"]
})
export class CustomerEditComponent implements OnInit, OnDestroy {
  id: number;
  error: string;
  customer: Customer;
  paramsSubscription: Subscription;
  customerForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.initForm();
    });
    this.customerService.getCustomer(this.id).subscribe(
      (customer: Customer) => {
        this.customer = customer;
        this.customerForm.controls["name"].setValue(this.customer.name);
        this.customerForm.controls["age"].setValue(this.customer.age);
        this.customerForm.controls["status"].setValue(this.customer.active);
      },
      error => (this.error = error)
    );
  }

  // Function to create reactive form for editing the customer
  initForm() {
    this.customerForm = new FormGroup({
      name: new FormControl("", Validators.required),
      age: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required)
    });
  }

  onSubmit() {
    let customer = new Customer(
      this.id,
      this.customerForm.value.name,
      this.customerForm.value.age,
      this.customerForm.value.status === "1" ? true : false
    );
    this.customerService.updateCustomer(this.id, customer).subscribe(
      response => {
        console.log("Customer data updated successfully!!", response);
        this.customerService.getData();
      },
      error => (this.error = error)
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
