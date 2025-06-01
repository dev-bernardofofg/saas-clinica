import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

interface BaseDialogProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const BaseDialog = ({
  trigger,
  title,
  description,
  children,
  open,
  setOpen,
}: BaseDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-xl min-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};
