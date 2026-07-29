import {useQuery} from "@tanstack/react-query";
import {getTransactions} from "../services/api";
import type { Transaction} from "../types";

export const useTransactionsData = <TData = Transaction>(
    selectFunction?: (data: Transaction[]) => TData[]
) => {
    return useQuery({
        queryKey: ["transactions"],
        queryFn: () => getTransactions(),
        retry: 1,
        select: selectFunction,
    })
}