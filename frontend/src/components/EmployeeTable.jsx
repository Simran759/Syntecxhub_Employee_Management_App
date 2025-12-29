import { useEffect, useState } from "react";
import { getEmployees } from "@/api/employeeApi";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import EmployeeForm from "./EmployeeForm";
import DeleteEmployeeDialog from "./DeleteEmployeeDialog";

export default function EmployeeTable() {
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("all");

  const [employees, setEmployees] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 9;


  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data.data);
  };
  
const filteredEmployees = employees.filter((emp) => {
  const matchesSearch =
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "all" || emp.status === statusFilter;

  return matchesSearch && matchesStatus;
});


const totalPages = Math.ceil(filteredEmployees.length / limit);

const paginatedEmployees = filteredEmployees.slice(
  (page - 1) * limit,
  page * limit
);


  useEffect(() => {
    fetchEmployees();

  }, []);
  useEffect(() => {
  setPage(1);
}, [search, statusFilter]);



  return (
    <>
        
    <div className="flex flex-col gap-4 mb-4 mt-4">
      <h1 className="text-3xl font-bold text-center">
            Employee Management System
      </h1>

      <div className="flex flex-wrap items-center gap-4 justify-between">
      <div className="flex gap-3 flex-1">
        <Input
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md text-black"
        />

      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
      </div>

      <Button
        onClick={() => {
          setEditData(null);
          setOpenForm(true);
        }}
      className="whitespace-nowrap"
      >
      + Add Employee
      </Button>
     </div>
    </div>
      {/* MOBILE CARD VIEW */}
<div className="grid gap-4 md:hidden">
  {paginatedEmployees.length === 0 && (
    <div className="text-center text-muted-foreground py-10">
      No employees found
    </div>
  )}

  {paginatedEmployees.map((emp) => (
    <div
      key={emp._id}
      className="rounded-lg border bg-white p-4 shadow-sm space-y-2"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold">{emp.name}</p>
          <p className="text-sm text-muted-foreground">
            {emp.email}
          </p>
        </div>

        {/* STATUS */}
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
          ${
            emp.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              emp.status === "active"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />
          {emp.status}
        </span>
      </div>

      <div className="text-sm">
        <p><span className="font-medium">Role:</span> {emp.role}</p>
        <p><span className="font-medium">Dept:</span> {emp.department}</p>
        <p>
          <span className="font-medium">Salary:</span>{" "}
          ₹{Number(emp.salary).toLocaleString()}
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-2 pt-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setEditData(emp);
            setOpenForm(true);
          }}
        >
          Edit
        </Button>

        <Button
          size="sm"
          variant="destructive"
          onClick={() => setDeleteId(emp._id)}
        >
          Delete
        </Button>
      </div>
    </div>
  ))}
</div>

<div className="hidden md:block">
      <Table className="mt-2">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedEmployees.length === 0 && (
          <TableRow>
          <TableCell
            colSpan={7}
            className="text-center py-10 text-muted-foreground">
          No employees found
          </TableCell>
        </TableRow>)}

        {paginatedEmployees.map((emp) => (

        <TableRow
          key={emp._id}
          className="odd:bg-muted/50 hover:bg-muted transition"
        >

              <TableCell>{emp.name}</TableCell>
              <TableCell className="text-slate-600">  {emp.email}</TableCell>
              <TableCell>{emp.role}</TableCell>
              <TableCell>{emp.department}</TableCell>
              <TableCell className="text-right font-medium">
                  ₹{Number(emp.salary).toLocaleString()}
              </TableCell>

               <TableCell>
                <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium
                        ${
                          emp.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                    <span className={`h-2 w-2 rounded-full ${
                      emp.status === "active" ? "bg-green-500" : "bg-red-500"
                    }`}
                    />
                    {emp.status}
                    </span>

                </div>
                </TableCell>
              <TableCell className="space-x-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  setEditData(emp);
                  setOpenForm(true);
                }}>
                 ✏️
              </Button>

              <Button
                size="icon"
                variant="destructive"
                onClick={() => setDeleteId(emp._id)}>
                  🗑
              </Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
        {totalPages > 1 && (
  <div className="flex justify-center mt-6">
    <div className="flex items-center gap-4 px-4 py-2 rounded-lg border bg-white shadow-sm">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
      >
        Prev
      </Button>

      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => setPage((p) => p + 1)}
      >
        Next
      </Button>
    </div>
  </div>
)}


      <EmployeeForm
        open={openForm}
        setOpen={setOpenForm}
        refresh={fetchEmployees}
        editData={editData}
      />

      <DeleteEmployeeDialog
        open={!!deleteId}
        setOpen={() => setDeleteId(null)}
        employeeId={deleteId}
        refresh={fetchEmployees}
      />
    </>
  );
}
