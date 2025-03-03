# Atithidev Serverless API

## Overview
This is a **Serverless AWS Lambda Function-based API** for the **Atithidev Website**. It provides endpoints to manage hosts and reviews using **MongoDB Atlas** as the database and is deployed using the **Serverless Framework**.

## Features
- Fetch hosts and reviews
- Insert new reviews
- Fully **serverless** with **AWS Lambda**
- Uses **MongoDB Atlas** as the database

## Tech Stack
- **Node.js** (Runtime: 18.x)
- **Express.js** (Lightweight API Framework)
- **MongoDB Atlas** (Database)
- **AWS Lambda** (Serverless Functions)
- **Serverless Framework** (Deployment & CI/CD)

## Setup Instructions

### 1. Clone the Repository
```sh
https://github.com/ap-dev-github/atithidev-mongoose-api.git
cd atithidev-mongoose-api
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your MongoDB connection string:

```ini
MONGO_URI=your-mongodb-connection-string
```
Make sure `.env` is added to `.gitignore` to prevent exposing secrets.

### 4. Run Locally with Serverless Offline
```sh
npx serverless offline
```
This will start the API locally.

### 5. Deploy to AWS Lambda
```sh
npx serverless deploy
```
This will deploy the API to AWS.

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/` | Home route, checks if API is running |
| **GET** | `/fetchHosts` | Fetch all hosts |
| **GET** | `/fetchHosts/:state` | Fetch hosts by state |
| **GET** | `/fetchHost/:id` | Fetch a host by ID |
| **GET** | `/fetchReviews/host/:id` | Fetch reviews for a specific host |
| **POST** | `/insert_review` | Insert a new review |

## Important Notes
- **AWS Credentials**: Set up `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as GitHub Secrets for CI/CD deployment.
- **MongoDB Connection**: Ensure the `MONGO_URI` is correctly set in your `.env` file or **AWS Lambda environment variables**.
- **Serverless Framework**: Install globally if not installed:
  ```sh
  npm install -g serverless
  ```
- **Linting**: The project uses **ESLint** for code quality. Run:
  ```sh
  npx eslint .
  ```
  before deployment to check for issues.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Created & Maintained By  

[Ayush Pandey](https://www.linkedin.com/in/linkedap/) | Contact: [ayushpandey.cs@gmail.com]

