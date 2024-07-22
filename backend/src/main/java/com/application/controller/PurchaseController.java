package com.application.controller;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.application.DTO.PurchaseDTO;
import com.application.DTO.PurchaseResponse;
import com.application.model.Customer;
import com.application.model.Order;
import com.application.repo.OrderRepo;
import com.application.service.CheckoutService;

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin("http://localhost:4200")
public class PurchaseController {
	
	@Autowired
	CheckoutService service;
	
	@Autowired
	OrderRepo repo;

	@PostMapping("/purchase")
	public PurchaseResponse placeOrder(@RequestBody PurchaseDTO purchase) {
		
		PurchaseResponse response=service.addPurchase(purchase);
		return response;
		
	}
	@GetMapping("/{custId}")
	public Optional<Customer> getData(@PathVariable int custId) {
		return service.getDataById(custId);
	}
	

}
