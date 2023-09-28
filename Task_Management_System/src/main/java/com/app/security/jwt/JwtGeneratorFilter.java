package com.app.security.jwt;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.app.model.SignInRequest;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtGeneratorFilter extends OncePerRequestFilter {

	private final ObjectMapper objectMapper; // You need to inject an ObjectMapper

    public JwtGeneratorFilter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }
    
    public JwtGeneratorFilter() {
		this.objectMapper = new ObjectMapper();
        
    }
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		log.info("inside generator filter ....");
		log.info("inside request ...."+request);
		log.info("inside reqponse ...."+response);
		
		SignInRequest signInRequest = objectMapper.readValue(request.getInputStream(), SignInRequest.class);

        String username = signInRequest.getUsername();
        String password = signInRequest.getPassword();
        
        log.info("inside username ...."+username);
        log.info("inside password ...."+password);
        log.info("inside sign in request ...."+signInRequest);
        
        Collection<GrantedAuthority> authorities = new ArrayList<>();
		
		SimpleGrantedAuthority sga = new SimpleGrantedAuthority("ROLE_USER");
		authorities.add(sga);
        
		Authentication auth = new UsernamePasswordAuthenticationToken(username, password,authorities);
		
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		log.info("inside authentication ...."+authentication);
		
		
        if (null != authentication) {
        	
        	System.out.println("authentication "+authentication);
        	
        	log.info("inside if condition ....");
        	
            SecretKey key = Keys.hmacShaKeyFor(SecurityConstants.JWT_KEY.getBytes());
            
            
            String jwt = Jwts.builder()
            		.setIssuer("Shimbhu")
            		.setSubject("JWT Token")
                    .claim("username", authentication.getName())
                    .claim("role",getRole(authentication.getAuthorities()))
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(new Date().getTime()+ 30000000)) // expiration time
                    .signWith(key).compact();
            
            response.setHeader(SecurityConstants.JWT_HEADER, jwt);
 
        
        }

        filterChain.doFilter(request, response);
    	
		
		
	}
	
	
	  private String getRole(Collection<? extends GrantedAuthority> collection) {
	        
	    String role="";
		  for(GrantedAuthority ga:collection) {
			  role= ga.getAuthority();
		  }
	    
		  return role;
	    }
				
	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
	
        return !request.getServletPath().equals("/app/sign-in");	
	}

}