package com.group1.capstone.repository;
import java.util.List;

import com.group1.capstone.models.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense,Long>{
   List<Expense> findByUserId(Long postId);

}
