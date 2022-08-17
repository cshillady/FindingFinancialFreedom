import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Expense } from 'src/app/models/expense';
import { Income } from 'src/app/models/income';
import { User } from 'src/app/models/user';
import { FinancialService } from 'src/app/services/financial.service';
import { StorageService } from 'src/app/services/storage.service';

interface Frequency {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
})
export class IncomeComponent implements OnInit {
  // frequencies: Frequency[] = [
  //   { value: 'once-0', viewValue: 'Once' },
  //   { value: 'daily-1', viewValue: 'Daily' },
  //   { value: 'weekly-2', viewValue: 'Weekly' },
  //   { value: 'bi-weekly-3', viewValue: 'Bi-Weekly' },
  //   { value: 'monthly-4', viewValue: 'Monthly' },
  //   { value: 'quarterly-5', viewValue: 'Quarterly' },
  // ];

  frequency!: Frequency;
  selected = '';
  currentId!: any;
  income: Income = new Income();
  user: User = new User();
  incomes!: any;
  updateToggle = false;
  currentIncomeId: any;
  addIncomeToggle = true;
  total: number = 0;
  finalTotal: number = 0;
  adjustedTotal: number = 0;
  wageToggler = false;
  beforeTaxIncome : Income = new Income();
  changedFrequency: string = '';
  adjustedExpense: number = 0;


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

  constructor(
    private financialService: FinancialService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.currentId = this.storageService.getUser().id;
    this.user = this.storageService.getUser();
    this.changedFrequency = 'Daily';
    this.loadIncome(this.currentId);
    this.loadChart(this.changedFrequency);
    console.log(this.currentId);
    console.log(this.user);
    console.log(this.total);
  }

