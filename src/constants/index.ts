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