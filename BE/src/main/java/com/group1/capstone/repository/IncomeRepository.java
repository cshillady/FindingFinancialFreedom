package com.group1.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.group1.capstone.models.*;

import java.util.List;


public interface IncomeRepository extends JpaRepository<Income, Long>{
    List<Income> findByUserId(Long postId);
}

