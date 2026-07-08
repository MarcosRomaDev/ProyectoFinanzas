package com.marcos.finanzas_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.marcos.finanzas_backend.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{
    
}
