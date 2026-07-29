import {Car, CircleDollarSign, Home, type LucideIcon, Popcorn, Smartphone, UtensilsCrossed} from "lucide-react";
import type {Category, Type} from "../types";

export const CURRENCY = [
    { currency: "US Dollar", shortKey: "USD" },
    { currency: "Euro", shortKey: "EUR" },
    { currency: "British Pound", shortKey: "GBP" },
];

export const TAB_CONFIG: Record<string, { title: string; subtitle: string }> = {
    "/": {
        title: "Overview",
        subtitle: "Welcome back, here's what's happening today.",
    },
    "/transactions": {
        title: "Transactions",
        subtitle: "View and manage all your transactions.",
    },
    "/settings": {
        title: "Settings",
        subtitle: "Manage your account and preferences.",
    },
};

export const iconMap: Record<Category, LucideIcon> = {
    food: UtensilsCrossed,
    housing: Home,
    transport: Car,
    entertainment: Popcorn,
    electronics: Smartphone,
    other: CircleDollarSign,
};

export const TYPES: Type[] = ["income", "expense"];

export const CATEGORIES: Category[] = [
    "food",
    "housing",
    "transport",
    "entertainment",
    "electronics",
    "other",
];
