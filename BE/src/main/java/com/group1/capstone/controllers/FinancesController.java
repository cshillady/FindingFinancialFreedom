package com.group1.capstone.controllers;

import java.util.List;

import com.group1.capstone.exceptions.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.group1.capstone.models.Expense;
import com.group1.capstone.models.Goal;
import com.group1.capstone.models.Income;
import com.group1.capstone.models.Investment;
import com.group1.capstone.models.Savings;
import com.group1.capstone.repository.*;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/finances")
public class FinancesController {

    @Autowired
    private InvestmentRepository investmentRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SavingsRepository savingsRepository;

    public FinancesController(InvestmentRepository investmentRepository, ExpenseRepository expenseRepository,
            GoalRepository goalRepository, IncomeRepository incomeRepository, SavingsRepository savingsRepository) {
        this.investmentRepository = investmentRepository;
        this.expenseRepository = expenseRepository;
        this.goalRepository = goalRepository;
        this.incomeRepository = incomeRepository;
        this.savingsRepository = savingsRepository;
    }

    

    //
    // INCOME
    //
    // Gets all incomes by the user Id (should return all results)
    @GetMapping(value = "/{user_id}/income")
    public ResponseEntity<List<Income>> findIncomeByUserId(@PathVariable("user_id") Long id) {
        List<Income> incomes = incomeRepository.findByUserId(id);
        return new ResponseEntity<>(incomes, HttpStatus.OK);
    }
    // functional

    // Find income by income_id and user_id (should return 1 result)
    @GetMapping(value = "/{user_id}/income/{inId}")
    public ResponseEntity<Income> findIncomeByUserIdAndIncomeId(@PathVariable("user_id") Long id,
            @PathVariable("inId") Long inId) {
        Income searchedIncome = incomeRepository.findById(inId)
        .orElseThrow(() -> new ResourceNotFoundException("Income does not exist with id number #" + inId));
        return new ResponseEntity<>(searchedIncome, HttpStatus.OK);
    }

    // functional
    // create a new income source
    @PostMapping("{user_id}/income/create")
    public ResponseEntity<Income> createIncome(@PathVariable(value = "user_id") Long id,
            @RequestBody Income income) {
        Income income1 = userRepository.findById(id).map(user -> {
            income.setUser(user);
            return incomeRepository.save(income);
        }).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return new ResponseEntity<>(income1, HttpStatus.CREATED);
    }
    // functional

    @PutMapping("{user_id}/income/{inId}")
    public ResponseEntity<Income> updateIncome(@PathVariable("user_id") long userId, @PathVariable("inId") Long inId,
            @RequestBody Income incomeRequest) {
        Income income = incomeRepository.findById(inId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("IncomeId " + inId + "not found for this user :" + userId));
        income.setSource(incomeRequest.getSource());
        income.setAmount(incomeRequest.getAmount());
        income.setDescription(incomeRequest.getDescription());
        income.setFrequency(incomeRequest.getFrequency());
        return new ResponseEntity<>(incomeRepository.save(income), HttpStatus.OK);
    }
    // functional

