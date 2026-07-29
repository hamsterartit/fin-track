import {CATEGORIES, CATEGORY_LIMITS} from "../constants";
import type {CategorySummary, Transaction} from "../types";
import {useTransactionsData} from "../hooks/useTransactionsData.ts";

const toCategorySummary = (data: Transaction[]): CategorySummary[] =>
	CATEGORIES.map((category) => {
		const sum = data
			.filter(
				(transaction) =>
					transaction.category === category &&
					transaction.type === "expense"
			)
			.reduce((acc, cur) => acc + +(cur.amount ?? 0), 0);

		return {
			category,
			sum,
			limit: CATEGORY_LIMITS[category],
		};
	});

export const CategoryBreakdown = () => {
	const {
		data: categorySummary,
		isLoading,
		isError,
		error,
	} = useTransactionsData(toCategorySummary);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
			<h3 className="text-xl font-bold mb-6">Budget Categories</h3>
			<div className="space-y-6">
				{categorySummary && categorySummary.map((item, index) => {
					const percent = Math.min((item.sum / item.limit) * 100, 100);
					return (<div key={index}>
						<div className="flex justify-between text-sm mb-2">
							<span className="font-medium text-zinc-600">{item.category}</span>
							<span className="font-bold">${item.sum} / ${item.limit}</span>
						</div>
						<div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
							<div className="h-full rounded-full" style={{backgroundColor: "blue", width: `${percent > 100 ? 100 : percent}%`}}/>
						</div>
					</div>)
				})}
			</div>
		</div>
	)
}