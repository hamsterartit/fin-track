import type {Transaction, User} from "../types";

const API_URL = "http://localhost:3001";

export async function getUser(): Promise<User> {
    const response = await fetch(`${API_URL}/user`);

    if (!response.ok) throw new Error(`Load user failed: ${response.status}`);

    return await response.json();
}

export async function updateUser(patch: Partial<User>): Promise<User> {
    const response = await fetch(`${API_URL}/user`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
    });

    if (!response.ok) throw new Error(`Update user failed: ${response.status}`);

    return await response.json();
}


export async function getTransactions(): Promise<Transaction[]> {
    const response = await fetch(`${API_URL}/transactions`);

    if (!response.ok) throw new Error(`Load transactions failed: ${response.status}`);

    return await response.json();
}