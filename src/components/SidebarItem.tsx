import type { ElementType } from "react";
import { NavLink } from "react-router-dom";

interface Props {
    icon: ElementType;
    label: string;
    url: string;
}

export const SidebarItem = ({ icon: Icon, label, url }: Props) => {
    return (
        <NavLink
            to={url}
            end={url === "/"}
            className={({ isActive }) =>
                `flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                        ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200"
                        : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                }`
            }
        >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
        </NavLink>
    );
};
