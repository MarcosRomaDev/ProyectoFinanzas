package com.marcos.finanzas_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.marcos.finanzas_backend.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    
}
