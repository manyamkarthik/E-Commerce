package com.application.repo;

import org.springframework.data.domain.Pageable;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.application.model.Order;

@RepositoryRestResource
@CrossOrigin("http://localhost:4200")
public interface OrderRepo extends JpaRepository<Order, Integer> {
	
	Page<Order> findByCustomerEmail(@Param("email") String email,Pageable pageable);

}
