package com.group1.capstone.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "savings")
public class Savings {

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
    @Size(max = 120)
    private String type;

    public Savings() {
    }

    public Savings (double amount, String type){
        this.amount = amount;
        this.type = type; 
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

    public String getType(){
        return type;
    }
    
    public void setType(String type){
        this.type = type;
    }
    
    public User getUser() {
        return user;
    }    

    public void setUser(User user) {
        this.user = user;
    }
}
