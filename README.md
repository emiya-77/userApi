# User Management API Documentation

## Overview
This API provides CRUD operations for managing users using Express.js and MongoDB.

## Base URL
```
user-api-v3.vercel.app
```

## Environment Variables
Ensure you have a `.env` file with the following variables:
```
DB_USER=yourMongoDBUsername
DB_PASS=yourMongoDBPassword
```

## Endpoints

### 1. Create a User
**Endpoint:**
```
POST /api/user
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "role": "admin",
  "address": "123 Main St"
}
```
**Response:**
```json
{
  "message": "User created successfully",
  "userId": "64fdbd1c12345abcde67890f"
}
```

### 2. Get All Users or a Specific User
**Get All Users:**
```
GET /api/users
```
**Get Single User:**
```
GET /api/users/:id
```
**Response (Single User):**
```json
{
  "_id": "64fdbd1c12345abcde67890f",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "role": "admin",
  "address": "123 Main St"
}
```

### 3. Update a User
**Endpoint:**
```
PUT /api/user/:id
```
**Request Body:** (All fields required)
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "0987654321",
  "role": "user",
  "address": "456 Side St"
}
```
**Response:**
```json
{
  "message": "User updated successfully"
}
```

### 4. Partially Update a User
**Endpoint:**
```
PATCH /api/user/:id
```
**Request Body:** (Any field can be updated)
```json
{
  "phone": "1112223333"
}
```
**Response:**
```json
{
  "message": "User updated successfully"
}
```

### 5. Delete a User
**Endpoint:**
```
DELETE /api/user/:id
```
**Response:**
```json
{
  "message": "User deleted successfully"
}
```

## Error Responses
- `400 Bad Request`: Missing required fields
- `404 Not Found`: User not found
- `500 Internal Server Error`: Server-side error

## Running the Server
To start the server, run:
```
npm install
node server.js
```

The API will be running on `user-api-v3.vercel.app`.

