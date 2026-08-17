import AllNotesDataTable from "@/components/modules/Notes/AllNotesDataTable";
import { getAllNotes } from "@/services/note/note.action";

interface AllNotesViewProps {
    page: number;
    limit: number;
}

const AllNotesView = async ({ page, limit }: AllNotesViewProps) => {
    const result = await getAllNotes(page, limit);
    const notes = result?.notes ?? [];
    const meta = result?.meta ?? { page, limit, total: 0, totalPage: 1 };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">All Notes</h1>
                <p className="text-sm text-muted-foreground">
                    View every note created across all users.
                </p>
            </div>

            <AllNotesDataTable
                notes={notes}
                meta={meta}
                page={page}
                limit={limit}
            />
        </div>
    );
};

export default AllNotesView;