package com.application.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
public class Country {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String code;
	private String name;
	
	@OneToMany(cascade = CascadeType.ALL,mappedBy = "country")
	private List<State> states;

}
