import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { useAppRouting } from './app.routing';
import { useAuth0 } from './middlewares/auth0.middleware';
import { configDb } from './database/database.configurator';

// Configuration
const app = express();
const port = process.env.PORT || 8000;
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });
app.use(express.json());
app.use(cookieParser());

// CORS configuration
if (process.env.ENABLE_CORS === 'true') {
    console.log('[INFO]: CORS enabled.')
    app.use(cors());
}

// Database configuration
configDb();

// Middlewares
useAuth0(app);

// Routing
useAppRouting(app);

// Bootstrapping
app.listen(port, () => {
    console.log(`[INFO]: Express server is running at ${process.env.BASE_URL}`);
});
