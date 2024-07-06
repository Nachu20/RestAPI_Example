# User Authentication API

This is a simple Node.js API for user registration and authentication using bcrypt for password hashing and JWT for token-based authentication.

## Technologies Used

- Node.js
- Express
- MongoDB (with Mongoose)
- bcrypt
- JWT (jsonwebtoken)
- express-async-handler

## Setup and Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Nachu20/RestAPI_Example.git
    ```

2. Navigate into the project directory:
    ```bash
    cd RestAPI_Example
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root of the project and add the following environment variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    ACCESS_TOKEN_SECRET=your_jwt_secret_key
    ```

5. Start the server:
    ```bash
    npm start
    ```

## API Endpoints

### Register User

- **URL**: `/api/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
    ```json
    {
        "username": "your_username",
        "email": "your_email",
        "password": "your_password"
    }
    ```
- **Response**:
    - **Status**: `201 Created`
    - **Body**:
        ```json
        {
            "_id": "user_id",
            "email": "user_email"
        }
        ```

### Login User

- **URL**: `/api/login`
- **Method**: `POST`
- **Description**: Logs in an existing user.
- **Request Body**:
    ```json
    {
        "email": "your_email",
        "password": "your_password"
    }
    ```
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "accesstoken": "your_jwt_access_token"
        }
        ```

### Get Current User

- **URL**: `/api/current`
- **Method**: `GET`
- **Description**: Gets the current authenticated user.
- **Headers**:
    - `Authorization`: `Bearer your_jwt_access_token`
- **Response**:
    - **Status**: `200 OK`
    - **Body**:
        ```json
        {
            "message": "Current user"
        }
        ```

## Error Handling

The API will return appropriate HTTP status codes and error messages in case of any issues, such as missing fields, invalid credentials, or duplicate registration attempts.

