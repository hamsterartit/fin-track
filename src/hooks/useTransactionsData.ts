import {useQuery} from "@tanstack/react-query";
import {getTransactions} from "../services/api.ts";

export const useTransactionsData = () => {
    return useQuery(
        {
            queryKey: ["transactions"],
            queryFn: () => {
                return getTransactions();
            },
            retry: 1,
        }
    )
}