import express from 'express';
import { addEmployee, deleteEmployee, getAllEmployee, getEmployeeById, updateEmployee } from '../controllers/employee.js';

const router=express.Router();

router.post("/create",addEmployee);
router.get("/",getAllEmployee);
router.get("/:id",getEmployeeById);
router.patch("/:id",updateEmployee);
router.delete("/:id",deleteEmployee);
export default router;