  loadIncome(currentId: number) {
    this.financialService.getIncomeByUserId(currentId).subscribe({
      next: (incomes) => {
        this.incomes = incomes;
        console.log(incomes);
        this.calculateTotal();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateIncome(inId: number) {
    this.financialService
      .updateIncomeByUserId(this.currentId, inId, this.income)
      .subscribe({
        next: (income) => {
          this.income = income;
          this.reloadPage();
          console.log(income);
        },
      });
  }

  updateToggler(incomeId: number) {
    switch(this.updateToggle) {
      case false:
        this.updateToggle = true;
        this.addIncomeToggle = false;
        this.financialService.getExpenseByid(this.currentId, incomeId).subscribe( (income: any) => {
            this.income = income;
            console.log(income);
        });
        this.currentIncomeId = incomeId;
        break;
      default:
        this.updateToggle = false;
        this.addIncomeToggle = true;
        this.addIncomeToggler();
    }
  }

  deleteIncome(currentIncomeId: number) {
    this.financialService
      .deleteIncomeById(this.currentId, currentIncomeId)
      .subscribe((data: any) => {
        console.log(data);
        this.reloadPage();
      });
  }

  addIncomeToggler() {
    this.income = new Income();
    this.addIncomeToggle = true;
    this.updateToggle = false;
    
  }

  addIncome(income: Income) {
      this.financialService
      .addIncome(this.currentId, this.income)
      .subscribe((income: any) => {
        this.income = income;
        this.reloadPage();
        console.log(income);
      });
  }

  reloadPage(): void {
    window.location.reload();
  }

  loadChart(value: string) {
    this.financialService.getIncomeByUserId(this.currentId).subscribe(data=> {
      this.incomes = data;

        // this.adjustedExpense = this.adjustTotal(i.amount);
        
        for (let i of this.incomes) {
          switch (value) {
            case 'Hourly':
              if (i.frequency === 'Hourly') {
                this.adjustedExpense = i.amount
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
              if (i.frequency === 'Daily') {
                this.adjustedExpense = i.amount * 8
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
                if (i.frequency === 'Weekly') {
                this.adjustedExpense = i.amount / 40
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
                if (i.frequency === 'Bi-Weekly') {
                this.adjustedExpense = i.amount / 80
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
                if (i.frequency === 'Monthly') {
                this.adjustedExpense = i.amount / 320
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              if (i.frequency === 'Quarterly') {
                this.adjustedExpense = i.amount / 640
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              if (i.frequency === 'Yearly') {
                this.adjustedExpense = i.amount / 2560
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              break;
            // DAILY
            case 'Daily':
              if (i.frequency === 'Hourly') {
                this.adjustedExpense = i.amount / 8
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
              if (i.frequency === 'Daily') {
                this.adjustedExpense = i.amount
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
                if (i.frequency === 'Weekly') {
                this.adjustedExpense = i.amount / 5
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
                if (i.frequency === 'Bi-Weekly') {
                this.adjustedExpense = i.amount / 10
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
                if (i.frequency === 'Monthly') {
                this.adjustedExpense = i.amount / 20
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              if (i.frequency === 'Quarterly') {
                this.adjustedExpense = i.amount / 80
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              if (i.frequency === 'Yearly') {
                this.adjustedExpense = i.amount / 240
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              break;
            // WEEKLY
            case 'Weekly':
              if (i.frequency === 'Hourly') {
                this.adjustedExpense = i.amount * 40
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
              if (i.frequency === 'Daily') {
                this.adjustedExpense = i.amount * 5
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
              if (i.frequency === 'Weekly') {
                this.adjustedExpense = i.amount
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
              if (i.frequency === 'Bi-Weekly') {
                this.adjustedExpense = i.amount / 2
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              if (i.frequency === 'Monthly') {
                this.adjustedExpense = i.amount / 4
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              if (i.frequency === 'Quarterly') {
                this.adjustedExpense = i.amount / 12
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              if (i.frequency === 'Yearly') {
                this.adjustedExpense = i.amount / 52
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              break;
            // BI-WEEKLY
            case 'Bi-Weekly':
              if (i.frequency === 'Hourly') {
                this.adjustedExpense = i.amount * 80
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
              if (i.frequency === 'Daily') {
                this.adjustedExpense = i.amount * 20
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
              if (i.frequency === 'Weekly') {
                this.adjustedExpense = i.amount * 2
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
              if (i.frequency === 'Bi-Weekly') {
                this.adjustedExpense = i.amount
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              if (i.frequency === 'Monthly') {
                this.adjustedExpense = i.amount / 2
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              if (i.frequency === 'Quarterly') {
                this.adjustedExpense = i.amount / 6
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              if (i.frequency === 'Yearly') {
                this.adjustedExpense = i.amount / 26
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              break;
            // MONTHLY
            case 'Monthly':
              if (i.frequency === 'Hourly') {
                this.adjustedExpense = i.amount * 160
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
              if (i.frequency === 'Daily') {
                this.adjustedExpense = i.amount * 20
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
              if (i.frequency === 'Weekly') {
                this.adjustedExpense = i.amount * 4
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
              if (i.frequency === 'Bi-Weekly') {
                this.adjustedExpense = i.amount * 2
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              if (i.frequency === 'Monthly') {
                this.adjustedExpense = i.amount
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              if (i.frequency === 'Quarterly') {
                this.adjustedExpense = i.amount / 3
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              if (i.frequency === 'Yearly') {
                this.adjustedExpense = i.amount / 12
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              break;
            // QUARTERLY
            case 'Quarterly':
              if (i.frequency === 'Hourly') {
                this.adjustedExpense = i.amount * 640
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
              if (i.frequency === 'Daily') {
                this.adjustedExpense = i.amount * 100
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
              if (i.frequency === 'Weekly') {
                this.adjustedExpense = i.amount * 12
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
              if (i.frequency === 'Bi-Weekly') {
                this.adjustedExpense = i.amount * 6
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              if (i.frequency === 'Monthly') {
                this.adjustedExpense = i.amount * 4
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              if (i.frequency === 'Quarterly') {
                this.adjustedExpense = i.amount
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              if (i.frequency === 'Yearly') {
                this.adjustedExpense = i.amount / 4
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              break;
            // YEARLY
            case 'Yearly':
              if (i.frequency === 'Hourly') {
                this.adjustedExpense = i.amount * 2560
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
              if (i.frequency === 'Daily') {
                this.adjustedExpense = i.amount * 260
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
              if (i.frequency === 'Weekly') {
                this.adjustedExpense = i.amount * 52
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              } 
              if (i.frequency === 'Bi-Weekly') {
                this.adjustedExpense = i.amount * 26
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              if (i.frequency === 'Monthly') {
                this.adjustedExpense = i.amount * 12
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              if (i.frequency === 'Quarterly') {
                this.adjustedExpense = i.amount * 4
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
                this.chart.update();
              }
              if (i.frequency === 'Yearly') {
                this.adjustedExpense = i.amount
                console.log(this.adjustedExpense)
                this.doughnutChartDatasets[0].data.push(this.adjustedExpense);
                this.doughnutChartLabels.push(i.source)
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

  calculateTotal() {
    for (let i of this.incomes) {
      this.total += Number(i.amount);
      console.log('amount =' + i.amount);
      this.adjustTotal(i);
    }
    return this.total;
  }

  adjustTotal(income: Income) {
    console.log('adjusttotal touched');
    console.log('selected is: ' + this.selected);
    switch (this.selected) {
      //HOURLY
      default:
        console.log('hourly');
        if (income.frequency === 'Hourly') {
          this.adjustedTotal += income.amount;
          //hourlyIncome
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Daily') {
          this.adjustedTotal += income.amount / 8;
          //dailyIncome / 8 hours in a day
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Weekly') {
          this.adjustedTotal += income.amount / 40;
          //weeklyIncome / 5 work days * 8 hours in a day
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Bi-Weekly') {
          this.adjustedTotal += income.amount / 80;
          console.log("biweekly = income/80")
          //biWeeklyIncome / 5 * work days * 2 weeks * 8 hours in a day
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Monthly') {
          this.adjustedTotal += income.amount / 173.6;
          //monthlyIncome / 5 work days * 4.34 weeks * 8 hours in a day
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Quarterly') {
          this.adjustedTotal += income.amount / 520.8;
          //quarterlyIncome / 5 work days * 4.34 weeks * 3 months * 8 hours in a day
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Yearly') {
          this.adjustedTotal += income.amount / 2083.2;
          //yearlyIncome / 5 work days * 4.34 weeks * 12 months * 8 hours in a day
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        break;
      //DAILY
      case 'Daily':
        console.log('daily');
        if (income.frequency === 'Hourly') {
          this.adjustedTotal += income.amount * 8;
          //hourlyIncome * 8 hours
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Daily') {
          this.adjustedTotal += income.amount;
          //dailyIncome
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Weekly') {
          this.adjustedTotal += income.amount / 5;
          //weeklyIncome / 5 days
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Bi-Weekly') {
          this.adjustedTotal += income.amount / 10;
          //biWeeklyIncome / 5 days * 2 weeks
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Monthly') {
          this.adjustedTotal += income.amount / 20;
          //monthlyIncome / 5 days * 4 weeks
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Quarterly') {
          this.adjustedTotal += income.amount / 60;
          //quarterlyIncome / 5 days * 4 weeks * 3 months
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Yearly') {
          this.adjustedTotal += income.amount / 240;
          //quarterlyIncome / 5 days * 4 weeks * 12 months
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        break;
      //WEEKLY  
      case 'Weekly':
        console.log('weekly');
        if (income.frequency === 'Hourly') {
          this.adjustedTotal += income.amount * 5 * 8;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Daily') {
          this.adjustedTotal += income.amount * 5;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Weekly') {
          this.adjustedTotal += income.amount;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Bi-Weekly') {
          this.adjustedTotal += income.amount / 2;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Monthly') {
          this.adjustedTotal += income.amount / 4;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Quarterly') {
          this.adjustedTotal += income.amount / 12;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Yearly') {
          this.adjustedTotal += income.amount / 52;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        break;
      //BI-WEEKLY   
      case 'Bi-Weekly':
        console.log('biweekly');
        if (income.frequency === 'Hourly') {
          this.adjustedTotal += income.amount * 8 * 5 * 2;
          //hourlyIncome * 8 hours * 5 days * 2 weeks
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Daily') {
          this.adjustedTotal += income.amount * 10;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Weekly') {
          this.adjustedTotal += income.amount * 2;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Bi-Weekly') {
          this.adjustedTotal += income.amount;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Monthly') {
          this.adjustedTotal += income.amount / 2;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Quarterly') {
          this.adjustedTotal += income.amount / 6;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Yearly') {
          this.adjustedTotal += income.amount / 26;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        break;
      //MONTHLY   
      case 'Monthly':
        console.log('monthly');
        if (income.frequency === 'Hourly') {
          this.adjustedTotal += income.amount * 8 * 5 * 4.34;
          //hourlyIncome * 8 hours * 5 days * 4.34 weeks 
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Daily') {
          this.adjustedTotal += income.amount * 21.7;
          //income * 5 days * 4.34 weeks 
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Weekly') {
          this.adjustedTotal += income.amount * 4.34;
          //income *  4.34 weeks
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Bi-Weekly') {
          this.adjustedTotal += income.amount * 2.17;
          //income *  4.34 weeks/2 segments
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Monthly') {
          this.adjustedTotal += income.amount;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Quarterly') {
          this.adjustedTotal += income.amount / 3;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Yearly') {
          this.adjustedTotal += income.amount / 12;
          console.log('yearly amount is!!!')
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        break;
      //QUARTERLY   
      case 'Quarterly':
        console.log('quarterly');
        if (income.frequency === 'Hourly') {
          this.adjustedTotal += income.amount * 8 * 5 * 4.34 * 3;
          //hourlyIncome * 8 hours * 5 days * 4.34 weeks * 3 months 
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Daily') {
          this.adjustedTotal += income.amount * 65.1;
          //Income * 5 days * 4.34 weeks * 3 months
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Weekly') {
          this.adjustedTotal += income.amount * 13.02;
          //Income * 4.34 weeks * 3 months
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Bi-Weekly') {
          this.adjustedTotal += income.amount * 6.51;
          //Income * 4.34 weeks/2 * 3 months
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Monthly') {
          this.adjustedTotal += income.amount * 2;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Quarterly') {
          this.adjustedTotal += income.amount;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Yearly') {
          this.adjustedTotal += income.amount / 4;
          console.log('yearly amount is!!!')
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        break;
      //YEARLY  
      case 'Yearly':
        console.log('yearly')
        if (income.frequency === 'Hourly') {
          this.adjustedTotal += income.amount * 8 * 5 * 4.34 * 12;
          //hourlyIncome * 8 hours * 5 days * 4.34 weeks * 12 months 
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        console.log('yearly');
        if (income.frequency === 'Daily') {
          this.adjustedTotal += income.amount * 260.4;
          //income * 5 * 4.34 weeks * 12 months
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Weekly') {
          this.adjustedTotal += income.amount * 52.08;
          //income *  4.34 weeks * 12 months
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Bi-Weekly') {
          this.adjustedTotal += income.amount * 26.04;
          //income *  4.34 weeks/2 segments * 12 months
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Monthly') {
          this.adjustedTotal += income.amount * 12;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Quarterly') {
          this.adjustedTotal += income.amount * 4;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        if (income.frequency === 'Yearly') {
          this.adjustedTotal += income.amount;
          console.log('adjusted total: ' + this.adjustedTotal);
        }
        break;
    }
  }

  onSelected(value: string): void {
    this.selected = value;
    this.adjustedTotal = 0;
    console.log('selected is' + this.selected);
    this.onChangedFrequency(value);
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
}
