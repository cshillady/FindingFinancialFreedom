import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Goal } from 'src/app/models/goal';
import { User } from 'src/app/models/user';
import { FinancialService } from 'src/app/services/financial.service';
import { StorageService } from 'src/app/services/storage.service';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { MatProgressBar } from '@angular/material/progress-bar';


@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  currentId: any;
  goals: any;
  goal: Goal = new Goal;
  user: User = new User;
  updateToggle = false;
  addGoalToggle = false;
  progress!: number;
  adjustGoalToggle = false;
  mainToggle = true;
  addToGoalToggle = false;
  subtractFromGoalToggle = false;

  currentGoalId: any;
  currentGoalAmount !: number;
  currentGoalStart !: Date;
  currentGoalEnd !: Date;
  currentGoalCategory !: string;


  

  constructor(private financialService: FinancialService,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.currentId = this.storageService.getUser().id;
    this.user = this.storageService.getUser();
    this.loadGoals(this.currentId);
    // this.loadChart();
    console.log(this.currentId);
    console.log(this.user);
  }

  loadGoals(currentId: number) {
    this.financialService.getGoalsByUserId(currentId).subscribe({ 
      next: (goals) => {
        this.goals = goals;
        console.log(goals);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateGoal(gId: number) {
    this.financialService.updateGoalByUserId(this.currentId, gId, this.goal).subscribe({
      next: (goal) => {
        this.goal = goal;
        this.reloadPage();
        console.log(goal)
      }
    })
  }
  subtractFromGoal(currentGoalAmount : number){
    this.goal.currentAmount =  (this.goal.currentAmount) + (-currentGoalAmount);
    this.updateGoal(this.currentGoalId)
    this.adjustGoalToggle = false;
  }

  addToGoal(currentGoalAmount : number){
    this.goal.currentAmount =  (+this.goal.currentAmount) + (+currentGoalAmount);
    this.updateGoal(this.currentGoalId)
    this.adjustGoalToggle = false;
  }

  updateToggler(goalId: number) {
    switch(this.updateToggle) {
      case false:
        this.updateToggle = true;
        this.financialService.getGoalByid(this.currentId, goalId).subscribe( (goal: any) => {
            this.goal = goal;
            console.log(goal);
        });
        this.currentGoalId = goalId;
        break;
      default:
        this.updateToggle = false;
    }
    this.addGoalToggle = false;
  }

  deleteGoal(currentGoalId: number) {
    this.financialService.deleteGoalById(this.currentId, currentGoalId).subscribe((data: any) => {
      console.log(data);
      this.reloadPage();
    })
  }

  addGoalToggler() {
    switch(this.addGoalToggle) {
      case false:
        this.addGoalToggle = true;
        break;
      default:
        this.addGoalToggle = false;
    }
    this.updateToggle = false;
  }

  addGoal(goal: Goal) {
    this.financialService.addGoal(this.currentId, this.goal).subscribe( (goal: any) => {
        this.goal = goal;
        this.reloadPage();
        console.log(goal)
      })
  }

  reloadPage(): void {
    window.location.reload();
  }

}
