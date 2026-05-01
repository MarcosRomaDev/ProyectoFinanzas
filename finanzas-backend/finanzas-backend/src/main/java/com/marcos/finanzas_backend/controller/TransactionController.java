package com.marcos.finanzas_backend.controller;

import com.marcos.finanzas_backend.entity.Transaction;
import com.marcos.finanzas_backend.repository.TransactionRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
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
    public List<Transaction> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Transaction saveTransaction(@RequestBody Transaction nuevaTransaction) {
        return repository.save(nuevaTransaction);
    }
}
