package com.marcos.finanzas_backend.controller;

import com.marcos.finanzas_backend.entity.Category;
import com.marcos.finanzas_backend.repository.CategoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryRepository repository;

    public CategoryController(CategoryRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Category> list() {
        return repository.findAll();
    }

    @PostMapping
    public Category create(@RequestBody Category category) {
        return repository.save(category);
    }
}