# Passenger-app

This project consists of a frontend and a backend for managing passengers. The frontend is built with React and Vite, and the backend is built with Express and MongoDB.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (version 6 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or accessible remotely)

## Running the Backend

1. Navigate to the `passenger-backend` directory:

   ```sh
   cd Passenger-app/passenger-backend
   ```

2. Install the backend dependencies:

   ```sh
   npm install
   ```

3. Start the backend server:

   ```sh
   npm start
   ```

   The backend server will onstart `http://localhost:5000`.

## Running the Frontend

1. Open a new terminal and navigate to the [passenger-management](http://_vscodecontentref_/1) directory:

   ```sh
   cd Passenger-app/passenger-management
   ```

2. Install the frontend dependencies:

   ```sh
   npm install
   ```

3. Start the frontend development server:

   ```sh
   npm run dev
   ```

   The frontend development server will start on `http://localhost:3000`.

## Usage

- Open your browser and navigate to `http://localhost:3000` to access the Passenger Management application.
- The frontend will communicate with the backend server running on `http://localhost:5000`.
- You can also access the deployed application at https://chipper-druid-4fbb76.netlify.app/.

## Additional Scripts

### Backend

- `npm start`: Starts the backend server using `nodemon`.

### Frontend

- `npm run dev`: Starts the frontend development server.
- `npm run build`: Builds the frontend for production.
- `npm run lint`: Runs ESLint to check for linting errors.
- `npm run preview`: Previews the production build.

## License

This project is licensed under the MIT License.
