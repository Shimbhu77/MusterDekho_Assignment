package com.app.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {

    private String title;
	
	private String description;
	
	private LocalDate dueDate;
	
	private boolean completed;
}
