package com.app.service;

import java.time.LocalDate;
import java.util.List;

import com.app.exceptions.TaskException;
import com.app.exceptions.UserException;
import com.app.model.Task;
import com.app.model.TaskDTO;

public interface TaskService {

	 public Task createTask(TaskDTO taskDTO) throws TaskException, UserException;
	 public Task updateTask(TaskDTO taskDTO,Integer taskId) throws TaskException, UserException;
	 public List<Task> findAllTaskByUser(Integer userId) throws TaskException, UserException;
	 public String deleteTask(Integer taskId) throws TaskException, UserException;
	 public String taskCompleted(Integer taskId) throws TaskException, UserException;
	 public String taskIncompleted(Integer taskId) throws TaskException, UserException;
	 public List<Task> searchTaskByTitleOrDescription(String keyword) throws TaskException, UserException;
	 public List<Task> filterTaskByDueDate(LocalDate dueDate) throws TaskException, UserException;
	 public List<Task> filterCompletedTask() throws TaskException, UserException;
	 public List<Task> filterPendingTask() throws TaskException, UserException;
	 public String taskAssignedtoAnotherUser(Integer taskId,String username) throws TaskException,UserException;
}
