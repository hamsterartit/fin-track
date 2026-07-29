import type {Category} from "../types";
import {CircleDollarSign, type LucideIcon} from "lucide-react";
import {iconMap} from "../constants";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC",
});

export const getInitials = (name: string) =>
    name
        .split(" ")
        .map((part) => part[0]?.toUpperCase() ?? "")
        .filter(Boolean)
        .join("");



export const formattedDate = (isoString: string) => {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return isoString;
    return dateFormatter.format(date);
};

export const getCategoryIcon = (category: Category | null): LucideIcon => {
    return category ? iconMap[category] : CircleDollarSign;
}