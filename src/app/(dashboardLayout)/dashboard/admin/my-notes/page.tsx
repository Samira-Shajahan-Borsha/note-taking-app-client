import MyNotesView from "@/components/modules/Notes/MyNotesView";

interface MyNotesPageProps {
    searchParams: Promise<{ page?: string }>;
}

const MyNotesPage = async ({ searchParams }: MyNotesPageProps) => {
    const params = await searchParams;
    const page = Math.max(Number(params.page) || 1, 1);

    return <MyNotesView page={page} limit={10} />;
};

export default MyNotesPage;