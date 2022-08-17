import { Component, OnInit } from '@angular/core';
import { range } from 'rxjs';
import { Expense } from 'src/app/models/expense';
import { Income } from 'src/app/models/income';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FinancialService } from 'src/app/services/financial.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { IncomeComponent } from '../income/income.component';

@Component({
  selector: 'app-financial-status',
  templateUrl: './financial-status.component.html',
  styleUrls: ['./financial-status.component.scss']
})
export class FinancialStatusComponent implements OnInit {

  range1 = range(30, 44);
  range2 = range(45, 59);
  parts !:string[];
  dateParts !: number[];

  income !: Income;
  incomes !: Income[];
  expense !: Expense;
  expenses !: Expense[];
  currentId !: number;
  user : User = new User();
  ageValue : number = 0;
  lifeExpectValue: number = 85;
  goalAgeValue: number = 65;
  incomeValue : number = 0;
  expensesValue : number = 0
  retirementBudget = 0;
  savingsValue : number = 0;

  yearsOfAffordableRetirement!: number;
  adjustedIncomeTotal : number = 0;
  adjustedExpenseTotal : number = 0;

  constructor(private authService: AuthService,
    private userService : UserService,
    private storageService : StorageService,
    private financialService : FinancialService
  ) { }

  ngOnInit(): void {
    this.currentId = this.storageService.getUser().id;
    this.loadUser();
    this.loadFinances(this.currentId);
    console.log("Income value: " + this.incomeValue)
    console.log('userId: ' + this.currentId)
    console.log("Age value: " + this.ageValue);

  }

  loadUser(){
    this.userService.getUser(this.currentId).subscribe((data : any) =>{
      this.user = data;
      this.setAge();
      console.log(this.user)
    });
  }

  setAge(){
    // this.parts = (this.user.dateOfBirth.split('-'));
    // var mydate = new Date(parseInt(this.parts[0]), parseInt(this.parts[1]) - 1, parseInt(this.parts[2]));
    // var dateee = Date.parse(this.user.dateOfBirth)
    let timeDiff = Math.abs(Date.now() - new Date(this.user.dateOfBirth).getTime())
    this.ageValue = Math.floor(timeDiff/(1000 * 3600 * 24)/365.25)
    return this.ageValue;
  }

  //
  //Finances
  //

  loadFinances(currentId: number) {
    this.financialService.getIncomeByUserId(currentId).subscribe({
      next: (incomes) => {
        this.incomes = incomes;
        console.log(incomes);
        this.calculateIncomeTotal();
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.financialService.getExpensesByUserId(currentId).subscribe({
      next: (expenses) => {
        this.expenses = expenses;
        console.log(expenses);
        this.calculateExpenseTotal();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  calculateIncomeTotal() {
    for (let i of this.incomes) {
      console.log('amount =' + i.amount);
      this.adjustIncomeTotal(i);
    }
    
  }

  calculateExpenseTotal(){
    for (let e of this.expenses) {
      console.log('amount =' + e.amount);
      this.adjustExpenseTotal(e);
    }
  }


  adjustIncomeTotal(income : Income){
    console.log('yearly');
        if (income.frequency === 'Hourly') {
          this.adjustedIncomeTotal += income.amount * 2083.2;
          console.log('adjusted total: ' + this.adjustedIncomeTotal);
        }
        if (income.frequency === 'Daily') {
          this.adjustedIncomeTotal += income.amount * 365;
          console.log('adjusted total: ' + this.adjustedIncomeTotal);
        }
        if (income.frequency === 'Weekly') {
          this.adjustedIncomeTotal += income.amount * 52;
          console.log('adjusted total: ' + this.adjustedIncomeTotal);
        }
        if (income.frequency === 'Bi-Weekly') {
          this.adjustedIncomeTotal += income.amount * 26;
          console.log('adjusted total: ' + this.adjustedIncomeTotal);
        }
        if (income.frequency === 'Monthly') {
          this.adjustedIncomeTotal += income.amount * 12;
          console.log('adjusted total: ' + this.adjustedIncomeTotal);
        }
        if (income.frequency === 'Quarterly') {
          this.adjustedIncomeTotal += income.amount * 4;
          console.log('adjusted total: ' + this.adjustedIncomeTotal);
        }
        if (income.frequency === 'Yearly') {
          this.adjustedIncomeTotal += income.amount;
          console.log('adjusted total: ' + this.adjustedIncomeTotal);
        }
      console.log("adjusted total" + this.adjustedIncomeTotal);
    this.incomeValue = this.adjustedIncomeTotal
    return this.incomeValue
  }

  adjustExpenseTotal(expense : Expense){
    console.log('yearly');
        if (expense.frequency === 'Daily') {
          this.adjustedExpenseTotal += expense.amount * 365;
          console.log('adjusted total: ' + this.adjustedExpenseTotal);
        }
        if (expense.frequency === 'Weekly') {
          this.adjustedExpenseTotal += expense.amount * 52;
          console.log('adjusted total: ' + this.adjustedExpenseTotal);
        }
        if (expense.frequency === 'Bi-Weekly') {
          this.adjustedExpenseTotal += expense.amount * 26;
          console.log('adjusted total: ' + this.adjustedExpenseTotal);
        }
        if (expense.frequency === 'Monthly') {
          this.adjustedExpenseTotal += expense.amount * 12;
          console.log('adjusted total: ' + this.adjustedExpenseTotal);
        }
        if (expense.frequency === 'Quarterly') {
          this.adjustedExpenseTotal += expense.amount * 4;
          console.log('adjusted total: ' + this.adjustedExpenseTotal);
        }
        if (expense.frequency === 'Yearly') {
          this.adjustedExpenseTotal += expense.amount;
          console.log('adjusted total: ' + this.adjustedExpenseTotal);
        }
      console.log("adjusted total" + this.adjustedExpenseTotal);
    this.expensesValue = this.adjustedExpenseTotal
    return this.expensesValue
  }

}
