# pretia-assignment
 
CMS Project README
This repository contains a Content Management System (CMS) project built using Next.js, NestJS, MongoDB, and React Query. The project aims to provide user authentication, content management, and shared content functionalities.

Tech Stack
Frontend:

Next.js: A React framework for building server-rendered applications.
React Query: A data-fetching library for managing and synchronizing server state in React applications.
Backend:

NestJS: A TypeScript framework for building efficient and scalable server-side applications.
PostgresQL: A relational database for storing and managing data.
TypeORM: An Object-Relational Mapping library for TypeScript and JavaScript.
Project Structure
The project is structured as follows:

├── backend
│   ├── src
│   │   ├── auth                  # User authentication module
│   │   ├── content               # Content management module
│   │   ├── shared                # Shared content module
│   │   ├── app.module.ts         # Main application module
│   │   └── ...
│   └── ...
├── frontend
│   ├── components                # Reusable React components
│   ├── pages                     # Next.js pages and routes
│   ├── queries                   # React Query queries and hooks
│   ├── styles                    # Global and component-specific styles
│   ├── public                    # Public assets (images, etc.)
│   ├── ...
│   ├── next.config.js            # Next.js configuration
│   └── ...
├── .env                          # Environment variables (not committed)
├── docker-compose.yml            # Docker configuration
├── README.md                     # Project documentation
└── ...

backend: Contains the NestJS backend application.

src/auth: Handles user authentication and authorization.
src/content: Manages content-related functionalities.
src/shared: Handles shared content features.
src/app.module.ts: Main application module where modules are imported and configured.
frontend: Contains the Next.js frontend application.

components: Houses reusable React components.
pages: Defines Next.js pages and routes.
queries: Contains React Query queries and custom hooks.
styles: Includes global and component-specific styles.
public: Stores public assets like images.
next.config.js: Configuration file for Next.js.
.env: Environment variables for configuring your application. Not committed to version control.

docker-compose.yml: Configuration for running Docker containers for MongoDB and the backend application.

Getting Started
Clone this repository: git clone <repository_url>
Set up the environment variables: Create a .env file based on .env.example in both backend and frontend directories.
Navigate to the backend directory and run docker-compose up to start MongoDB and the backend application.
Navigate to the frontend directory and run npm install to install frontend dependencies.
Run npm run dev to start the Next.js frontend application.
Feel free to extend and customize the project structure to suit your specific requirements.