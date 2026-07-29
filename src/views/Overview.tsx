import {CategoryBreakdown, RecentTransactionsList} from "../components";

export const Overview = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <RecentTransactionsList />
            </div>
                <CategoryBreakdown />
        </div>
    )
}