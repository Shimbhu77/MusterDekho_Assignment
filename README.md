# Task Management System

## Description

Task App is design and implement a simple task management system. The system should allow users to create, update, and delete tasks, as well as assign tasks to different users. The system should also support basic search and filtering capabilities.

## Application Features

This Task Management System includes the following features:

### User Management

1. **User Registration and Login:**
   - Users can register and log in to the system.
   - Each user is assigned a unique username and password.

### Task Management

2. **Task Creation and Management:**
   - Users can create new tasks by providing a title, description, and due date.
   - Existing tasks can be updated, including changes to the title, description, due date, and assignment to another user.
   - Tasks can be marked as complete or incomplete.
   - Users can delete tasks.

### Search and Filtering

3. **Search and Filtering:**
   - Users can search for tasks based on title, description, or assigned user.
   - Tasks can be filtered based on completion status and due date.

### User Interface

4. **User Interface (GUI):**
   - A user-friendly graphical user interface (GUI) is implemented for interacting with the system.
   - Appropriate input validation and error handling are in place to ensure correct system behavior and graceful handling of invalid inputs.

## Technology Stack

The system is built using the following technologies:

- Java
- Spring Boot
- MySQL
- Lombok
- REST CRUD API
- Hibernate
- JPQL
- SQL
- Spring Data JPA
- Spring Security
- JWT Token
- Eclipse
- React
- HTML
- CSS
- JavaScript
- Bootstrap
- VSCode

  ## Entity Classes

### User Entity

- **Fields:**
  - `userId` (Auto-generated ID)
  - `username` (String, 3-20 characters)
  - `password` (String, - Password Validation:
    - At least 8 characters
    - Contains at least one digit
    - Contains at least one lowercase letter
    - Contains at least one uppercase letter
    - Contains at least one special character)
  - `role` (String)
  - `tasks` (List of Task objects, mapped by the user)

### Task Entity

- **Fields:**
  - `taskId` (Auto-generated ID)
  - `title` (String, 3-100 characters)
  - `description` (String, 3-500 characters)
  - `dueDate` (LocalDate, yyyy-MM-dd format)
  - `completed` (Boolean)
  - `user` (User object)

## API Endpoints

### User Controller

#### 1. User Registration

- **API Path:** `/app/sign-up`
- **Method:** POST

#### 2. User Login

- **API Path:** `/app/sign-in`
- **Method:** GET

#### 3. Get Logged-in User

- **API Path:** `/app/logged-in/user`
- **Method:** GET

### Task Controller

#### 1. Create Task

- **API Path:** `/app/create-task`
- **Method:** POST

#### 2. Update Task

- **API Path:** `/app/update-task/{taskId}`
- **Method:** PUT

#### 3. Delete Task

- **API Path:** `/app/delete-task/{taskId}`
- **Method:** DELETE

#### 4. Mark Task as Completed

- **API Path:** `/app/mark-task-as-completed/{taskId}`
- **Method:** POST

#### 5. Mark Task as Incomplete

- **API Path:** `/app/mark-task-as-incompleted/{taskId}`
- **Method:** POST

#### 6. Search Task by Title or Description

- **API Path:** `/app/tasks/search/{keyword}`
- **Method:** GET

#### 7. Get User's Tasks

- **API Path:** `/app/my-tasks/`
- **Method:** GET

#### 8. Filter Tasks by Due Date

- **API Path:** `/app/tasks/filter-by-due-date/{dueDate}`
- **Method:** GET

#### 9. Filter Completed Tasks

- **API Path:** `/app/tasks/filter-completed-tasks`
- **Method:** GET

#### 10. Filter Pending Tasks

- **API Path:** `/app/tasks/filter-pending-tasks`
- **Method:** GET

#### 11. Assign Task to Another User

- **API Path:** `/app/tasks/assigned-task/{taskId}/{username}`
- **Method:** POST

  # Fronted Documentation
  ### Deployed link for Fronted React App on Netlify
   [netlify_hosted_link](https://65184a2683a64037c3675875--musical-quokka-203749.netlify.app/)
  ## Sign in Page
  ![Sign in page ](https://github.com/Shimbhu77/MusterDekho_Assignment/blob/main/Project-Screenshot/Screenshot%20(1146).png)
   ## Sign up Page
  ![Sign up page ](https://github.com/Shimbhu77/MusterDekho_Assignment/blob/main/Project-Screenshot/Screenshot%20(1147).png)
   ## Add Task Page
  ![Add Task Page ](https://github.com/Shimbhu77/MusterDekho_Assignment/blob/main/Project-Screenshot/Screenshot%20(1151).png)
   ## Home Page
  ![Home Page](https://github.com/Shimbhu77/MusterDekho_Assignment/blob/main/Project-Screenshot/Screenshot%20(1152).png)
   ## Update Task Page
  ![Update Task page ](https://github.com/Shimbhu77/MusterDekho_Assignment/blob/main/Project-Screenshot/Screenshot%20(1154).png)
  ## View Task and Assigned Task Page
  ![View Task and Assigned Task Page](https://github.com/Shimbhu77/MusterDekho_Assignment/blob/main/Project-Screenshot/Screenshot%20(1155).png)

 ## Project Presentation Video
 
 [live-project-presentation-drive-link](https://drive.google.com/file/d/1nE3ILgH63LBzrPNftcrGqDeW7IVabYPl/view?usp=sharing)
 
 ## Contributer
 
 [Shimbhu Kumawat](https://github.com/Shimbhu77)


