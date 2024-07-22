package com.application.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.application.model.Product;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface ProductRepo extends JpaRepository<Product, Integer> {
	
//	@Query("select p from prodcut p  where category_id=id")
	Page<Product> findByCategoryId(@Param("id") Integer id,Pageable pageable);
	Page<Product> findByNameContaining(@Param("name") String name,Pageable pageable);

}
