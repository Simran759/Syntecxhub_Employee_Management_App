import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { addEmployee, updateEmployee } from "@/api/employeeApi";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EmployeeForm({
  open,
  setOpen,
  refresh,
  editData, 
}) {
  const isEditMode = Boolean(editData);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "",
      department: "",
      salary: "",
      status: "active",
    },
  });

  
  useEffect(() => {
    if (isEditMode) {
      form.reset({
        name: editData.name,
        email: editData.email,
        role: editData.role,
        department: editData.department,
        salary: editData.salary,
        status: editData.status,
      });
    } else {
      form.reset({
        name: "",
        email: "",
        role: "",
        department: "",
        salary: "",
        status: "active",
      });
    }
  }, [editData, isEditMode]);

  
  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await updateEmployee(editData._id, data);
        toast.success("Employee updated successfully");
      } else {
        await addEmployee(data);
        toast.success("Employee added successfully");
      }

      setOpen(false);
      refresh();
      form.reset();
    } catch {
      toast.error("Operation failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Employee" : "Add Employee"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          
          <div>
            <Label>Name</Label>
            <Input {...form.register("name", { required: true })} />
          </div>

       
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              {...form.register("email", { required: true })}
          
            />
          </div>

          <div>
            <Label>Role</Label>
            <Input {...form.register("role", { required: true })} />
          </div>

          <div>
            <Label>Department</Label>
            <Input {...form.register("department", { required: true })} />
          </div>

        
          <div>
            <Label>Salary</Label>
            <Input
              type="number"
              {...form.register("salary", { required: true })}
            />
          </div>

        
          <div>
            <Label>Status</Label>
            <Select
              value={form.watch("status")}
              onValueChange={(value) =>
                form.setValue("status", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

         
          <Button type="submit" className="w-full">
            {isEditMode ? "Update Employee" : "Add Employee"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
