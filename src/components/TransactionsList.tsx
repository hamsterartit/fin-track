import {useTransactionsData} from "../hooks/useTransactionsData.ts";
import {formattedDate, getCategoryIcon} from "../utils";
import type {Transaction} from "../types";

const toTransactionsSort = (data: Transaction[]): Transaction[] => {
    return [...data]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

}

export const TransactionsList = () => {
    const {data: transactions, error, isLoading, isError} = useTransactionsData(toTransactionsSort);

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <div className="animate-pulse bg-zinc-100 dark:bg-zinc-800 h-4 w-1/3 rounded-md mb-6" />
                <div className="animate-pulse bg-zinc-100 dark:bg-zinc-800 h-32 rounded-md" />
            </div>
        );
    }
    if (isError || !transactions) {
        return <div className="text-rose-600 dark:text-rose-400">Error: {error ? error.message : 'No transactions found'}</div>;
    }

    return (
        <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-100 dark:border-zinc-800">
                    <tr>
                        <th className="px-8 py-4">
                            Name
                        </th>
                        <th className="px-8 py-4 font-bold text-zinc-600 dark:text-zinc-300 uppercase text-xs tracking-wider">
                            Category
                        </th>
                        <th className="px-8 py-4">
                            Date
                        </th>
                        <th className="px-8 py-4 text-right">
                            Amount
                        </th>
                        <th className="px-8 py-4" />
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
                    {transactions.map((transaction) => {
                        const Icon = getCategoryIcon(transaction.category);
                        return (
                            <tr
                                key={transaction.id ?? `${transaction.date}-${transaction.name}`}
                                className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition-colors group"
                            >
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-300">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <p className="font-bold text-zinc-900 dark:text-zinc-100">
                                            {transaction.name}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
											<span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
												{transaction.category}
											</span>
                                </td>
                                <td className="px-8 py-6 text-zinc-500 dark:text-zinc-400 font-medium">
                                    {formattedDate(transaction.date)}
                                </td>
                                <td
                                    className={`px-8 py-6 text-right font-bold ${
                                        transaction.type === "income"
                                            ? "text-emerald-600 dark:text-emerald-400"
                                            : "text-zinc-900 dark:text-zinc-100"
                                    }`}
                                >
                                    {transaction.type === "income" ? "+" : "-"}
                                    {transaction.amount}
                                </td>
                                <td className="px-8 py-6 text-right whitespace-nowrap">

                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
               </div>
    )
}