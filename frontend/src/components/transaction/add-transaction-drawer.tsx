import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import TransactionForm from "./transaction-form";

const AddTransactionDrawer = () => {
  const [open, setOpen] = useState(false);

  const onCloseDrawer = () => setOpen(false);

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="!cursor-pointer !text-white">
          <PlusIcon className="h-4 w-4" />
          Add Transaction
        </Button>
      </DrawerTrigger>

      {/* ✅ Fixed DrawerContent */}
      <DrawerContent className="overflow-y-auto overflow-x-hidden ios-scroll">
        <DrawerHeader className="relative">
          <div>
            <DrawerTitle className="text-xl font-semibold">
              Add Transaction
            </DrawerTitle>
            <DrawerDescription>
              Add a new transaction to track your finances
            </DrawerDescription>
          </div>
          <DrawerClose className="absolute top-4 right-4">
            <XIcon className="h-5 w-5 !cursor-pointer" />
          </DrawerClose>
        </DrawerHeader>

        {/* ✅ Add padding for mobile scroll comfort */}
        <div className="px-4 pb-8">
          <TransactionForm onCloseDrawer={onCloseDrawer} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AddTransactionDrawer;
