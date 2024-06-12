"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";

import { transactions as transactionsSchema } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import { columns } from "./columns";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORt",
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

const TransactionsPage = () => {
  const [AccountDialog, confirm] = useSelectAccount();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

  const onUplaod = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const newTransaction = useNewTransaction();
  const bulkCrateMutation = useBulkCreateTransactions();
  const deleteTransactions = useBulkDeleteTransactions();
  const transactionsQuery = useGetTransactions();
  const transactions = transactionsQuery.data || [];

  const isDisabled =
    transactionsQuery.isLoading || deleteTransactions.isPending;

  const onSubmitImport = async (
    values: (typeof transactionsSchema.$inferInsert)[]
  ) => {
    const accountId = await confirm();

    if (!accountId) return toast.error("Please select an account to continue.");

    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }));

    bulkCrateMutation.mutate(data, {
      onSuccess: () => onCancelImport(),
    });
  };

  if (transactionsQuery.isLoading)
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm pb-5">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">
              <Skeleton className="w-48 h-8" />
            </CardTitle>
            <div className="flex items-center gap-2">
              <Skeleton className="w-full lg:w-28 h-10" />
              <Skeleton className="w-full lg:w-28 h-10" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="w-full max-w-xs h-10" />
            <div className="w-full border border-gray-200 rounded-md space-y-3 py-3">
              <div className="flex items-center justify-evenly xl:gap-32">
                <Skeleton className="w-16 sm:w-24 h-10" />
                <Skeleton className="w-16 sm:w-24 h-10" />
                <Skeleton className="w-16 sm:w-24 h-10" />
              </div>
              <Separator />
              {[...Array(3)].map((_, index) => (
                <>
                  <div key={index} className="flex items-center justify-evenly">
                    <Skeleton className="w-20 sm:w-44 xl:w-96 h-10" />
                    <Skeleton className="w-20 sm:w-44 xl:w-96 h-10" />
                    <Skeleton className="w-20 sm:w-44 xl:w-96 h-10" />
                  </div>
                  {index !== 2 && <Separator />}
                </>
              ))}
            </div>
          </CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 gap-5">
            <Skeleton className="w-60 h-8" />
            <div className="flex items-center justify-end gap-3">
              <Skeleton className="w-24 h-9" />
              <Skeleton className="w-24 h-9" />
            </div>
          </div>
        </Card>
      </div>
    );

  if (variant === VARIANTS.IMPORT)
    return (
      <>
        <AccountDialog />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    );

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transactions page
          </CardTitle>
          <div className="flex flex-col lg:flex-row items-center gap-2">
            <Button
              onClick={newTransaction.onOpen}
              size="sm"
              className="w-full lg:w-auto"
            >
              <Plus className="size-4 mr-2" />
              Add new
            </Button>
            <UploadButton onUpload={onUplaod} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="payee"
            columns={columns}
            data={transactions}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransactions.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
