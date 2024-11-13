<<<<<<< HEAD
# Library Management System (Backend)

This is a backend API for a Library Management System that helps manage books, members, borrowing activities, and overdue book tracking. It provides a set of RESTful API endpoints for library staff and members to interact with the system.

## Features

- **Book Management**: Add, update, delete, and view books in the library.
- **Member Management**: Create, update, delete, and view library members.
- **Borrow & Return System**: Borrow and return books while keeping track of borrow records.
- **Overdue Book Tracking**: List books that are overdue for return.

## Technology Stack

- **Programming Language**: TypeScript
- **Web Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **API Documentation**: OpenAPI (Swagger)

---

## Installation & Setup

### Prerequisites

Before getting started, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://npmjs.com) or [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)

### Steps
1. **Clone the repository**:

   ```sh
   git clone https://github.com/Programmer-Manik/LibraryManagementSystem.git
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following variables:

   ```
   DATABASE_URL= your_database_url
   PORT= specify_a_port
   ```

4. **Run the application**:
   ```sh
   npm run dev
   ```


