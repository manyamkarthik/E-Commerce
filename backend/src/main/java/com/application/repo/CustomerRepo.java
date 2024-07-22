package com.application.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.application.model.Customer;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Integer>{
	
    Customer findByEmail(String email);

}
