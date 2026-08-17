import AllNotesView from "@/components/modules/Notes/AllNotesView";

interface AllNotesPageProps {
    searchParams: Promise<{ page?: string }>;
}

const AllNotesPage = async ({ searchParams }: AllNotesPageProps) => {
    const params = await searchParams;
    const page = Math.max(Number(params.page) || 1, 1);

    return <AllNotesView page={page} limit={10} />;
};

export default AllNotesPage;