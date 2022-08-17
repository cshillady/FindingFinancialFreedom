package com.group1.capstone.models;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "investments")
public class Investment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;
    
    @NotBlank
    @Size(max = 100)
    private String compName;

    
    private double initial;

    private double rateGrowth;

    public Investment() {
    }

    public Investment(String compName, double initial, double rateGrowth) {
        this.compName = compName;
        this.initial = initial;
        this.rateGrowth = rateGrowth;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    
    public String getCompName() {
        return compName;
    }

    public void setCompName(String compName) {
        this.compName = compName;
    }

    public double getInitial() {
        return initial;
    }

    public void setInitial(double initial) {
        this.initial = initial;
    }

    public double getRateGrowth(){
        return rateGrowth;
      }
    
      public void setRateGrowth(double rateGrowth){
        this.rateGrowth = rateGrowth;
      }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
