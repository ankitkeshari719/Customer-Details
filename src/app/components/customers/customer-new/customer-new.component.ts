import { Component, OnInit, OnDestroy } from "@angular/core";
import { CustomerService } from "src/app/services/customer.service";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Customer } from "src/app/model/customer.model";

@Component({
  selector: "app-customer-new",
  templateUrl: "./customer-new.component.html",
  styleUrls: ["./customer-new.component.css"]
})
export class CustomerNewComponent implements OnInit, OnDestroy {
  id: number;
  paramsSubscription: Subscription;
  customerForm: FormGroup;
  error: string;
  customers: Customer[];
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.initForm();
    });
  }

  // Function to create reactive form for editing the customer
  initForm() {
    this.customerForm = new FormGroup({
      name: new FormControl("", Validators.required),
      age: new FormControl("", Validators.required),
      status: new FormControl("1", Validators.required)
    });
  }

  onSubmit() {
    let customer = new Customer(
      this.id,
      this.customerForm.value.name,
      this.customerForm.value.age,
      this.customerForm.value.status === "1" ? true : false
    );
    this.customerService.addCustomer(customer).subscribe(
      response => {
        console.log("Customer has been created successfully!!", response);
        this.customerService.getData();
      },
      error => (this.error = error)
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
