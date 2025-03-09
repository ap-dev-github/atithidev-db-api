# Overview 🔍

## **Atithidev DB API – Scalable & Cost-Optimized Serverless Backend**
> The Atithidev DB API is a scalable, serverless backend solution designed for efficiently managing profiles and reviews. Built using the Serverless Framework and deployed on AWS Lambda, it eliminates infrastructure management while ensuring cost-effective scaling and high availability.

---

## 💰 Cost Efficiency & Scalability
- The API scales down to approximately **zero cost** for up to **1 million API requests per month**.
- If there is no traffic, the infrastructure **automatically scales down** to near-zero cost, inclusive of AWS services like **S3, API Gateway**, and other dependencies.
- When traffic increases, it **seamlessly scales up** using the AWS API Gateway to handle the load.
- After exceeding **1 million requests**, costs are incurred based on **AWS Lambda pricing**.

---

## 🚀 Fully Automated & Cost-Optimized CI/CD Deployment
1. **Run Code Quality Checks** – ESLint for linting and Jest for API endpoint testing.
2. **Automated CI/CD Based Testing & Deployment Optimization**
   - Installs the testing dependencies, runs tests, and removes them post-testing to reduce package size.
   - Prunes old versions from the cloud and **reduces dev dependencies** before packaging.
3. **Deploy to AWS** – Automatically updates the AWS Lambda function and connects with API Gateway.
4. **Verify and Activate Lambda** – Ensures the function is running seamlessly after deployment.

---

## ✨ Features
- Fetch reviews, post reviews, and find people (hosts) based on various parameters like state or ID.
- **Fully serverless** with AWS Lambda ⚡
- Uses **MongoDB Atlas** as the database 🌴
- **CI/CD automation** with GitHub Actions 🤖
- **TypeScript** for type safety 💎
- Linting Test
- **Jest** for API endpoint testing ✅
- **Rate limiting** to prevent abuse ⚖️
- **Logging and monitoring** with AWS CloudWatch 📊

---

## 🛠️ Tech Stack
- **Node.js** (Runtime: 18.x) 💚
- **TypeScript** (Type-Safe Development) 💎
- **MongoDB Atlas** (Database) 🌴
- **AWS Lambda** (Serverless Compute) ⚡
- **AWS API Gateway**
- **Serverless Framework**

---

## 🔐 Security Features
- ✅ **Rate Limiting** – Prevents abuse and DDoS attacks, ensuring API stability.
- ✅ **Code Quality Enforcement** – Integrates ESLint into CI/CD to maintain high-quality code.
- ✅ **Secure Key Management** – Uses GitHub Secrets Manager to protect API keys and environment variables.
- ✅ **Database Security** – MongoDB Atlas is secured with **IP whitelisting**, restricting unauthorized access.
- ✅ **AWS Cognito Authentication** – User authentication is managed via AWS Cognito, ensuring **secure access control**.

---

## 🔧 Setup Instructions
### 1️⃣ Clone the Repository 🔗
```sh
git clone https://github.com/ap-dev-github/atithidev-db-api.git
```
### 2️⃣ Install Dependencies 📦
```sh
npm install
```
### 3️⃣ Environment Variables 🔑
```sh
MONGO_URI=your-mongodb-connection-string
```
### 4️⃣ Run Locally with Serverless Offline 🖥️
```sh
npx serverless offline
```
### 5️⃣ Deploy to AWS Lambda 🚀
```sh
npx serverless deploy
```
## 🌐 Endpoints

| **Method**| **Endpoint**        | **Description**                          |
|-----------|----------------------|-----------------------------------------|
| GET       | `/`                  | Home route, checks if API is running    |
| GET       | `/fetchHosts`        | Fetch all hosts                         |
| GET       | `/fetchHosts/:state` | Fetch hosts by state                    |
| POST      | `/insert_review`     | Insert a new review                     |


## 👨‍💻Creator and Contributor
### Ayush Pandey

[🔗 Connect on LinkedIn](https://www.linkedin.com/in/linkedap/)  

📧 **Email:** [ayushpandey.cs@gmail.com](mailto:ayushpandey.cs@gmail.com)  
