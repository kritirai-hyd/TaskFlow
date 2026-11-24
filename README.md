TaskFlow
TaskFlow is a full-stack project management application that helps users organize projects, create and manage tasks, set priorities, track progress, and manage due dates.
Features
User Authentication
- User registration and login
- Secure password hashing using BCrypt
- JWT-based authentication
- Protected application routes
Project Management
- Create new projects
- View all projects
- View individual project details
- Edit project information
- Delete projects
Task Management
- Create tasks under projects
- View project tasks
- Update task details
- Set task priorities: LOW, MEDIUM, HIGH
- Track task status: TODO, IN_PROGRESS, DONE
- Set task due dates
- Delete tasks
Dashboard
- View project information
- Track task progress
- View task summaries
Technologies Used
Frontend
- React.js
- Vite
- JavaScript
- Axios
- React Router
- CSS
Backend
- Java 21
- Kotlin
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT Authentication
- Gradle
Database
- PostgreSQL
Project Structure
text
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
Installation and Setup
1. Clone the Repository
bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd TaskFlow
2. Database Setup
Create a PostgreSQL database:
sql
CREATE DATABASE taskflow_db;
Configure your database credentials in the backend environment variables or `application.yml`.
3. Run the Backend
Open a terminal:
bash
cd backend
On Windows:
bash
gradlew.bat bootRun
The backend runs at:
`http://localhost:8080`
4. Run the Frontend
Open another terminal:
bash
cd frontend
npm install
npm run dev
The frontend runs at:
`http://localhost:5173`
API Endpoints
Authentication
Method | Endpoint 
POST `/api/auth/register`
POST `/api/auth/login` 
Projects
Method | Endpoint |
POST `/api/projects` 
GET `/api/projects` |
GET `/api/projects/{id}` |
PUT `/api/projects/{id}` |
DELETE `/api/projects/{id}` |
Tasks
| Method | Endpoint |
POST `/api/projects/{projectId}/tasks` |
GET `/api/projects/{projectId}/tasks` |
GET `/api/projects/{projectId}/tasks/{taskId}` |
PUT `/api/projects/{projectId}/tasks/{taskId}` |
PATCH `/api/projects/{projectId}/tasks/{taskId}/status` |
DELETE `/api/projects/{projectId}/tasks/{taskId}` |
GET `/api/projects/{projectId}/tasks/summary` |
Security
- Passwords are encrypted using BCrypt hashing.
- JWT tokens are used for authentication.
- Protected API endpoints require authentication.
- Database credentials and JWT secrets should be configured privately and must not be committed to GitHub.
Author
TaskFlow – Full Stack Project Management Application
License
This project is created for learning and development purposes.