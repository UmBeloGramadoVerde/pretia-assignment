import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { TrashIcon } from "lucide-react";

interface RemoveButtonProps {
  removeFn: () => void;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ removeFn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpenChange = (open: any) => {
    setIsOpen(open);
  };
  const deleteHandler = () => {
    removeFn();
    setIsOpen(false);
  };
  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-fit">
          <TrashIcon size={14}/>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] sm:max-w-[425px] gap-10">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" variant="destructive" onClick={() => deleteHandler()}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveButton;
