package com.application.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int Id;
	
	@Column(name="city")
	private String city;
	
	@Column(name="country")
	private String country;
	
	@Column(name="state")
	private String state;

	@Column(name="street")
	private String street;
	
	@Column(name="zip_code")
	private String zipCode;
	
	@OneToOne
	@PrimaryKeyJoinColumn
	private Order order;
}
