package com.application.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.application.model.State;

@RepositoryRestResource(path = "states")

@CrossOrigin("http://localhost:4200")
public interface StateRepo extends JpaRepository<State, Integer> {
	
	List<State> findByCountryId(@Param("id") int id);

	List<State> findByCountryCode(@Param("code") String code);
	List<State> findByCountryName(@Param("name") String name);

}
