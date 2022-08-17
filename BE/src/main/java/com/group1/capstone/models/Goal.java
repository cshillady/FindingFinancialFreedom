package com.group1.capstone.models;

import java.time.LocalDate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "goals")
public class Goal {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore


    private User user;

  
    private double amount;


    private double currentAmount;

    @NotBlank
    @Size(max = 120)
    private String category;

    private LocalDate startDate;

    private LocalDate completionDate;

    public Goal(){
    }
    public Goal(double amount,double currentAmount ,String category, LocalDate completionDate, LocalDate startDate){
        this.amount = amount;
        this.currentAmount = currentAmount;
        this.category = category;
        this.completionDate = completionDate;
        this.startDate = startDate;
    }

    public Long getId() {
        return id;
      }
    
      public void setId(Long id) {
        this.id = id;
      }

      public LocalDate getStartDate() {
        return startDate;
      }
    
      public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
      }

      public LocalDate getCompletionDate() {
        return completionDate;
      }
    
      public void setCompletionDate(LocalDate completionDate) {
        this.completionDate = completionDate;
      }
    
      public double getAmount(){
        return amount;
      }
    
      public void setAmount(double amount){
        this.amount = amount;
      }

      public void setCurrentAmount(double currentAmount){
        this.currentAmount = currentAmount;
      }

      public double getCurrentAmount(){
        return currentAmount;
      }

      public String getCategory(){
        return category;
      }
    
      public void setCategory(String category){
        this.category = category;
      }
      
      public User getUser() {
        return user;
      }

      public void setUser(User user) {
        this.user = user;
      }
}
