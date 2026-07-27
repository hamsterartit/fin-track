import { Calendar, LayoutDashboard, Settings, Wallet } from "lucide-react";
import { SidebarItem } from "../components/SidebarItem";

export const Sidebar = () => {
    return (
        <aside className="w-64 border-r border-zinc-200 p-6 flex-col hidden lg:flex bg-white">
            <div className="flex items-center gap-2 mb-10 px-2">
                <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold tracking-tight">FinTrack</h1>
            </div>

            <nav className="flex-1 space-y-2">
                <SidebarItem icon={LayoutDashboard} label="Overview" url="/" />
                <SidebarItem icon={Calendar} label="Transactions" url="/transactions" />
            </nav>

            <div className="mt-auto pt-6 border-t border-zinc-100">
                <SidebarItem icon={Settings} label="Settings" url="/settings" />
            </div>
        </aside>
    );
};
