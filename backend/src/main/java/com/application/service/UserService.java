package com.application.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.application.model.User;
import com.application.repo.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    

    public boolean loginUser(User user) {
        User user1 = userRepository.findByUsername(user.getUsername());
        if (user1 == null) {
            // User not found, create a new user with the given credentials
            User newUser = new User();
            newUser.setUsername(user.getUsername());
            newUser.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(newUser);
            return true;
        }
        if (passwordEncoder.matches(user.getPassword(), user1.getPassword())) {
            return true;
        } else {
            return false;
        }
    }


    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
