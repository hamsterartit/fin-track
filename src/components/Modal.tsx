import { X } from "lucide-react";
import { type ReactNode, useEffect } from "react";

interface Props {
	children: ReactNode;
	title: string;
	onCloseClick: () => void;
}

export const Modal = ({ title, children, onCloseClick }: Props) => {
	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onCloseClick();
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [onCloseClick]);

	return (
		<div
			role="dialog"
			aria-modal="true"
			aria-label={title}
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
		>
			<button
				type="button"
				aria-label="Close modal"
				onClick={onCloseClick}
				className="absolute inset-0 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm cursor-default"
			/>
			<div className="relative bg-white dark:bg-zinc-900 border border-transparent dark:border-zinc-800 w-full max-w-md rounded-3xl shadow-2xl p-8">
				<div className="flex items-center justify-between mb-8">
					<h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h3>
					<button
						className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 dark:text-zinc-300"
						type="button"
						onClick={onCloseClick}
					>
						<X className="w-6 h-6" />
					</button>
				</div>
				{children}
			</div>
		</div>
	);
};
