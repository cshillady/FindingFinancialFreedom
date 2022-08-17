import { Component, OnInit, ViewChild } from '@angular/core';
import { Savings } from 'src/app/models/savings';
import { User } from 'src/app/models/user';
import { FinancialService } from 'src/app/services/financial.service';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.scss']
})
export class SavingsComponent implements OnInit {
  selected = '';
  currentId!: any;
  savings: Savings = new Savings();
  saving : Savings[] = [];
  user: User = new User();
  updateToggle = false;
  currentSavingsId: any;
  addSavingsToggle = true;
  total: number = 0;
  finalTotal: number = 0;
  adjustedTotal: number = 0;
  wageToggler = false;
  changedFrequency: string = '';
  adjustedExpense: number = 0;


  constructor(
    private financialService: FinancialService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
   
    this.currentId = this.storageService.getUser().id;
    this.user = this.storageService.getUser();
    this.changedFrequency = 'Daily';
    this.loadSavings(this.currentId);
    console.log(this.currentId);
    console.log(this.user);
  }
  loadSavings(currentId: number) {
    this.financialService.getSavingsByUserId(currentId).subscribe({
      next: (savings : any) => {
        this.saving = savings
        console.log(savings);
        //this.calculateTotal();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  updateSavings(inId: number) {
    this.financialService
      .updateSavingsByUserId(this.currentId, inId, this.savings)
      .subscribe({
        next: (savings) => {
          this.savings = savings;
          this.reloadPage();
          console.log(savings);
        },
      });
  }
  updateToggler(savingsId: number) {
    switch (this.updateToggle) {
      case false:
        this.updateToggle = true;
        console.log("currentId = " + this.currentSavingsId)
        this.financialService
          .getSavingsById(this.currentId, savingsId)
          .subscribe((savings: any) => {
            this.savings = savings;
            console.log(savings);
          });
        this.currentSavingsId = savingsId;
        break;
      default:
        if(this.currentSavingsId != this.savings.id){
          this.updateToggle = false;
          
        }
        else{
          this.updateToggle = false;
        }
      }
      this.addSavingsToggle = false;
    }
  
  deleteSavings(currentSavingsId: number) {
    this.financialService
      .deleteSavingsById(this.currentId, currentSavingsId)
      .subscribe((data: any) => {
        console.log(data);
        this.reloadPage();
      });
  }
  addSavingsToggler() {
    this.savings = new Savings();
    this.addSavingsToggle = true;
    this.updateToggle = false;
    
  }

  addSavings(savings: Savings) {
      this.financialService
      .addSavings(this.currentId, savings)
      .subscribe((savings: any) => {
        this.savings = savings;
        this.reloadPage();
        console.log(savings);
      });
  }
  reloadPage(): void {
    window.location.reload();
  }
}
