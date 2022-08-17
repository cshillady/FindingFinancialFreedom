import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FinancialService } from 'src/app/services/financial.service';
import { Expense } from 'src/app/models/expense';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/models/user';
import { Chart, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  currentId!: number;
  expenses!: any;
  expense: Expense = new Expense;
  user: User = new User;
  updateToggle = false;
  currentExpenseId: any;
  addExpenseToggle = true;
  total: number = 0;
  finalTotal: number = 0; 
  adjustedTotal: number = 0;
  adjustedAmount: number = 0;
  adjustedExpense: number = 0;
  selected: string = '';
  changedFrequency: string = '';

  
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  public doughnutChartLabels: string[] = [];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data: [], label: 'Series A' },
      // { data: [ 50, 150, 120 ], label: 'Series B' },
      // { data: [ 250, 130, 70 ], label: 'Series C' }
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: true
  };


  constructor(private financialService: FinancialService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.currentId = this.storageService.getUser().id;
    this.user = this.storageService.getUser();
    this.changedFrequency = 'Daily';
    this.loadExpenses(this.currentId);
    this.loadChart(this.changedFrequency);
    console.log(this.currentId);
    console.log(this.user);
  }

  loadExpenses(currentId: number) {
    this.financialService.getExpensesByUserId(currentId).subscribe({ 
      next: (expenses) => {
        this.expenses = expenses;
        console.log(expenses);
        this.calculateTotal();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateExpense(eId: number) {
    this.financialService.updateExpenseByUserId(this.currentId, eId, this.expense).subscribe({
      next: (expense) => {
        this.expense = expense;
        this.reloadPage();
        console.log(expense)
      }
    })
  }

  updateToggler(expenseId: number) {
    switch(this.updateToggle) {
      case false:
        this.updateToggle = true;
        this.addExpenseToggle = false;
        this.financialService.getExpenseByid(this.currentId, expenseId).subscribe( (expense: any) => {
            this.expense = expense;
            console.log(expense);
        });
        this.currentExpenseId = expenseId;
        break;
      default:
        this.updateToggle = false;
        this.addExpenseToggle = true;
        this.addExpenseToggler();
    }
    
  }

  deleteExpense(currentExpenseId: number) {
    this.financialService.deleteExpenseById(this.currentId, currentExpenseId).subscribe((data: any) => {
      console.log(data);
      this.reloadPage();
    })
  }

  addExpenseToggler() {
    this.expense = new Expense();
    this.addExpenseToggle = true;
    this.updateToggle = false;
  }

  addExpense(expense: Expense) {
    this.financialService.addExpense(this.currentId, this.expense).subscribe( (expense: any) => {
        this.expense = expense;
        this.reloadPage();
        console.log(expense)
      })
  }

  calculateTotal() {
    for (let i of this.expenses) {
      this.total += Number(i.amount);
      console.log("amount =" + i.amount);
      this.adjustedTotal += this.adjustTotal(i);
    }
    return this.total;
  }

  loadChart(value: string) {
    this.financialService.getExpensesByUserId(this.currentId).subscribe(data=> {
      this.expenses = data;

        // this.adjustedExpense = this.adjustTotal(i.amount);
        
        for (let i of this.expenses) {
          switch (value) {
            // DAILY
            case 'Daily':
              if (i.frequency === 'Daily') {
                this.adjustedExpense = i.amount
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              } 
                if (i.frequency === 'Weekly') {
                this.adjustedExpense = i.amount / 7
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              } 
                if (i.frequency === 'Bi-Weekly') {
                this.adjustedExpense = i.amount / 14
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
                if (i.frequency === 'Monthly') {
                this.adjustedExpense = i.amount / 30
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              if (i.frequency === 'Quarterly') {
                this.adjustedExpense = i.amount / 120
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              if (i.frequency === 'Yearly') {
                this.adjustedExpense = i.amount / 365
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              break;
            // WEEKLY
            case 'Weekly':
              if (i.frequency === 'Daily') {
                this.adjustedExpense = i.amount * 7
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              } 
              if (i.frequency === 'Weekly') {
                this.adjustedExpense = i.amount
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              } 
              if (i.frequency === 'Bi-Weekly') {
                this.adjustedExpense = i.amount / 2
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              if (i.frequency === 'Monthly') {
                this.adjustedExpense = i.amount / 4
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              if (i.frequency === 'Quarterly') {
                this.adjustedExpense = i.amount / 12
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              if (i.frequency === 'Yearly') {
                this.adjustedExpense = i.amount / 52
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              break;
            // BI-WEEKLY
            case 'Bi-Weekly':
              if (i.frequency === 'Daily') {
                this.adjustedExpense = i.amount * 14
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              } 
              if (i.frequency === 'Weekly') {
                this.adjustedExpense = i.amount * 2
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              } 
              if (i.frequency === 'Bi-Weekly') {
                this.adjustedExpense = i.amount
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              if (i.frequency === 'Monthly') {
                this.adjustedExpense = i.amount / 2
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              if (i.frequency === 'Quarterly') {
                this.adjustedExpense = i.amount / 6
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              if (i.frequency === 'Yearly') {
                this.adjustedExpense = i.amount / 26
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              break;
            // MONTHLY
            case 'Monthly':
              if (i.frequency === 'Daily') {
                this.adjustedExpense = i.amount * 30
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              } 
              if (i.frequency === 'Weekly') {
                this.adjustedExpense = i.amount * 4
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              } 
              if (i.frequency === 'Bi-Weekly') {
                this.adjustedExpense = i.amount * 2
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              if (i.frequency === 'Monthly') {
                this.adjustedExpense = i.amount
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              if (i.frequency === 'Quarterly') {
                this.adjustedExpense = i.amount / 3
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              if (i.frequency === 'Yearly') {
                this.adjustedExpense = i.amount / 12
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              break;
            // QUARTERLY
            case 'Quarterly':
              if (i.frequency === 'Daily') {
                this.adjustedExpense = i.amount * 90
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              } 
              if (i.frequency === 'Weekly') {
                this.adjustedExpense = i.amount * 12
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              } 
              if (i.frequency === 'Bi-Weekly') {
                this.adjustedExpense = i.amount * 6
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              if (i.frequency === 'Monthly') {
                this.adjustedExpense = i.amount * 2
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              if (i.frequency === 'Quarterly') {
                this.adjustedExpense = i.amount
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              if (i.frequency === 'Yearly') {
                this.adjustedExpense = i.amount / 4
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              break;
            // YEARLY
            case 'Yearly':
              if (i.frequency === 'Daily') {
                this.adjustedExpense = i.amount * 365
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              } 
              if (i.frequency === 'Weekly') {
                this.adjustedExpense = i.amount * 52
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              } 
              if (i.frequency === 'Bi-Weekly') {
                this.adjustedExpense = i.amount * 26
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              if (i.frequency === 'Monthly') {
                this.adjustedExpense = i.amount * 12
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              if (i.frequency === 'Quarterly') {
                this.adjustedExpense = i.amount * 4
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              if (i.frequency === 'Yearly') {
                this.adjustedExpense = i.amount
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.description)
                this.chart.update();
              }
              break;
          }
        }
        // this.doughnutChartDatasets[0].data.push(i.amount);
        // this.doughnutChartLabels.push(i.description);
        // console.log("adjusted expense = " + this.adjustedExpense);
      console.log(this.doughnutChartDatasets);
      console.log(this.doughnutChartLabels);
      console.log(this.changedFrequency);
        // this.chart.update();
      
    })
    
  }
  

  adjustTotal(expense: Expense) {
    console.log('adjusttotal touched');
    console.log('selected is: ' + this.selected);
    switch (this.selected) {
      //DAILY
      case 'Daily':
        console.log('daily');
        if (expense.frequency === 'Daily') {
          this.adjustedAmount = expense.amount;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Weekly') {
          this.adjustedAmount = expense.amount / 7;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Bi-Weekly') {
          this.adjustedAmount = expense.amount / 14;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Monthly') {
          this.adjustedAmount = expense.amount / 30;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Quarterly') {
          this.adjustedAmount = expense.amount / 120;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Yearly') {
          this.adjustedAmount = expense.amount / 365;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        break;
      //WEEKLY  
      default:
        console.log('weekly');
        if (expense.frequency === 'Daily') {
          this.adjustedAmount = expense.amount * 7;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Weekly') {
          this.adjustedAmount = expense.amount;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Bi-Weekly') {
          this.adjustedAmount = expense.amount / 2;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Monthly') {
          this.adjustedAmount = expense.amount / 4;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Quarterly') {
          this.adjustedAmount = expense.amount / 12;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Yearly') {
          this.adjustedAmount = expense.amount / 52;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        break;
      //BI-WEEKLY   
      case 'Bi-Weekly':
        console.log('daily');
        if (expense.frequency === 'Daily') {
          this.adjustedAmount = expense.amount * 14;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Weekly') {
          this.adjustedAmount = expense.amount * 2;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Bi-Weekly') {
          this.adjustedAmount = expense.amount;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Monthly') {
          this.adjustedAmount = expense.amount / 2;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Quarterly') {
          this.adjustedAmount = expense.amount / 6;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Yearly') {
          this.adjustedAmount = expense.amount / 26;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        break;
      //MONTHLY   
      case 'Monthly':
        console.log('monthly');
        if (expense.frequency === 'Daily') {
          this.adjustedAmount = expense.amount * 30;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Weekly') {
          this.adjustedAmount = expense.amount * 4;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Bi-Weekly') {
          this.adjustedTotal += expense.amount * 2;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Monthly') {
          this.adjustedAmount = expense.amount;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Quarterly') {
          this.adjustedTotal += expense.amount / 3;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Yearly') {
          this.adjustedAmount = expense.amount / 12;
          console.log('yearly amount is!!!')
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        break;
      //QUARTERLY   
      case 'Quarterly':
        console.log('quarterly');
        if (expense.frequency === 'Daily') {
          this.adjustedAmount = expense.amount * 90;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Weekly') {
          this.adjustedAmount = expense.amount * 12;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Bi-Weekly') {
          this.adjustedAmount = expense.amount * 6;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Monthly') {
          this.adjustedAmount = expense.amount * 2;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Quarterly') {
          this.adjustedAmount = expense.amount;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Yearly') {
          this.adjustedAmount = expense.amount / 4;
          console.log('yearly amount is!!!')
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        break;
      //YEARLY  
      case 'Yearly':
        console.log('yearly');
        if (expense.frequency === 'Daily') {
          this.adjustedAmount = expense.amount * 365;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Weekly') {
          this.adjustedAmount = expense.amount * 52;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Bi-Weekly') {
          this.adjustedAmount = expense.amount * 26;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Monthly') {
          this.adjustedAmount = expense.amount * 12;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Quarterly') {
          this.adjustedAmount = expense.amount * 4;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (expense.frequency === 'Yearly') {
          this.adjustedAmount = expense.amount;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        break;
    }
    return this.adjustedAmount;
  }

  onSelected(value: string): void {
    this.selected = value;
    this.adjustedTotal = 0;
    this.onChangedFrequency(value);
    console.log('selected is' + this.selected);
    this.calculateTotal();
  }

  onChangedFrequency(value: string): void {
    this.changedFrequency = value;
    console.log('changedFrequency is ' + this.changedFrequency);
    this.loadChart(this.changedFrequency);
    console.log(this.changedFrequency);
    this.doughnutChartDatasets[0].data = [];
    this.doughnutChartLabels = [];
    this.chart.update();
  }

  reloadPage() : void{
    window.location.reload();
  }

}
