// Import express, cors, helmet and morgan
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes';
import connectDB from './database/database';
import dotenv from 'dotenv';
import path from 'path';

// Initializing enviroment vairables (dotenv)
dotenv.config();

// Create Express server
const app = express(); // New express instance
const port = 3000; // Port number

// Express configuration
app.use(cors()); // Enable CORS
app.use(helmet()); // Enable Helmet
app.use(morgan('dev')); // Enable Morgan
app.use(express.json()); // Enable JSON body parser
connectDB();
// Use Helmet to set security headers, including CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://accounts.google.com'],
        connectSrc: ["'self'", 'https://accounts.google.com'],
        styleSrc: ["'self'", 'https://accounts.google.com'],
        imgSrc: ["'self'", 'https://accounts.google.com'],
        frameSrc: ["'self'", 'https://accounts.google.com'],
        // Add more directives as needed
      },
    },
  })
);
// Use routes
app.use('/', router);

app.use(express.static(path.join(__dirname, '../public')));

// Start Express server
app.listen(port, () => {
  // Callback function when server is successfully started
    console.log(`Server started at http://localhost:${port}`);
});

// Export Express app
export default app;