package com.application.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.application.model.Product;
import com.application.model.ProductCategory;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;

@Component
public class WebConfiguration implements RepositoryRestConfigurer {
	
	private EntityManager entityManager;

    @Autowired
    public WebConfiguration(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }


	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

		HttpMethod[] unsupported = { HttpMethod.DELETE, HttpMethod.PUT };
		config.getExposureConfiguration().forDomainType(Product.class)
				.withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsupported))
				.withItemExposure((metdata, httpMethods) -> httpMethods.disable(unsupported));
		
		config.getExposureConfiguration().forDomainType(ProductCategory.class)
		.withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsupported))
		.withItemExposure((metdata, httpMethods) -> httpMethods.disable(unsupported));

		RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
		exposeIds(config);
		cors.addMapping("/api/**").allowedOrigins("http://localhost:4200")
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");

    }

    private void exposeIds(RepositoryRestConfiguration config) {

        // expose entity ids
        //

        // - get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // - create an array of the entity types
        List<Class> entityClasses = new ArrayList<>();

        // - get the entity types for the entities
        for (EntityType tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }

        // - expose the entity ids for the array of entity/domain types
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
	
}