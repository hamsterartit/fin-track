export interface User {
    id: string;
    name: string;
    email: string;
    currency: string;
    balance: number;
}

export type Category = "food" | "housing" | "transport" | "entertainment" | "electronics" | "other";

export type Type = "expense" | "income";

export interface Transaction {
    id?: string;
    name: string;
    date: string;
    amount: number;
    type: Type | null;
    category: Category | null;
}

export type ModalId =
    | "addTransactionModal"
    | "transferModal";