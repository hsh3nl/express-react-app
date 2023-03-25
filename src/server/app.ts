import express, { Express } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { useAppRouting } from './app.routing';
import { useAuth0 } from './middlewares/auth0.middleware';

// Configuration
const app: Express = express();
const port = process.env.PORT || 8000;
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

// Middlewares
useAuth0(app);

// Routing
useAppRouting(app);

// Bootstrapping
app.listen(port, () => {
    console.log(`[INFO]: Express server is running at ${process.env.BASE_URL}`);
    console.log(`${__dirname}/../environment/.env`);
});