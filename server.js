import express from 'express';
import cors from 'cors';
import {initializeConnection} from "./connection.js";
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from "./routes/userRoutes.js";

initializeConnection();

const app = express();
const port = 100;


app.use(cors());
app.use(express.json());

app.use('/api/books', bookRoutes)

app.use(userRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

