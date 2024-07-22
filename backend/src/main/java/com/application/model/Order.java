package com.application.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "total_price")
    private BigDecimal totalPrice;
	
	
	 @Column(name = "order_tracking_number")
	private String orderTrackingNumber;
	
	@Column(name = "total_quantity")
	private int totalQuantity;
	
	
	
	@Column(name = "status")
	private String status;

    @Column(name = "date_created", updatable = false)
    @CreationTimestamp
    private LocalDateTime dateCreated;

    @Column(name = "last_updated")
    @UpdateTimestamp
    private LocalDateTime lastUpdated;
    
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "order")
    
    @JsonIgnoreProperties("order")
    private Set<OrderItem> orderItems;
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    
    
    private Customer customer;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "shipping_address_id",referencedColumnName = "Id")
    private Address shippingAddress;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "billing_address_id",referencedColumnName = "Id")
    private Address billingAddress;
    
    
    
    public void add(OrderItem item) {
    	if(item!=null) {
    		
    		if(orderItems ==null) {
    			orderItems=new HashSet<>();
    		}
    		orderItems.add(item);
    		item.setOrder(this);
    	}
    }

}
