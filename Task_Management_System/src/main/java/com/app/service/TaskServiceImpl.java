package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.exceptions.TaskException;
import com.app.exceptions.UserException;
import com.app.model.Task;
import com.app.model.TaskDTO;
import com.app.model.User;
import com.app.repository.TaskRepository;
import com.app.repository.UserRepository;


@Service
public class TaskServiceImpl implements TaskService {

	@Autowired
	private TaskRepository taskRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserService userService;

	@Override
	public Task createTask(TaskDTO taskDTO) throws TaskException, UserException {

		
		User user = userService.loginUser();

		if (user != null) {
			Task task = new Task();

			task.setTitle(taskDTO.getTitle());
			task.setDescription(taskDTO.getDescription());
			task.setDutDate(taskDTO.getDueDate());
			task.setUser(user);

			taskRepository.save(task);

			return task;
		}

		throw new UserException("please login first");
	}

	@Override
	public Task updateTask(TaskDTO taskDTO, Integer taskId) throws TaskException, UserException {

		User user = userService.loginUser();

		if (user != null) {
			Optional<Task> optTask = taskRepository.findById(taskId);

			if (optTask.isPresent()) {
				Task task = optTask.get();

				task.setTitle(taskDTO.getTitle());
				task.setDescription(taskDTO.getDescription());
				task.setDutDate(taskDTO.getDueDate());

				taskRepository.save(task);

				return task;
			}

			throw new TaskException("Task not found with this id : " + taskId);

		}

		throw new UserException("please login first");
	}

	@Override
	public String deleteTask(Integer taskId) throws TaskException, UserException {

		User user = userService.loginUser();

		if (user != null) {
			Optional<Task> optTask = taskRepository.findById(taskId);

			if (optTask.isPresent()) {
				Task task = optTask.get();
				
				

				taskRepository.delete(task);

				return "task deleted successfully with this id " + task.getTaskId() + ", title:  " + task.getTitle();
			}

			throw new TaskException("Task not found with this id : " + taskId);

		}

		throw new UserException("please login first");
	}

	@Override
	public String taskCompleted(Integer taskId) throws TaskException, UserException {

		User user = userService.loginUser();

		if (user != null) {
			Optional<Task> optTask = taskRepository.findById(taskId);

			if (optTask.isPresent()) {
				Task task = optTask.get();

				task.setCompleted(true);

				taskRepository.save(task);

				return "Task marked as completed.";
			}

			throw new TaskException("Task not found with this id : " + taskId);

		}

		throw new UserException("please login first");
	}

	@Override
	public String taskIncompleted(Integer taskId) throws TaskException, UserException {

		User user = userService.loginUser();

		if (user != null) {
			Optional<Task> optTask = taskRepository.findById(taskId);

			if (optTask.isPresent()) {
				Task task = optTask.get();

				task.setCompleted(false);

				taskRepository.save(task);

				return "Task marked as incompleted.";
			}

			throw new TaskException("Task not found with this id : " + taskId);

		}

		throw new UserException("please login first");
	}

	@Override
	public List<Task> findAllTaskByUser(Integer userId) throws TaskException, UserException {

		User user = userService.loginUser();

		if (user != null) {

			if (user.getUserId()==userId) {
				
				List<Task> tasks = user.getTasks();
				
				return tasks;
				
			}

			throw new TaskException("User not found with this id : " + userId);

		}

		throw new UserException("please login first");
	}

	@Override
	public List<Task> searchTaskByTitleOrDescription(String keyword) throws TaskException, UserException {
		
		User user = userService.loginUser();

		if (user != null) {

			List<Task> tasks = taskRepository.findByTitleOrDescriptionContainingKeyword(keyword);

//			return tasks;
            
			List<Task> filteredTasks = new ArrayList<>();
			
			for(Task t : tasks)
			{
				if(t.getUser().equals(user))
				{
					filteredTasks.add(t);
				}
			}
			

			return filteredTasks;

		}

		throw new UserException("please login first");
	}

	@Override
	public List<Task> filterTaskByDueDate(LocalDate dueDate) throws TaskException, UserException {
		
		User user = userService.loginUser();

		if (user != null) {

			List<Task> tasks = taskRepository.findByUser(user);
			
            List<Task> filteredTasks = new ArrayList<>();
			
			for(Task t : tasks)
			{
				if(t.getDutDate().equals(dueDate))
				{
					filteredTasks.add(t);
				}
			}
			

			return filteredTasks;

		}

		throw new UserException("please login first");
	}

	@Override
	public List<Task> filterCompletedTask() throws TaskException, UserException {
	
		User user = userService.loginUser();

		if (user != null) {

			List<Task> tasks = taskRepository.findByUser(user);
			
			List<Task> completedTasks = new ArrayList<>();
			
			for(Task t : tasks)
			{
				if(t.isCompleted()==true)
				{
					completedTasks.add(t);
				}
			}

			return completedTasks;

		}

		throw new UserException("please login first");
	}

	@Override
	public String taskAssignedtoAnotherUser(Integer taskId, String username) throws TaskException, UserException {
		
		User user = userService.loginUser();

		if (user != null) {

			Optional<Task> optTask = taskRepository.findById(taskId);
			
			if(optTask.isPresent())
			{
				Task task = optTask.get();
				
				User anotherUser = userRepository.findByUsername(username);
				
				if(anotherUser!=null)
				{
					task.setUser(anotherUser);
					anotherUser.getTasks().add(task);
					
					taskRepository.save(task);
					
					return "task related with this id : "+taskId+" , assigned to another user : "+username;
				}
				
				
				throw new UserException("unable to find the user with this username : "+username);
				
			}
			
			throw new TaskException("unable to find the tasks with this id : "+taskId);
			

		}

		throw new UserException("please login first");
		
	}

	@Override
	public List<Task> filterPendingTask() throws TaskException, UserException {
		
		User user = userService.loginUser();

		if (user != null) {

			List<Task> tasks = taskRepository.findByUser(user);
			
			List<Task> pendingTasks = new ArrayList<>();
			
			for(Task t : tasks)
			{
				if(t.isCompleted()==false)
				{
					pendingTasks.add(t);
				}
			}

			return pendingTasks;

		}

		throw new UserException("please login first");
	}

}
