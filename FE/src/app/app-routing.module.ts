import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { FinancialStatusComponent } from './components/finances/financial-status/financial-status.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { FAQsComponent } from './components/faqs/faqs.component';
import { AdminComponent } from './components/admin/admin.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full' },
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'about', component: AboutComponent},
  {path: 'home/:Id', component: UserHomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'faq', component: FAQsComponent},
  {path: 'admin', component: AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
