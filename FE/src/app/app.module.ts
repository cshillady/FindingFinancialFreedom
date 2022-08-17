import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AboutComponent } from './components/about/about.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FinancialStatusComponent } from './components/finances/financial-status/financial-status.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserWelcomeComponent } from './components/user/user-welcome/user-welcome.component';
import { SidebarRoutingModule } from './components/sidebar/sidebar-routing.module';
import { ExpensesComponent } from './components/finances/expenses/expenses.component';
import { IncomeComponent } from './components/finances/income/income.component';
import { GoalsComponent } from './components/finances/goals/goals.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgChartsModule } from 'ng2-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminComponent } from './components/admin/admin.component';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { SavingsComponent } from './components/finances/savings/savings.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    AboutComponent,
    UserHomeComponent,
    FinancialStatusComponent,
    SidebarComponent,
    UserWelcomeComponent,
    ExpensesComponent,
    IncomeComponent,
    GoalsComponent,
    ProfileComponent,
    AdminComponent,
    SavingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSliderModule,
    SidebarRoutingModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgChartsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
