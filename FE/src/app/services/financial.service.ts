import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense';
import { Goal } from '../models/goal';
import { Income } from '../models/income';
import { Savings } from '../models/savings';


// const baseURL = "http://localhost:8080/api/finances"
const baseURL = "http://fffcapstonefinal-env.eba-qbamrxca.us-east-1.elasticbeanstalk.com/api/finances"

@Injectable({
  providedIn: 'root'
})
export class FinancialService {

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  adjustedTotal !: number

  //
  //User
  //

  getUser(id : number){
    return this.http.get(`${baseURL}/user/${id}`);
  }
  //
  // income
  //

  getIncomeByUserId(id: number): Observable<any> {
    return this.http.get(`${baseURL}/${id}/income`);
  }

  getIncomeByid(id: number, inId: number) {
    return this.http.get(`${baseURL}/${id}/income/${inId}`)
  }

  updateIncomeByUserId(id: number, inId: number, income: Income): Observable<any> {
    return this.http.put(`${baseURL}/${id}/income/${inId}`, income);
  }

  deleteIncomeById(id: number, inId: number) {
    return this.http.delete(`${baseURL}/${id}/income/${inId}`);
  }

  addIncome(id: number, income: Income) {
    return this.http.post(`${baseURL}/${id}/income/create`, income);
  }


  //
  // Goal
  //

  getGoalsByUserId(id: number): Observable<any> {
    return this.http.get(`${baseURL}/${id}/goal`);
  }

  getGoalByid(id: number, gId: number) {
    return this.http.get(`${baseURL}/${id}/goal/${gId}`)
  }

  updateGoalByUserId(id: number, gId: number, goal: Goal): Observable<any> {
    return this.http.put(`${baseURL}/${id}/goal/${gId}`, goal);
  }

  deleteGoalById(id: number, gId: number) {
    return this.http.delete(`${baseURL}/${id}/goal/${gId}`);
  }

  addGoal(id: number, goal: Goal) {
    return this.http.post(`${baseURL}/${id}/goal/create`, goal);
  }

  //
  // Expense
  //

  getExpensesByUserId(id: number): Observable<any> {
    return this.http.get(`${baseURL}/${id}/expense`);
  }

  getExpenseByid(id: number, eId: number) {
    return this.http.get(`${baseURL}/${id}/expense/${eId}`)
  }

  updateExpenseByUserId(id: number, eId: number, expense: Expense): Observable<any> {
    return this.http.put(`${baseURL}/${id}/expense/${eId}`, expense);
  }

  deleteExpenseById(id: number, eId: number) {
    return this.http.delete(`${baseURL}/${id}/expense/${eId}`);
  }

  addExpense(id: number, expense: Expense) {
    return this.http.post(`${baseURL}/${id}/expense/create`, expense);
  }

  //
  //savings
  //

  updateSavingsByUserId(id: number, sId: number, savings: Savings): Observable<any> {
    return this.http.put(`${baseURL}/${id}/savings/${sId}`, savings);
  }

  deleteSavingsById(id: number, sId: number) {
    return this.http.delete(`${baseURL}/${id}/savings/${sId}`);
  }
  addSavings(id: number, savings: Savings) {
    return this.http.post(`${baseURL}/${id}/savings/create`, savings);
  }
  getSavingsById(id: number, sId: number) {
    return this.http.get(`${baseURL}/${id}/savings/${sId}`)
  }
  getSavingsByUserId(id: number) {
    return this.http.get(`${baseURL}/${id}/savings`)
  }
}

