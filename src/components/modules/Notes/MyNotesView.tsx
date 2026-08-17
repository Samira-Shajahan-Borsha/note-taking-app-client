import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import MyNotesDataTable from "@/components/modules/Notes/MyNotesDataTable";
import { getMyNotes } from "@/services/note/note.action";

interface MyNotesViewProps {
    page: number;
    limit: number;
}

const MyNotesView = async ({ page, limit }: MyNotesViewProps) => {
    const result = await getMyNotes(page, limit);
    const notes = result?.notes ?? [];
    const meta = result?.meta ?? { page, limit, total: 0, totalPage: 1 };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">My Notes</h1>
                    <p className="text-sm text-muted-foreground">
                        Create and manage your personal notes.
                    </p>
                </div>
                <Button>
                    <Plus />
                    Create Note
                </Button>
            </div>

            <MyNotesDataTable
                notes={notes}
                meta={meta}
                page={page}
                limit={limit}
            />
        </div>
    );
};

export default MyNotesView;