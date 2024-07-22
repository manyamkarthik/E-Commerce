package com.application.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.application.model.ProductCategory;

@RepositoryRestResource(collectionResourceRel = "productCategory",path = "product-category")
@CrossOrigin("http://localhost:4200")
public interface ProductCategoryRepo extends JpaRepository<ProductCategory, Integer> {

}
