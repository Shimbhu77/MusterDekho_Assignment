package com.app.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.app.exceptions.UserException;
import com.app.model.User;
import com.app.model.UserDTO;
import com.app.repository.UserRepository;


@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepo;

	@Override
	public User registerUser(UserDTO user) throws UserException {
 
		User findUser = userRepo.findByUsername(user.getUsername());
		
		if(findUser!=null)
		{
			throw new UserException(" user already exists with this Username : "+user.getUsername());
		}
		
		User newUser = new User();
		
		newUser.setUsername(user.getUsername());
        newUser.setPassword(user.getPassword());
        newUser.setRole(user.getRole());
		
		 
		return userRepo.save(newUser);
	}

	@Override
	public User loginUser() {
			
		SecurityContext sc  = SecurityContextHolder.getContext();
		
		Authentication auth  = sc.getAuthentication();
		
		String userName = auth.getName();
		
		User user = userRepo.findByUsername(userName);
		
		return user;
		
	}

	@Override
	public User findUserByUsername(String Username) throws UserException {
		
		User user = userRepo.findByUsername(Username);
		
		if(user==null)
		{
			throw new UserException("No user found with this Username : "+Username);
		}
		
		return user;
	}

}