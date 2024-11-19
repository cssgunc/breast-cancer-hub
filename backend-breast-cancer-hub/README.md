# API Documentation
This API Has three resources: auth, settings, and user

[1. POST /auth](#1-post-auth)

[2. PUT /auth](#2-put-auth)

[3. POST /settings](#3-post-settings)

[4. GET /settings](#4-get-settings)

[4. GET /user](#4-get-user)

[5. PUT /settings](#5-put-settings)

## Endpoints

----------

## 1. `POST /auth`

### ***Description***

Registers a new user with the provided information. If the email already exists in the database, it returns an error. Creates and returns the accounts session token if successful.

### ***Request Body***
```json
  {
    "password": "string",
    "name": "string",
    "email": "string"
  }
``` 

### ***Process***

1.  Checks that all fields are provided.
2.  Verifies if an account with the given email already exists.
3.  If not, hashes the password and stores the user data in the `USERS` table.
4.  Creates a new session token and saves it in the `SESSIONS` table.

### ***Response***

-   **201 Created**: User registered successfully.
    -   Example: `{ "message": "User registered successfully", "sessionToken": "exampleToken" }`
-   **400 Bad Request**: Missing fields or email already exists.
    -   Example: `{ "error": "All fields are required" }`
    -   Example: `{ "error": "Account already exists with this email" }`
-   **500 Internal Server Error**: Server error occurred.

### ***Example Requests***

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

## 2. `PUT /auth`

### ***Description***

Logs in a user by validating the provided email and password. Updates and returns the session token if successful.

### ***Request Body***

```json
  {
    "email": "string",
    "password": "string"
  }
``` 
### ***Process***
1.  Checks that both `email` and `password` are provided.
2.  Searches for the user by email.
3.  If found, verifies the password.
4.  If correct, updates the session token for the user in the `SESSIONS` table.

### ***Response***

-   **200 OK**: User logged in successfully.
    -   Example: `{ "message": "User logged in successfully", "sessionToken": "exampleToken" }`
-   **400 Bad Request**: Missing fields.
    -   Example: `{ "error": "All fields are required" }`
-   **404 Not Found**: Account not found.
    -   Example: `{ "error": "Account not found" }`
-   **401 Unauthorized**: Incorrect password.
    -   Example: `{ "error": "Incorrect password" }`
-   **500 Internal Server Error**: Server error occurred.

### ***Example Requests***

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

----------

## 3. `POST /settings`

### ***Description***

Creates new settings for the specified user, requiring authorization headers.

### ***Headers***
- `x-session-token`: The session token for authorization.
- `x-user-email`: The email of the user for authorization.

### ***Request Body***
```json
{
  "user_id": "string"
}
```
### ***Process***
1. Verifies the session token and email.
2. Checks if user_id is provided.
3. Inserts a new settings entry in the settings table for the provided user.

### ***Response***

- **201** Created: Settings created successfully.
  - Example: `{ "message": "Settings created successfully", "settings": { ...settings data... } }`
- **400** Bad Request: Missing required fields.
  - Example: `{ "error": "Invalid input" }`
- **403** Forbidden: Unauthorized request.
  - Example: `{ "error": "Unauthorized" }`
- **500** Internal Server Error: Server error occurred.

----------

## 4. `GET /settings`

### ***Description***

Retrieves the settings for the specified user, requiring authorization headers.

### ***Headers***
- x-session-token: The session token for authorization.
- x-user-email: The email of the user for authorization.

### ***Query Parameters***
- user_id: The ID of the user whose settings are to be retrieved.

### ***Process***
1. Verifies the session token and email.
2. Checks if user_id is provided.
3. Queries the settings table for the settings of the specified user.

### ***Response***
- **200** OK: Settings retrieved successfully.
  - Example: `{ "settings": { ...settings data... } }`
- **400** Bad Request: Missing required fields.
  - Example: `{ "error": "user_id is required" }`
- **403** Forbidden: Unauthorized request.
  - Example: `{ "error": "Unauthorized" }`
- **404** Not Found: No settings found.
  - Example: `{ "error": "No settings found for this user" }`
- **500** Internal Server Error: Server error occurred.

----------

## 5. `PUT /settings`

### ***Description***
  Updates the settings for the specified user, requiring authorization headers.

### Headers
- x-session-token: The session token for authorization.
- x-user-email: The email of the user for authorization.

### ***Request Body***
```json
  {
    "user_id": "string",
    "scheduling_type": "string",
    "notification_times": "string",
    "locale": "string",
    "use_backup_data": "boolean",
    "use_telemetry": "boolean",
    "use_push_notification": "boolean",
    "use_in_app_notification": "boolean"
  }
```
### ***Process***
1. Verifies the session token and email.
2. Checks that user_id, scheduling_type, notification_times, and locale are provided.
3. Updates the settings in the settings table for the specified user.

### ***Response***
- **200** OK: Settings updated successfully.
  - Example: `{ "message": "Settings updated successfully", "settings": { ...settings data... } }`
- **400** Bad Request: Missing required fields.
  - Example: `{ "error": "user_id, scheduling_type, notification_times, and locale are required" }`
- **403** Forbidden: Unauthorized request.
  - Example: `{ "error": "Unauthorized" }`
- **404** Not Found: No settings found.
  - Example: `{ "error": "No settings found for this user" }`
- **500** Internal Server Error: Server error occurred.

----------

## 4. `GET /user`

### ***Description***

Retrieves the name for the specified user, requiring authorization headers.

### ***Headers***
- x-session-token: The session token for authorization.
- x-user-email: The email of the user for authorization.

### ***Query Parameters***
- user_id: The ID of the user whose settings are to be retrieved.

### ***Process***
1. Verifies the session token and email.
2. Checks if user_id is provided.
3. Queries the user table for the name of the specified user.

### ***Response***
- **200** OK: Settings retrieved successfully.
  - Example: `{ "name": "Example Name" }`
- **400** Bad Request: Missing required fields.
  - Example: `{ "error": "user_id is required" }`
- **403** Forbidden: Unauthorized request.
  - Example: `{ "error": "Unauthorized" }`
- **404** Not Found: No settings found.
  - Example: `{ "error": "No name found for this user" }`
- **500** Internal Server Error: Server error occurred.
