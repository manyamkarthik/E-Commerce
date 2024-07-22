package com.application.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String sku;
	private String name;
	private String description;
	@Column(name = "unit_price")
    private BigDecimal unitPrice;
	 @Column(name = "image_url")
	private String imageUrl;
	private int active;
	@Column(name = "units_in_stock")
    private int unitsInStock;

    @Column(name = "date_created", updatable = false)
    @CreationTimestamp
    private LocalDateTime dateCreated;

    @Column(name = "last_updated")
    @UpdateTimestamp
    private LocalDateTime lastUpdated;
    
    @JoinColumn(name = "category_id",nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private ProductCategory category;

}
