import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import registrationRoutes from './routes/registrationRoutes.js';
import { globalErrorHandler } from './controllers/errorController.js';
import { AppError } from './utils/AppError.js';
import { FILE_PATHS } from './config/constants.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', registrationRoutes);

// 404 Handler
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

// Start Server
// Start Server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`📊 Data Storage:`);
    console.log(`   - Contest: ${FILE_PATHS.GFG}`);
    console.log(`   - Hackathon: ${FILE_PATHS.HACKATHON}`);
    console.log(`   - Masterclass: ${FILE_PATHS.MASTERCLASS}`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});



process.on('uncaughtException', (err) => {
    const msg = `[${new Date().toISOString()}] UNCAUGHT EXCEPTION: ${err.name} - ${err.message}\n${err.stack}\n`;
    fs.appendFileSync('error.log', msg);
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});
