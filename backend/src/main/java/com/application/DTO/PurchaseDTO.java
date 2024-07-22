package com.application.DTO;

import java.util.Set;

import com.application.model.Address;
import com.application.model.Customer;
import com.application.model.Order;
import com.application.model.OrderItem;

import lombok.Data;

@Data
public class PurchaseDTO {
	
	private Customer customer;
	
	private Address shippingAddress;
	
	private Address billingAddress;
	
	private Order order;
	
	private Set<OrderItem> orderItems;
	

}
