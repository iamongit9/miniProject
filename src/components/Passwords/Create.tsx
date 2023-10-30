import { Button  } from "@nextui-org/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import CreateForm from "./CreateForm";

export default function Create() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button color="primary">Create</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Entry</DialogTitle>
                    <DialogDescription>
                        Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <CreateForm/>
            </DialogContent>
        </Dialog>
    )
}
