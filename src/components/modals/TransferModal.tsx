import {useMutation} from "@tanstack/react-query";
import {type ChangeEvent, useState} from "react";
import {addTransaction} from "../../services/api.ts";
import type {Transaction} from "../../types";
import {Modal} from "../Modal.tsx";

const initialState: Transaction = {
	name: "",
	date: "",
	amount: 0,
	type: 'expense',
	category: 'other',
};

interface Props {
	onCloseModal: (visibility: boolean, modal: string) => void;
}

export const TransferModal = ({onCloseModal}: Props) => {
	const title = "Send Money";
	const [transaction, setTransaction] = useState<Transaction>(initialState);

	const addValue = (
		event: ChangeEvent<HTMLInputElement, HTMLInputElement>
	) => {
		setTransaction({
			...transaction,
			[event.target.name]: event.target.name === 'name' ? `Transfer to ${event.target.value}` : event.target.value
		});
	};

	const {mutate, isPending} = useMutation({
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
		const finalTransaction = {...transaction, date: date.toISOString()};

		mutate(finalTransaction);
	};

	return (
		<Modal title={title} onCloseClick={() => onCloseModal(false, "transferModal")}>
			<form onSubmit={onSubmit} className="space-y-6">
				<div>
					<label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">Recipient
						Name</label>
					<input
						type="text"
						name="name"
						required
						onChange={(event) => addValue(event)}
						placeholder="e.g. John Doe"
						className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
					/>
				</div>
				<div>
					<label
						className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">Amount</label>
					<input
						type="number"
						name="amount"
						required
						step="0.01"
						onChange={(event) => addValue(event)}
						placeholder="0.00"
						className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
					/>
				</div>
				<button
					disabled={isPending}
					type="submit"
					className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
				>
					Send Transfer
				</button>
			</form>
		</Modal>
	);
};
