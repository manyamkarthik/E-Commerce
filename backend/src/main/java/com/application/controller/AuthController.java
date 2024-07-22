package com.application.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.application.model.User;
import com.application.service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class AuthController {

    @Autowired
    private UserService userService;

   

    @PostMapping("/login")
    public boolean login(@RequestBody User user) {
    	return userService.loginUser(user);
        
    }
}
