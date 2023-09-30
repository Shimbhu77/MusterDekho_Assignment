package com.app.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer taskId;
	

	@Size(min = 3,max = 100 , message = "Enter minimum 3 character and maximum 20 characters in Title.")
    private String title;
	
	@Size(min = 3,max = 500 , message = "Enter minimum 3 character and maximum 200 characters in description.")
	private String description;
	
	
	private LocalDate dueDate;
	
	private boolean completed;
	
	@JsonIgnore
	@ManyToOne
	private User user;
	
	
}
