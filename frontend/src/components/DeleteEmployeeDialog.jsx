import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteEmployee } from "@/api/employeeApi";
import { toast } from "sonner";

export default function DeleteEmployeeDialog({
  open,
  setOpen,
  employeeId,
  refresh,
}) {
  const handleDelete = async () => {
    try {
      await deleteEmployee(employeeId);
      toast.success("Employee deleted");
      setOpen(false);
      refresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Employee?</DialogTitle>
        </DialogHeader>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
