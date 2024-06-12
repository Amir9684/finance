"use client";

import { Plus } from "lucide-react";

import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-accounts";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { columns } from "./columns";
import { Separator } from "@/components/ui/separator";

const AccountsPage = () => {
  const newAccount = useNewAccount();
  const deleteAccounts = useBulkDeleteAccounts();
  const accountsQuery = useGetAccounts();
  const accounts = accountsQuery.data || [];

  const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

  if (accountsQuery.isLoading)
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm pb-5">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">
              <Skeleton className="w-48 h-8" />
            </CardTitle>
            <Skeleton className="w-full lg:w-28 h-10" />
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

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
          <Button onClick={newAccount.onOpen} size="sm">
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="name"
            columns={columns}
            data={accounts}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteAccounts.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
