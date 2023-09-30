package com.app.model;

import java.time.LocalDate;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {

	@Size(min = 3,max = 20 , message = "Enter minimum 3 character and maximum 20 characters in Title.")
    private String title;
	
	@Size(min = 3,max = 200 , message = "Enter minimum 3 character and maximum 200 characters in description.")
	private String description;
	
	
	private LocalDate dueDate;
	
	private boolean completed;
}
