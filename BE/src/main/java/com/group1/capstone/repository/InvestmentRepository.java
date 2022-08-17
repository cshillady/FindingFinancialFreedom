package com.group1.capstone.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group1.capstone.models.Investment;

@Repository
public interface InvestmentRepository extends JpaRepository<Investment, Long>{

List<Investment> findByUserId(Long postId);
}
