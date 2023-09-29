package com.app.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.exceptions.UserException;
import com.app.model.SignInRequest;
import com.app.model.User;
import com.app.model.UserDTO;
import com.app.service.UserService;


@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	// register user with given details
	
	@PostMapping("/app/sign-up")
	public ResponseEntity<User> signUpUserHandler(@Validated @RequestBody UserDTO user) throws UserException 
	{
		user.setPassword(passwordEncoder.encode(user.getPassword())); 
         
		User p = userService.registerUser(user);
		
		return new ResponseEntity<User>(p,HttpStatus.CREATED);
	}
	
	// first time user login with Email and password and got JWT token 
	
//	@GetMapping("/app/sign-in")
//	public ResponseEntity<User> signInHandler(Authentication auth) throws BadCredentialsException, UserException{
//		User customer= userService.findUserByUsername(auth.getName());
//		
//		System.out.println("customer obj: "+customer);
//		
//		if(customer!=null)
//		{
//			 return new ResponseEntity<>(customer, HttpStatus.ACCEPTED);
//		}
//		
//		throw new BadCredentialsException("Invalid Username or password");
//		
//
//	}
	
	@PostMapping("/app/sign-in")
	public ResponseEntity<User> signInHandler( SignInRequest req) throws BadCredentialsException, UserException{
		
//		String username = req.getUsername();
//		String password = req.getPassword();
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		
		User customer= userService.findUserByUsername(auth.getName());
		
		System.out.println("customer obj: "+customer);
		
		if(customer!=null)
		{
			 return new ResponseEntity<>(customer, HttpStatus.ACCEPTED);
		}
		
		throw new BadCredentialsException("Invalid Username or password");
		

	}
	// Authentication with JWT token 
	
	@GetMapping("/app/logged-in/user")
	public ResponseEntity<String> welcomeLoggedInUserHandler() throws UserException
	{
		User user =  userService.loginUser();
		
		String message = "Welcome to Shimbhu's Website  : " +user.getUsername()+user;
		
		return new ResponseEntity<String>(message,HttpStatus.OK);
	}
}