package com.application.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.application.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByUsername(String username);

}
