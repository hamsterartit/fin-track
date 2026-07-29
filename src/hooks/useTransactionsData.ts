import {useQuery} from "@tanstack/react-query";
import {getTransactions} from "../services/api";
import type {CategorySummary, Transaction} from "../types";

export const useTransactionsData = (
    selectFunction?: (data: Transaction[]) => CategorySummary[]
) => {
    return useQuery({
        queryKey: ["transactions"],
        queryFn: () => getTransactions(),
        retry: 1,
        select: selectFunction,
    })
}