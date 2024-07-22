package com.application.service;

import java.util.Optional;

import org.springframework.stereotype.Component;

import com.application.DTO.PurchaseDTO;
import com.application.DTO.PurchaseResponse;
import com.application.model.Customer;

public interface CheckoutService {
	
	PurchaseResponse addPurchase(PurchaseDTO purchase);

	Optional<Customer> getDataById(int custId);

}
