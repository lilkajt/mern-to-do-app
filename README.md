# mern-to-do-app

## Description
This is a MERN (MongoDB, Express, React, Node.js) stack To-Do application. It allows users to create, read, update, and delete tasks.

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or cloud instance)

## Installation

### Backend
1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/mern-to-do-app.git
    cd mern-to-do-app
    ```

2. Install backend dependencies:
    ```sh
    npm install
    ```

3. Create a [.env](http://_vscodecontentref_/1) file in the root of the [backend](http://_vscodecontentref_/2) directory and add your MongoDB connection string:
    ```env
    mongo_url=your_mongodb_connection_string
    ```

### Frontend
1. Navigate to the [frontend](http://_vscodecontentref_/3) directory:
    ```sh
    cd frontend
    ```

2. Install frontend dependencies:
    ```sh
    npm install
    ```

## Running the Application

### Development
1. Start the backend server:
    ```sh
    npm run dev
    ```

2. In a new terminal, navigate to the [frontend](http://_vscodecontentref_/4) directory and start the frontend development server:
    ```sh
    cd frontend
    npm run dev
    ```

3. Open your browser and go to `http://localhost:5173` to see the application.

### Production
1. Build the whole project:
    ```sh
    npm run build
    ```

2. Run the application:
    ```sh
    npm start
    ```

3. Open your browser and go to `http://localhost:7500` to see the application.

## Technologies Used
- MongoDB: Database
- Express: Backend framework
- React: Frontend library
- Node.js: Backend runtime
- Tailwind CSS: Styling
- Zustand: State management
- Vite: Frontend build tool
- ESLint: Linting
- TypeScript: Type checking

## License
This project is licensed under the MIT License.