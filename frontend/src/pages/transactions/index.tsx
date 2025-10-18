import {
  Card,
  CardContent,
} from "@/components/ui/card";
import PageLayout from "@/components/page-layout";
import AddTransactionDrawer from "@/components/transaction/add-transaction-drawer";
import TransactionTable from "@/components/transaction/transaction-table";
import ImportTransactionModal from "@/components/transaction/import-transaction-modal";

export default function Transactions() {
  return (
    <PageLayout
      title="All Transactions"
      subtitle="Showing all transactions"
      addMarginTop
      rightAction={
        <div className="flex items-center gap-2">
          <ImportTransactionModal />
          <AddTransactionDrawer />
        </div>
      }
    >
      {/* Scrollable wrapper */}
      <div className="overflow-y-auto max-h-[calc(100vh-80px)] md:max-h-full">
        <Card className="border-0 shadow-none">
          <CardContent className="pt-2">
            <TransactionTable pageSize={20} />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
