# pretia-assignment
 
Pretia CMS Project README
This repository contains a Content Management System (CMS) project built using Next.js, NestJS, PostgresQL, React Query and Selenium. The project aims to provide user authentication, content management, shared content functionalities and automated testing.

## Running the app

git clone https://github.com/UmBeloGramadoVerde/pretia-assignment.git
cd pretia-assignment
docker-compose up

## Tech Stack

### Frontend:

Next.js, React Query, Tailwind

### Backend:

NestJS, PostgresQL, TypeORM

### Testing:
Selenium, TODO -> Chai

## Project Structure
The project is structured as follows:

```
├── backend
│   ├── src
│   │   ├── article               # Content management module
│   │   ├── auth                  # Authentication module
│   │   ├── shared                # Shared module
│   │   ├── user                  # User management module
│   │   ├── app.module.ts         # Main application module
│   │   ├── .env                  # Backend environment variables
│   │   └── ...
│   └── migrations                # Database migrations
│   └── uploads                   # Where upload images are sent (TODO: use cloud service live s3 or firebase)
│   └── Dockerfile                # Dockerfile for building Backend
│   └── ...
├── frontend
│   ├── src
│   │   ├── app                   # Page modules using Next.js App router
│   │   ├── components            # Reusable React components
│   │   ├── context               # Context for sharing data (only used for theme)
│   │   ├── styles                # Global and component-specific styles
│   │   ├── hooks                 # Hooks for fetching API data using React query and utilities
│   │   ├── lib                   # Storing utils and services
│   │   ├── types                 # Types used throughout the app
│   │   ├── next.config.js        # Next.js configuration
│   │   ├── .env                  # Frontend environment variables
│   │   └── ...
│   └── Dockerfile                # Dockerfile for building Frontend
│   └── ...
├── docker-compose.yml            # Docker configuration
├── README.md                     # Project documentation
└── ...
├── e2e
│   ├── test.js                   # Automated tests for the main flows of the app
└── ...
```

## Database structure

![Database structure](https://imgur.com/a/XPU1QzB)

Currently each post only has one image, therefore the One to One relationship, another TODO is allow multiple image posting

## Observations about the Frontend Stack

Next.js is a powerful React framework that excels in server-side rendering (SSR) and static site generation (SSG). It provides an opinionated structure for building React applications with built-in routing, server-side rendering capabilities, and automatic code splitting. Next.js enhances performance by rendering pages on the server, resulting in faster initial load times and improved SEO. It also supports client-side routing for dynamic interactions. Its rich ecosystem of plugins and tools simplifies tasks like internationalization and optimization. Next.js's versatility makes it an excellent choice for building modern web applications with enhanced user experiences.

Tailwind CSS is a utility-first CSS framework that streamlines the process of styling web applications. It provides a set of utility classes that can be combined to rapidly create responsive and visually appealing user interfaces. Tailwind CSS encourages consistent and scalable styling practices without writing custom CSS. Its modular approach allows developers to create unique designs while maintaining consistency across the application. By focusing on utility classes, Tailwind CSS improves developer productivity and reduces the need for writing extensive custom CSS, making it a great choice for efficient styling.

React Query is a data fetching and caching library designed specifically for React applications. It simplifies the management of remote data by providing a declarative way to fetch, cache, and update data without the need for complex state management. React Query's features include intelligent caching, background data syncing, and automatic invalidation. It promotes a seamless user experience by ensuring data is up-to-date and minimizing unnecessary network requests. React Query's integration with React components and hooks makes it a natural fit for applications built with React, enhancing data handling and reducing the complexity of data management.

Shacdn is a lightweight, accessible, and themeable design system created by Radix UI. It offers a collection of design primitives and components that can be used to build user interfaces with a consistent and accessible design language. Shacdn encourages the use of simple utility classes to compose components, aligning well with the utility-first approach of Tailwind CSS. Its focus on accessibility ensures that your application will be usable by a wider range of users. By using Shacdn, you can create well-designed and accessible user interfaces while maintaining a lightweight and efficient codebase.

## Observations about the Backend Stack

PostgreSQL is a powerful open-source relational database management system. It's a great choice due to its robustness, support for complex queries, and data integrity features. With features like JSONB data type, support for advanced indexing, and support for geographical data, PostgreSQL can handle a wide range of application requirements. Additionally, its ACID compliance ensures data consistency and reliability. In combination with TypeORM, PostgreSQL provides a solid foundation for managing your application's data.

Nest.js is a TypeScript framework for building efficient and scalable server-side applications. It's inspired by Angular's architecture and uses decorators to create modules, controllers, and services. Nest.js offers a modular structure, dependency injection, and strong typing, making it well-suited for building complex and maintainable backend applications. Its built-in support for RESTful APIs and WebSocket communication, along with features like guards, interceptors, and filters, help streamline development and enhance code organization.

TypeORM is an Object-Relational Mapping (ORM) library for TypeScript and JavaScript. It simplifies database interactions by allowing you to work with your database using TypeScript classes and decorators. TypeORM supports multiple database systems, including PostgreSQL, MySQL, and SQLite. Its features like data validation, query builder, and migrations make database management more intuitive and maintainable. Using TypeORM with PostgreSQL allows you to define and manage your database schema using TypeScript classes, enhancing code readability and maintainability.

Swagger is a powerful tool for designing, documenting, and testing APIs. With the integration of tools like @nestjs/swagger, you can automatically generate API documentation directly from your Nest.js application's code. Swagger provides a user-friendly interface that makes it easy for developers to understand and test API endpoints. Clear and up-to-date API documentation is essential for collaboration between frontend and backend developers, ensuring a consistent understanding of endpoints and data structures.

Passport is a widely-used authentication middleware for Node.js. It offers various authentication strategies, including local authentication (username/password), OAuth, and more. Using Passport with Nest.js simplifies the process of implementing authentication and authorization in your backend application. Its flexibility allows you to choose the appropriate authentication mechanism for your application's needs. With Passport, you can secure your endpoints and manage user authentication efficiently.

To run selenium chorme instances:
    docker run  --platform linux/amd64 -d -p 4444:4444 -p 7900:7900 --shm-size="2g" selenium/standalone-chrome
    Check http://localhost:4444/ui# to see selenium grid
    Check http://localhost:7900/?autoconnect=1&resize=scale&password=secret to see the tests that are being run