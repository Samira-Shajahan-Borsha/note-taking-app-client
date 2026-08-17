import CreateUserDialog from "@/components/modules/Users/CreateUserDialog";
import AllUsersDataTable from "@/components/modules/Users/AllUsersDataTable";
import { getAllUsers } from "@/services/user/user.action";

interface AllUsersViewProps {
    page: number;
    limit: number;
}

const AllUsersView = async ({ page, limit }: AllUsersViewProps) => {
    const result = await getAllUsers(page, limit);
    const users = result?.users ?? [];
    const meta = result?.meta ?? { page, limit, total: 0, totalPage: 1 };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">All Users</h1>
                    <p className="text-sm text-muted-foreground">
                        View every user registered in the application.
                    </p>
                </div>
                <CreateUserDialog />
            </div>

            <AllUsersDataTable
                users={users}
                meta={meta}
                page={page}
                limit={limit}
            />
        </div>
    );
};

export default AllUsersView;