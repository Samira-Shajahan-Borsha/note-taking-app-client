import AllUsersView from "@/components/modules/Users/AllUsersView";

interface AllUsersPageProps {
    searchParams: Promise<{ page?: string }>;
}

const AllUsersPage = async ({ searchParams }: AllUsersPageProps) => {
    const params = await searchParams;
    const page = Math.max(Number(params.page) || 1, 1);

    return <AllUsersView page={page} limit={10} />;
};

export default AllUsersPage;