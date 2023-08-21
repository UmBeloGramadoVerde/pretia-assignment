import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PencilIcon, TrashIcon } from "lucide-react";

interface EditButtonProps {
  editFn: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ editFn }) => {
  const editClickHandler = (ev: any) => {
    ev.preventDefault();
    ev.stopPropagation();
    editFn();
  };

  return (
    <Button variant="outline" className="w-fit" onClick={editClickHandler}>
      <PencilIcon size={14} />
    </Button>
  );
};

export default EditButton;
