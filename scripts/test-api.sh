#!/bin/bash

# Base URL
BASE_URL="http://localhost:3000/api"

# Test user registration
echo "Testing user registration..."
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/users/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "name": "Test User"
  }')
echo "Register Response: $REGISTER_RESPONSE"
USER_ID=$(echo $REGISTER_RESPONSE | grep -o '"id":"[^"]*' | cut -d'"' -f4)

# Test user login
echo -e "\nTesting user login..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/users/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }')
echo "Login Response: $LOGIN_RESPONSE"

# Test get user profile
echo -e "\nTesting get user profile..."
GET_USER_RESPONSE=$(curl -s -X GET "$BASE_URL/users/$USER_ID")
echo "Get User Response: $GET_USER_RESPONSE"

# Test update user
echo -e "\nTesting update user..."
UPDATE_RESPONSE=$(curl -s -X PATCH "$BASE_URL/users/$USER_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Test User"
  }')
echo "Update Response: $UPDATE_RESPONSE"

# Test delete user
echo -e "\nTesting delete user..."
DELETE_RESPONSE=$(curl -s -X DELETE "$BASE_URL/users/$USER_ID")
echo "Delete Response: $DELETE_RESPONSE"