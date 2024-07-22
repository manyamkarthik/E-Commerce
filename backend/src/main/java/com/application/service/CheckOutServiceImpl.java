package com.application.service;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.DTO.PurchaseDTO;
import com.application.DTO.PurchaseResponse;
import com.application.model.Customer;
import com.application.model.Order;
import com.application.model.OrderItem;
import com.application.repo.CustomerRepo;

import jakarta.transaction.Transactional;

@Service
public class CheckOutServiceImpl implements CheckoutService {
	
	@Autowired
	CustomerRepo repo;

	@Override
	@Transactional
	public PurchaseResponse addPurchase(PurchaseDTO purchase) {
		
		Order order=purchase.getOrder();
		String OrderTrackingNumber=UUID.randomUUID().toString();
		order.setOrderTrackingNumber(OrderTrackingNumber);
		order.setBillingAddress(purchase.getBillingAddress());
		order.setShippingAddress(purchase.getShippingAddress());
		Customer customer=purchase.getCustomer();
		System.out.println(customer.getEmail());
		Customer customerDB=repo.findByEmail(customer.getEmail());
		if(customerDB!=null) {
			System.out.println(customerDB);
			customer=customerDB;
		}
		customer.add(order);
		Set<OrderItem> items=purchase.getOrderItems();
		items.forEach(item -> order.add(item));
		repo.save(customer);
		
		return new PurchaseResponse(OrderTrackingNumber);
		
		

	}

	@Override
	public Optional<Customer> getDataById(int custId) {
		Optional<Customer> customer= repo.findById(custId);
		return customer;
	}

}
