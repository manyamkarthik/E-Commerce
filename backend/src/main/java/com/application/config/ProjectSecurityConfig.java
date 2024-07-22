package com.application.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import com.application.model.User;
import com.application.service.UserService;

@Configuration
@EnableWebSecurity
public class ProjectSecurityConfig {
	private final DataSource dataSource;

    public ProjectSecurityConfig(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        JdbcUserDetailsManager userDetailsManager = new JdbcUserDetailsManager(dataSource);

        // Adjust the SQL queries to match your database schema
        String usersByUsernameQuery = "SELECT username, password FROM users WHERE username = ?";
        String authoritiesByUsernameQuery = "SELECT username, 'ROLE_USER' AS authority FROM users WHERE username = ?";

        userDetailsManager.setUsersByUsernameQuery(usersByUsernameQuery);
        userDetailsManager.setAuthoritiesByUsernameQuery(authoritiesByUsernameQuery);

        return userDetailsManager;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

	
	@Bean
	SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
//		http.authorizeHttpRequests().requestMatchers("/login").permitAll().anyRequest().permitAll().and()
//				.formLogin().and()
//				.httpBasic();
//		return http.build();
		
		http
        .csrf().disable()
        .authorizeRequests()
            .requestMatchers("/register", "/login").permitAll()
            .anyRequest().permitAll()
            .and()
        .formLogin()
//            .loginPage("/login")
            .permitAll()
            .and()
        .logout()
            .permitAll();
		 return http.build();

	}
}
