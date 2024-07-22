package com.application.model;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "product_category")
@Getter
@Setter
public class ProductCategory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "category_name")
	private String categoryName;
	
	@OneToMany(mappedBy = "category",cascade = CascadeType.ALL)
	private Set<Product> products;
}
