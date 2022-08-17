package com.group1.capstone.models;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "income")
public class Income {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String source;

//    @NotBlank cannot use this decorator on a non-string entity
    
    private double amount;

   @NotBlank
   private String frequency;


    @NotBlank
    @Size(max = 100)
    private String description; 


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    public Income() {
    }

    public Income (String source, double amount, String description, String frequency) {
        this.source = source; 
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

    public String getSource (){
        return source;
    }

    public void setSource (String source){
        this.source = source;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getFrequency(){
       return frequency;
    }

    public void setFrequency(String frequency){
       this.frequency = frequency;
    }
    
}
