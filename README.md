# TaskFlow

TaskFlow is a full-stack project management application that helps users organize projects, create and manage tasks, set priorities, track progress, and manage due dates.

## Table of Contents

- Background
- Features
- Technologies Used
- Project Structure
- Install
- Usage
- API Endpoints
- Security
- Maintainers
- Contributing
- License

## Background

TaskFlow is designed to simplify project and task management by providing a centralized platform where users can create projects, organize tasks, assign priorities, monitor progress, and manage deadlines.

The application provides secure user authentication, project management, task tracking, and a dashboard to help users stay organized and productive.

The main goals of TaskFlow are:

- Simplify project organization and management.
- Allow users to create, update, and delete projects.
- Provide efficient task creation and tracking.
- Track task priorities and completion status.
- Monitor project progress through a dashboard.
- Secure user data with JWT authentication and BCrypt password hashing.

## Features

### User Authentication

- User registration and login.
- Secure password hashing using BCrypt.
- JWT-based authentication.
- Protected application routes.

### Project Management

- Create new projects.
- View all projects.
- View individual project details.
- Edit project information.
- Delete projects.

### Task Management

- Create tasks under projects.
- View project tasks.
- Update task details.
- Set task priorities: `LOW`, `MEDIUM`, `HIGH`.
- Track task status: `TODO`, `IN_PROGRESS`, `DONE`.
- Set task due dates.
- Delete tasks.

### Dashboard

- View project information.
- Track task progress.
- View task summaries.
- Monitor pending and completed tasks.

## Technologies Used

### Frontend

- React.js
- Vite
- JavaScript
- Axios
- React Router
- CSS

### Backend

- Java 21
- Kotlin
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT Authentication
- Gradle

### Database

- PostgreSQL

## Project Structure

text

```text
TaskFlow/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── kotlin/com/taskflow/
│   │       │   ├── config/
│   │       │   ├── controller/
│   │       │   ├── dto/
│   │       │   ├── entity/
│   │       │   ├── repository/
│   │       │   └── service/
│   │       └── resources/
│   │
│   └── build.gradle.kts
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Install

### Prerequisites

Make sure the following software is installed:

- Java 21
- Node.js and npm
- PostgreSQL
- Git

### 1\. Clone the Repository

bash

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd TaskFlow
```

### 2\. Database Setup

Create a PostgreSQL database:

sql

```sql
CREATE DATABASE taskflow_db;
```

Configure your PostgreSQL database credentials in the backend environment variables or `application.yml`.

### 3\. Backend Configuration

Navigate to the backend directory:

bash

```bash
cd backend
```

Configure the following application properties:

- PostgreSQL database URL.
- Database username.
- Database password.
- JWT secret key.

Keep sensitive credentials private and do not commit them to GitHub.

## Usage

### 1\. Run the Backend

From the backend directory, execute:

**Windows:**

bash

```bash
gradlew.bat bootRun
```
The backend server will run at:

`http://localhost:8080`

### 2\. Run the Frontend

Open another terminal and navigate to the frontend directory:

bash

```bash
cd frontend
```

Install dependencies:

bash

```bash
npm install
```

Start the development server:

bash

```bash
npm run dev
```

The frontend application will run at:

`http://localhost:5173`

### 3\. Use the Application

1. Register a new user account.
2. Log in using your credentials.
3. Access the dashboard.
4. Create and manage projects.
5. Add tasks to your projects.
6. Set task priorities and due dates.
7. Update task statuses.
8. Monitor project progress through the dashboard.

## API Endpoints

### Authentication

| Method | Endpoint |
| --- | --- |
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |

### Projects

| Method | Endpoint |
| --- | --- |
| POST | `/api/projects` |
| GET | `/api/projects` |
| GET | `/api/projects/{id}` |
| PUT | `/api/projects/{id}` |
| DELETE | `/api/projects/{id}` |

### Tasks

| Method | Endpoint |
| --- | --- |
| POST | `/api/projects/{projectId}/tasks` |
| GET | `/api/projects/{projectId}/tasks` |
| GET | `/api/projects/{projectId}/tasks/{taskId}` |
| PUT | `/api/projects/{projectId}/tasks/{taskId}` |
| PATCH | `/api/projects/{projectId}/tasks/{taskId}/status` |
| DELETE | `/api/projects/{projectId}/tasks/{taskId}` |
| GET | `/api/projects/{projectId}/tasks/summary` |

## Security

TaskFlow implements security practices to protect user information and application resources.

- Passwords are securely hashed using BCrypt.
- JWT tokens are used for authentication.
- Protected API endpoints require valid authentication.
- Database credentials are configured privately.
- JWT secret keys should be stored in environment variables.
- Sensitive configuration files should never be committed to GitHub.

## Maintainers

TaskFlow – Full Stack Project Management Application.

## Contributing

Contributions, suggestions, and improvements are welcome.

To contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Commit your changes.
5. Push the branch to your fork.
6. Submit a pull request.

For major changes, please open an issue first to discuss what you would like to change.

## License

This project is created for learning and development purposes.
