import { ChevronRight } from "lucide-react";
import {formattedDate, getCategoryIcon} from "../utils";
import type {Transaction} from "../types";
import {useTransactionsData} from "../hooks/useTransactionsData.ts";
import {Link} from "react-router-dom";

const toTransactionsSlice = (data: Transaction[]): Transaction[] => {
    return [...data]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);
}

export const RecentTransactionsList = () => {
    const {
        data: transactions,
        isLoading,
        isError,
        error,
    } = useTransactionsData(toTransactionsSlice)

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Recent Transactions</h3>
                <Link
                    to="/transactions"
                    className="text-zinc-500 text-sm font-medium hover:text-zinc-900 flex items-center gap-1"
                >
                    View all <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="space-y-4">
                {transactions &&
                    transactions.map((transaction, index) => {
                        const Icon = getCategoryIcon(transaction.category);
                        return (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 rounded-2xl hover:bg-zinc-50 transition-colors group cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-white transition-colors">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-zinc-900">{transaction.name}</p>
                                        <p className="text-zinc-500 text-sm">
                                            {transaction.category} • {formattedDate(transaction.date)}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`font-bold ${transaction.type === "income" ? "text-emerald-600" : "text-zinc-900"}`}
                                >
                                    {transaction.type === "income" ? "+" : "-"}${transaction.amount}
                                </div>
                            </div>
                        );
                    })}
                {!transactions && (
                    <div className="text-center py-10 text-zinc-500">No transactions found.</div>
                )}
            </div>
        </div>
    );
};
