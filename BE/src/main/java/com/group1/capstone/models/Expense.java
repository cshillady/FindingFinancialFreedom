package com.group1.capstone.models;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "expenses")
public class Expense {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;
    
    
    private double amount;

    @NotBlank
    @Size(max = 100)
    private String description; 
    
    @NotBlank
    private String frequency;

    public Expense(){
    }

    public Expense( double amount, String description, String frequency){
        this.amount = amount;
        this.description = description;
        this.frequency = frequency;
    }

    
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public double getAmount(){
    return amount;
  }

  public void setAmount(double amount){
    this.amount = amount;
  }

  public String getDescription(){
    return description;
  }

  public void setDescription(String description){
    this.description = description;
  }

  public String getFrequency(){
    return frequency;
  }

  public void setFrequency(String frequency){
    this.frequency = frequency;
  }
  public User getUser() {
    return user;
}

public void setUser(User user) {
    this.user = user;
}
  }


