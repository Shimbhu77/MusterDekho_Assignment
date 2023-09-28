package com.app.service;

import com.app.exceptions.UserException;
import com.app.model.User;
import com.app.model.UserDTO;

public interface UserService {

	public User registerUser(UserDTO user) throws UserException;
	public User loginUser()  throws UserException;
	public User findUserByUsername(String username)  throws UserException;
}
