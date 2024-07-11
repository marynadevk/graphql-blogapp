# Blog App

## Description

Blog App is a full-stack application that allows users to create and read blog posts.

## Main Technologies Used
- **React**: For building the dynamic and responsive frontend.
- **GraphQL**: Used for designing and implementing the API, providing a more efficient and powerful alternative to REST.
- **Apollo Client**: Integrated with React for managing GraphQL operations and data caching.
- **Prisma**: As the ORM for interacting with the database in an intuitive manner.
- **PostgreSQL**: The underlying database for storing all application data.

## Getting Started

To set up the project, follow these steps:

1. **Clone the repository:**

```sh
git clone <https://github.com/marynadevk/graphql-blogapp>
cd blogapp
```
2. **Install dependencies for both frontend and backend:**
# Install backend dependencies
```sh
cd backend
npm install
```
# Install frontend dependencies
```sh
cd ../frontend
npm install
```
3. **Create a .env file in the backend directory based on the provided .env.example**

4. **Build the frontend app and backend server**
```sh
npm start:dev
npm run dev
```

## API Endpoints

1. Queries
  - posts: Fetches a list of all blog posts.
  - post(id: ID!): Fetches a single blog post by its ID.

2. Mutations
  - createPost(title: String!, content: String!): Post: Creates a new blog post.
  - updatePost(id: ID!, title: String, content: String): Post: Updates an existing blog post.
  - deletePost(id: ID!): Post: Deletes a blog post.