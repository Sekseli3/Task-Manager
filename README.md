# Task Manager Application
This is a simple task manager application built with React for the frontend and Node.js with Express for the backend. The application allows users to add, delete, and toggle the importance of tasks.

## Frontend
The frontend is built with React and uses the axios library to make HTTP requests to the backend. The main component is App, which manages the state of the tasks and handles user interactions.

The App component uses the useState and useEffect hooks to manage the state of the tasks and to fetch the initial list of tasks from the backend when the component is first rendered.

The handlePress function is used to add a new task. It prevents the default form submission, checks that the task is not empty, and then sends a POST request to the backend with the new task.

The toggleImportanceOf function is used to toggle the importance of a task. It finds the task in the state, creates a new task with the importance toggled, and then sends a PUT request to the backend with the updated task.

The deleteTask function is used to delete a task. It sends a DELETE request to the backend with the id of the task to delete.

## Backend
The backend is built with Node.js and Express. It uses Mongoose to connect to a MongoDB database and to define the schema for the tasks.

The backend provides the following API endpoints:

GET /tasks: Returns a list of all tasks.
GET /tasks/:id: Returns the task with the given id.
POST /tasks: Adds a new task. The task should be sent in the body of the request.
DELETE /tasks/:id: Deletes the task with the given id.
PUT /tasks/:id: Updates the task with the given id. The updated task should be sent in the body of the request.

## Future Improvements
Add user authentication.
Allow users to edit tasks.
Add a due date for tasks.
Add the ability to sort and filter tasks.

