package com.application.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.application.model.Country;

@RepositoryRestResource
@CrossOrigin("http://localhost:4200")
public interface CountryRepo extends JpaRepository<Country, Integer> {

}
