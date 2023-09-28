package com.app.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.model.Task;
import com.app.model.User;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

	 @Query("SELECT t FROM Task t WHERE t.title LIKE %:keyword% OR t.description LIKE %:keyword%")
	 List<Task> findByTitleOrDescriptionContainingKeyword(@Param("keyword") String keyword);
	 
//	 @Query("SELECT t FROM Task t WHERE t.dueDate = :searchDate")
//	 List<Task> findByDueDate(@Param("searchDate") LocalDate searchDate);
	 
//	 @Query("SELECT t FROM Task t WHERE t.completed = :completed And t.")
//	 List<Task> findByCompletionStatus(@Param("completed") boolean completed);
	 
	 List<Task> findByUser(User user);
}
