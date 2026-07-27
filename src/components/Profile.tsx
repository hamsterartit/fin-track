import {useCurrentUserData} from "../hooks/useCurrentUserData.ts";
import {CURRENCY} from "../constants";
import {getInitials} from "../utils";
import {updateUser} from "../services/api.ts";
import {useMutation} from "@tanstack/react-query";
import type {ChangeEvent} from "react";

export const Profile = () => {
    const {data: user, error, isError, isLoading} = useCurrentUserData();

    const currencyMutation = useMutation({
        mutationFn: (currency: string) => {
            return updateUser({ currency });
        },
        onSuccess: () => {
            console.log("Currency updated", "success");
        },
        onError: (error: Error) => {
            console.log(error.message ?? "Update failed", "error");
        },
    });

    const onCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        currencyMutation.mutate(event.target.value);
    };


    if (isLoading) {
        return (
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <div className="animate-pulse bg-zinc-100 dark:bg-zinc-800 h-4 w-1/3 rounded-md mb-6" />
                <div className="animate-pulse bg-zinc-100 dark:bg-zinc-800 h-32 rounded-md" />
            </div>
        );
    }
    if (isError)
        return <div className="text-rose-600 dark:text-rose-400">Error: {error.message}</div>;

    const avatar:string = getInitials(user.name);


    return (
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
            <h3 className="text-xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">Profile Settings</h3>
            <div className="space-y-6">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-3xl flex items-center justify-center text-3xl font-bold text-zinc-400 dark:text-zinc-500">
                        {avatar}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="profile-name"
                            className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                        >
                            Full Name
                        </label>
                        <input
                            id="profile-name"
                            disabled
                            defaultValue={user.name}
                            type="text"
                            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-zinc-100"
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor="profile-email"
                            className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                        >
                            Email Address
                        </label>
                        <input
                            id="profile-email"
                            disabled
                            defaultValue={user.email}
                            type="email"
                            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-zinc-100"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label
                        htmlFor="profile-currency"
                        className="text-xs font-bold text-zinc-500 uppercase tracking-wider"
                    >
                        Currency
                    </label>
                    <select
                        id="profile-currency"
                        className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-500 transition-all disabled:opacity-60"
                        value={user.currency}
                        onChange={onCurrencyChange}
                    >
                        {CURRENCY.map((item) => (
                            <option key={item.shortKey} value={item.shortKey}>
                                {item.shortKey} - {item.currency}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}