    @DeleteMapping("{user_id}/income/{inId}")
    public ResponseEntity<HttpStatus> deleteIncome(@PathVariable("user_id") long userId,
            @PathVariable("inId") Long inId) {
        incomeRepository.deleteById(inId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    // functional

    //
    // GOALS
    //

    // GET all goals by the user Id (should return all results)
    @GetMapping(value = "/{user_id}/goal")
    public ResponseEntity<List<Goal>> findGoalByUserId(@PathVariable("user_id") Long id) {
        List<Goal> goal = goalRepository.findByUserId(id);
        return new ResponseEntity<>(goal, HttpStatus.OK);
    }
    // functional

    // GET/Find goal by goal_id and user_id (should return 1 result)
    @GetMapping(value = "/{user_id}/goal/{gId}")
    public ResponseEntity<Goal> findGoalByUserIdAndGoalId(@PathVariable("user_id") Long id,
            @PathVariable("gId") Long gId) {
        Goal searchedGoal = goalRepository.findById(gId)
        .orElseThrow(() -> new ResourceNotFoundException("Goal does not exist with id number #" + gId));
        return new ResponseEntity<>(searchedGoal, HttpStatus.OK);
    }
    // functional

    // CREATE a new goal
    @PostMapping("{user_id}/goal/create")
    public ResponseEntity<Goal> createGoal(@PathVariable(value = "user_id") Long userId, @RequestBody Goal goal) {
        Goal goal1 = userRepository.findById(userId).map(user -> {
            goal.setUser(user);
            return goalRepository.save(goal);
        }).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return new ResponseEntity<>(goal1, HttpStatus.CREATED);
    }
    // functional

    // UPDATE goal by goal_id
    @PutMapping("{user_id}/goal/{gId}")
    public ResponseEntity<Goal> updateGoal(@PathVariable("user_id") long userId, @PathVariable("gId") Long gId,
            @RequestBody Goal goalRequest) {
        Goal goal = goalRepository.findById(gId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Goal Id " + gId + "not found for this user :" + userId));
        goal.setAmount(goalRequest.getAmount());
        goal.setCurrentAmount(goalRequest.getCurrentAmount());
        goal.setCategory(goalRequest.getCategory());
        goal.setCompletionDate(goalRequest.getCompletionDate());
        goal.setStartDate(goalRequest.getStartDate());
        return new ResponseEntity<>(goalRepository.save(goal), HttpStatus.OK);
    }
    // functional

    // DELETE goal
    @DeleteMapping("{user_id}/goal/{gId}")
    public ResponseEntity<HttpStatus> deleteGoal(@PathVariable("user_id") long userId, @PathVariable("gId") Long gId) {
        goalRepository.deleteById(gId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    // functional

    //
    // INVESTMENT
    //

    // Gets all investment by the user Id (should return all results)
    @GetMapping(value = "/{user_id}/investment")
    public ResponseEntity<List<Investment>> findInvestmentByUserId(@PathVariable("user_id") Long id) {
        List<Investment> investment = investmentRepository.findByUserId(id);
        return new ResponseEntity<>(investment, HttpStatus.OK);
    }
    // functional

    // Find investment by investment_id and user_id (should return 1 result)
    @GetMapping(value = "/{user_id}/investment/{invId}")
    public ResponseEntity<Investment> findInvestmentByUserIdAndInvestmentId(@PathVariable("user_id") Long id,
            @PathVariable("invId") Long invId) {
        Investment searchedInvestment = investmentRepository.findById(invId)
        .orElseThrow(() -> new ResourceNotFoundException("Investment does not exist with id number #" + invId));
        return new ResponseEntity<>(searchedInvestment, HttpStatus.OK);
    }
    // functional

    // create a new investment source
    @PostMapping("{user_id}/investment/create")
    public ResponseEntity<Investment> createInvestment(@PathVariable(value = "user_id") Long userId,
            @RequestBody Investment investment) {
        Investment investment1 = userRepository.findById(userId).map(user -> {
            investment.setUser(user);
            return investmentRepository.save(investment);
        }).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return new ResponseEntity<>(investment1, HttpStatus.CREATED);
    }
    // functional

    // UPDATE Investment by inv_id
    @PutMapping("{user_id}/investment/{invId}")
    public ResponseEntity<Investment> updateInvestment(@PathVariable("user_id") Long userId,
            @PathVariable("invId") Long invId, @RequestBody Investment investmentRequest) {
        Investment investment = investmentRepository.findById(invId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "InvestmentId " + invId + "not found for this user :" + userId));
        investment.setCompName(investmentRequest.getCompName());
        investment.setInitial(investmentRequest.getInitial());
        investment.setRateGrowth(investmentRequest.getRateGrowth());
        return new ResponseEntity<>(investmentRepository.save(investment), HttpStatus.OK);
    }
    // functional

    // DELETE Investment
    @DeleteMapping("{user_id}/investment/{invId}")
    public ResponseEntity<HttpStatus> deleteInvestment(@PathVariable("user_id") Long userId,
            @PathVariable("invId") Long invId) {
        investmentRepository.deleteById(invId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    // functional

    //
    // EXPENSE
    //

    // Gets all Expense by the user Id (should return all results)
    @GetMapping("{user_id}/expense")
    public ResponseEntity<List<Expense>> findExpenseByUserId(@PathVariable("user_id") Long id) {
        List<Expense> expenses = expenseRepository.findByUserId(id);
        return new ResponseEntity<>(expenses,HttpStatus.OK);
    }

     // Find expense by investment_id and user_id (should return 1 result)
    @GetMapping("{user_id}/expense/{eid}")
    public ResponseEntity<Expense> findExpenseByUserIdAndExpenseId(@PathVariable("user_id") Long id, @PathVariable("eid") Long eid) {
        Expense searchedExpense = expenseRepository.findById(eid)
        .orElseThrow(() -> new ResourceNotFoundException("Expense does not exist with id number #" + eid));
        return new ResponseEntity<>(searchedExpense,HttpStatus.OK);
    }

      // create a new expense source
    @PostMapping("{user_id}/expense/create")
    public ResponseEntity<Expense> createExpense(@PathVariable("user_id") Long userId, @RequestBody Expense expense){
        Expense expense1 = userRepository.findById(userId).map(user -> {
            expense.setUser(user);
            return expenseRepository.save(expense);
        }).orElseThrow(() -> new ResourceNotFoundException("User not found with id: "+userId));
        return new ResponseEntity<Expense>(expense1, HttpStatus.CREATED);
    }

     // UPDATE Expense 
    @PutMapping("{user_id}/expense/{eid}")
    public ResponseEntity<Expense> updateExpense(@PathVariable("user_id") Long id, @PathVariable("eid") Long eid, @RequestBody Expense expenseRequest) {
        Expense expense = expenseRepository.findById(eid)
                    .orElseThrow(() -> new ResourceNotFoundException("ExpenseId " + eid + " not found for this user: " + id));
        expense.setDescription(expenseRequest.getDescription());
        expense.setAmount(expenseRequest.getAmount());
        expense.setFrequency(expenseRequest.getFrequency());
        return new ResponseEntity<>(expenseRepository.save(expense), HttpStatus.OK);
    }

    //Delete expense
    @DeleteMapping("{user_id}/expense/{eid}")
        public ResponseEntity<HttpStatus> deleteExpense(@PathVariable("user_id") Long id, @PathVariable("eid") Long eid) {
            expenseRepository.deleteById(eid);
            return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
    }

    //
    //Savings
    //

    //Get
    @GetMapping("{user_id}/savings")
    public ResponseEntity <List<Savings>> getSavings(@PathVariable("user_id") Long id){
        List<Savings> savings = savingsRepository.findByUserId(id);
        return new ResponseEntity<>(savings,HttpStatus.OK);
    }

    //Get(Single)
    @GetMapping("{user_id}/savings/{sid}")
    public ResponseEntity <Savings> findSavingsByUserIdAndSavingsId(@PathVariable("user_id") Long id, @PathVariable("sid") Long sid){
     Savings searchedSavings = savingsRepository.findById(sid)
     .orElseThrow(() -> new ResourceNotFoundException("Savings does not exist with id number #" + sid));
        return new ResponseEntity<>(searchedSavings,HttpStatus.OK); 
    }

    //Create
    @PostMapping("{user_id}/savings/create")
    public ResponseEntity<Savings> createSavings(@PathVariable("user_id") Long id, @RequestBody Savings savings){
        Savings savings1 = userRepository.findById(id).map(user -> {
           savings.setUser(user);
            return savingsRepository.save(savings);
        }).orElseThrow(() -> new ResourceNotFoundException("User not found with id: "+id));
        return new ResponseEntity<Savings>(savings1, HttpStatus.CREATED);
    }

    //Delete
    @DeleteMapping("{user_id}/savings/{sid}")
        public ResponseEntity<HttpStatus> deleteSavings(@PathVariable("user_id") Long id, @PathVariable("sid") Long sid){
            savingsRepository.deleteById(sid);
            return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
    }

    //Update
    @PutMapping("{user_id}/savings/{sid}")
         public ResponseEntity<Savings > updateSavings(@PathVariable("user_id") Long id, @PathVariable("sid") Long sid, @RequestBody Savings savingsRequest) {
             Savings savings = savingsRepository.findById(sid)
                         .orElseThrow(() -> new ResourceNotFoundException("SavingsId " + sid + " not found for this user: " + id));
             savings.setAmount(savingsRequest.getAmount());
             savings.setType(savingsRequest.getType());
             return new ResponseEntity<>(savingsRepository.save(savings), HttpStatus.OK);
         }


}

