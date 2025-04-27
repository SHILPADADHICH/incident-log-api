# AI Safety Incident Log API

A RESTful API service for logging and managing hypothetical AI safety incidents.

## Technology Stack

- **Language**: TypeScript
- **Framework**: Node.js with Express
- **Database**: MongoDB with Mongoose ODM

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local instance or cloud-based like MongoDB Atlas)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd incident-log-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Environment Configuration:
   - Create a `.env` file in the root directory:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/incident-log
   ```
   - If using MongoDB Atlas, your connection string will look like:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/incident-log
   ```

4. Start the development server:
   ```
   npm run dev
   ```
   The API will be available at `http://localhost:3000`

## Database Setup

The application automatically sets up the MongoDB schema when it connects. To initialize the database with sample incidents, you can use one of these methods:

### Option 1: Using the Seed Script (Recommended)

The project includes a migration script to pre-populate the database with sample incidents:

```bash
# Run the seed script
npm run seed
```

This will populate your database with 12 diverse AI safety incidents with different severities and timestamps spanning multiple days. The sample data covers various AI safety concerns including:
- Content moderation failures
- Bias in model responses 
- Privacy concerns
- Security vulnerabilities
- Resource consumption attacks
- Model interpretability issues
- Unintended capabilities
- And more realistic scenarios

### Option 2: Using API Endpoints

Send POST requests to `/incidents` with the following sample data:

```bash
# Sample 1
curl -X POST http://localhost:3000/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Chatbot Bypassing Ethical Guidelines",
    "description": "An AI chatbot was found generating harmful content despite content filters being in place",
    "severity": "High"
  }'

# Sample 2
curl -X POST http://localhost:3000/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Biased Model Responses",
    "description": "Our classification model exhibits demographic bias in hiring recommendations",
    "severity": "Medium"
  }'

# Sample 3
curl -X POST http://localhost:3000/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Privacy Data Leak",
    "description": "Model memorization led to potential exposure of training data containing personal information",
    "severity": "High"
  }'
```

## API Endpoints

### 1. Get All Incidents

Retrieves all incidents from the database.

- **URL**: `/incidents`
- **Method**: `GET`
- **Response**: Array of incident objects
- **Example**:
  ```bash
  curl http://localhost:3000/incidents
  ```
  ```json
  [
    {
      "id": "60d21b4967d0d8992e610c85",
      "title": "Chatbot Bypassing Ethical Guidelines",
      "description": "An AI chatbot was found generating harmful content despite content filters being in place",
      "severity": "High",
      "reported_at": "2023-06-22T14:56:29.315Z"
    },
    ...
  ]
  ```

### 2. Create New Incident

Creates a new incident in the database.

- **URL**: `/incidents`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "title": "Incident Title",
    "description": "Detailed description",
    "severity": "Low|Medium|High"
  }
  ```
- **Response**: The created incident object with ID and timestamp
- **Example**:
  ```bash
  curl -X POST http://localhost:3000/incidents \
    -H "Content-Type: application/json" \
    -d '{
      "title": "New AI Safety Incident",
      "description": "Description of what happened",
      "severity": "Medium"
    }'
  ```
  ```json
  {
    "id": "60d21b4967d0d8992e610c85",
    "title": "New AI Safety Incident",
    "description": "Description of what happened",
    "severity": "Medium",
    "reported_at": "2023-06-22T14:56:29.315Z"
  }
  ```

### 3. Get Incident by ID

Retrieves a specific incident by its ID.

- **URL**: `/incidents/:id`
- **Method**: `GET`
- **Response**: Incident object or 404 if not found
- **Example**:
  ```bash
  curl http://localhost:3000/incidents/60d21b4967d0d8992e610c85
  ```
  ```json
  {
    "id": "60d21b4967d0d8992e610c85",
    "title": "New AI Safety Incident",
    "description": "Description of what happened",
    "severity": "Medium",
    "reported_at": "2023-06-22T14:56:29.315Z"
  }
  ```

### 4. Delete Incident

Deletes an incident with the specified ID.

- **URL**: `/incidents/:id`
- **Method**: `DELETE`
- **Response**: 204 No Content on success, 404 if not found
- **Example**:
  ```bash
  curl -X DELETE http://localhost:3000/incidents/60d21b4967d0d8992e610c85
  ```

## Error Handling

The API implements proper error handling:
- 404 for resources not found
- 400 for invalid requests (missing fields, invalid severity values)
- 500 for server errors

## Design Decisions

- Used MongoDB for flexibility in storing incident data
- Implemented middleware for error handling and request validation
- Added proper HTTP status codes for different scenarios
- Used TypeScript for type safety and better code quality