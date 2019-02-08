import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./core/header/header.component";
import { CustomersComponent } from "./components/customers/customers.component";
import { CustomersListComponent } from "./components/customers/customers-list/customers-list.component";
import { CustomerComponent } from "./components/customers/customers-list/customer/customer.component";
import { CustomerDetailsComponent } from "./components/customers/customer-details/customer-details.component";
import { CustomerStartComponent } from "./components/customers/customer-start/customer-start.component";
import { FooterComponent } from "./core/footer/footer.component";
import { CustomerEditComponent } from "./components/customers/customer-edit/customer-edit.component";
import { CustomerNewComponent } from './components/customers/customer-new/customer-new.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomersComponent,
    CustomersListComponent,
    CustomerComponent,
    CustomerDetailsComponent,
    CustomerStartComponent,
    FooterComponent,
    CustomerEditComponent,
    CustomerNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
