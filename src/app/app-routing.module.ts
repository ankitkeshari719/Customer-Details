import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CustomerStartComponent } from "./components/customers/customer-start/customer-start.component";
import { CustomerDetailsComponent } from "./components/customers/customer-details/customer-details.component";
import { CustomerEditComponent } from "./components/customers/customer-edit/customer-edit.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "customer",
    pathMatch: "full"
  },
  { path: "customer", component: CustomerStartComponent },
  { path: ":id", component: CustomerDetailsComponent },
  { path: ":id/edit", component: CustomerEditComponent },
  { path: "**", component: CustomerStartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
