# Auth API Documentation

This API provides two main authentication endpoints: registration and login.

## Endpoints

### 1. `POST /auth`

#### Description

Registers a new user with the provided information. If the email already exists in the database, it returns an error.

#### Request Body
`{
  "password": "string",
  "first_name": "string",
  "last_name": "string",
  "email": "string"
}` 

#### Process

1.  Checks that all fields are provided.
2.  Verifies if an account with the given email already exists.
3.  If not, hashes the password and stores the user data in the `USERS` table.
4.  Creates a new session token and saves it in the `SESSIONS` table.

#### Response

-   **201 Created**: User registered successfully.
    -   Example: `{ "message": "User registered successfully", "sessionToken": "exampleToken" }`
-   **400 Bad Request**: Missing fields or email already exists.
    -   Example: `{ "error": "All fields are required" }`
    -   Example: `{ "error": "Account already exists with this email" }`
-   **500 Internal Server Error**: Server error occurred.

#### Example Requests

-   **Correct Body**:
    `{
      "password": "securePassword123",
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com"
    }` 
    
-   **Incorrect Body**: 
    `{
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com"
    }` 
    
    _Response_: `{ "error": "All fields are required" }`
    

----------

### 2. `PUT /auth`

#### Description

Logs in a user by validating the provided email and password. Updates the session token if successful.

#### Request Body
`{
  "email": "string",
  "password": "string"
}` 
#### Process
1.  Checks that both `email` and `password` are provided.
2.  Searches for the user by email.
3.  If found, verifies the password.
4.  If correct, updates the session token for the user in the `SESSIONS` table.

#### Response

-   **200 OK**: User logged in successfully.
    -   Example: `{ "message": "User logged in successfully", "sessionToken": "exampleToken" }`
-   **400 Bad Request**: Missing fields.
    -   Example: `{ "error": "All fields are required" }`
-   **404 Not Found**: Account not found.
    -   Example: `{ "error": "Account not found" }`
-   **401 Unauthorized**: Incorrect password.
    -   Example: `{ "error": "Incorrect password" }`
-   **500 Internal Server Error**: Server error occurred.

#### Example Requests

-   **Correct Body**:
    `{
      "email": "john.doe@example.com",
      "password": "securePassword123"
    }` 
    
-   **Incorrect Body**:
    `{
      "email": "john.doe@example.com"
    }` 
    
    _Response_: `{ "error": "All fields are required" }`