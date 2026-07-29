import { useMutation } from "@tanstack/react-query";
import { type ChangeEvent, useState } from "react";
import { CATEGORIES, TYPES } from "../../constants";
import { addTransaction } from "../../services/api.ts";
import type { Transaction } from "../../types";
import { Modal } from "../Modal.tsx";

const initialState: Transaction = {
	name: "",
	date: "",
	amount: 0,
	type: null,
	category: null,
};

interface Props {
	onCloseModal: (visibility: boolean, modal: string) => void;
}

export const TransactionModal = ({ onCloseModal }: Props) => {
	const title = "Add Transaction";
	const [transaction, setTransaction] = useState<Transaction>(initialState);

	const addValue = (
		event:
			| ChangeEvent<HTMLInputElement, HTMLInputElement>
			| ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
	) => {
		setTransaction({ ...transaction, [event.target.name]: event.target.value });
	};

	const { mutate, isPending } = useMutation({
		mutationFn: addTransaction,
		onSuccess: (result) => {
			console.log("Added:", result);
		},
		onError: (error) => {
			console.error("Error:", error);
		},
	});

	const onSubmit = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		const date = new Date();
		const finalTransaction = { ...transaction, date: date.toISOString() };

		mutate(finalTransaction);
	};

	return (
		<Modal title={title} onCloseClick={() => onCloseModal(false, "addTransactionModal")}>
			<form onSubmit={onSubmit} className="space-y-6">
				<div>
					<label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">
						Transaction Name
					</label>
					<input
						onChange={(event) => addValue(event)}
						name="name"
						type="text"
						required
						placeholder="e.g. Grocery Store"
						className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">
							Amount
						</label>
						<input
							onChange={(event) => addValue(event)}
							name="amount"
							type="number"
							required
							step="0.01"
							placeholder="0.00"
							className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
						/>
					</div>
					<div>
						<label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">
							Type
						</label>
						<select
							className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
							onChange={(event) => addValue(event)}
							name="type"
							required
						>
							<option defaultValue="" selected disabled>
								Select option
							</option>
							{TYPES.map((item) => (
								<option value={item} key={item}>
									{item.charAt(0).toUpperCase() + item.slice(1)}
								</option>
							))}
						</select>
					</div>
				</div>

				<div>
					<label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">
						Category
					</label>
					<select
						className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
						onChange={(event) => addValue(event)}
						name="category"
						required
					>
						<option defaultValue="" selected disabled>
							Select option
						</option>
						{CATEGORIES.map((item) => (
							<option value={item} key={item}>
								{item.charAt(0).toUpperCase() + item.slice(1)}
							</option>
						))}
					</select>
				</div>

				<button
					disabled={isPending}
					type="submit"
					className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200"
				>
					Save Transaction
				</button>
			</form>
		</Modal>
	);
};
