import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1/employee",
});

export const getEmployees = () => API.get("/");
export const addEmployee = (data) => API.post("/create", data);
export const updateEmployee = (id, data) => API.patch(`/${id}`, data);
export const deleteEmployee = (id) => API.delete(`/${id}`);
export const getEmployeeById = (id) => API.get(`/${id}`);
