import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UserWelcomeComponent } from "../user/user-welcome/user-welcome.component";
import { UserHomeComponent } from "../user/user-home/user-home.component";
import { FinancialStatusComponent } from "../finances/financial-status/financial-status.component";
import { ExpensesComponent } from "../finances/expenses/expenses.component";
import { IncomeComponent } from "../finances/income/income.component";
import { GoalsComponent } from "../finances/goals/goals.component";
import { SavingsComponent } from "../finances/savings/savings.component";

const routes: Routes = [
    {path: '', redirectTo: '/welcome', pathMatch: 'full'},
    {path: 'home/:Id', component: UserHomeComponent,
        children: [
            {path: 'welcome', component: UserWelcomeComponent},
            {path: 'financeCalc', component: FinancialStatusComponent},
            {path: 'expenses', component: ExpensesComponent},
            {path: 'income', component: IncomeComponent},
            {path: 'goals', component: GoalsComponent},
            {path: 'savings', component: SavingsComponent},
        ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SidebarRoutingModule {}