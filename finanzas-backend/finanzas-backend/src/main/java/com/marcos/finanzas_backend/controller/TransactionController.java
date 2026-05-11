package com.marcos.finanzas_backend.controller;

import com.marcos.finanzas_backend.entity.Transaction;
import com.marcos.finanzas_backend.repository.TransactionRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    private final TransactionRepository repository;

    public TransactionController(TransactionRepository repository){
        this.repository = repository;
    }

    @GetMapping
    public List<Transaction> getAll(
        @RequestParam(defaultValue = "date") String sortField,
        @RequestParam(defaultValue = "desc") String direction,
        @RequestParam(required = false) Long categoryId
    ) {
        Sort sort = direction.equalsIgnoreCase("asc") ?
                    Sort.by(sortField).ascending() :
                    Sort.by(sortField).descending();

        if(categoryId != null){
            return repository.findByCategoryId(categoryId, sort);
        }
        return repository.findAll(sort);
    }
    
    @PostMapping
    public Transaction saveTransaction(@RequestBody Transaction newTransaction) {
        return repository.save(newTransaction);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        // 1. Verificamos si existe antes de intentar borrar (buena práctica)
        if (repository.existsById(id)) {
            repository.deleteById(id);
            // 2. Respondemos con un 204 (No Content), que es el estándar para borrados exitosos
            return ResponseEntity.noContent().build();
        } else {
            // 3. Si no existe, devolvemos un 404 (Not Found)
            return ResponseEntity.notFound().build();
        }
    }
}
