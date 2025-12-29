import express from 'express'
import cors from 'cors'
import employeeRoutes from './routes/employee.js'
import errorHandler from "./middleware/errorHandler.js";

const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/employee",employeeRoutes);
app.use(errorHandler);

export default app;