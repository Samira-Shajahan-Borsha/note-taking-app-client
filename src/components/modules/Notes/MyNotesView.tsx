import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const MyNotesView = () => {
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

            <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed px-8 py-24 text-center">
                <p className="text-sm font-medium">No notes yet</p>
                <p className="text-sm text-muted-foreground">
                    Your notes will appear here. Click &quot;Create Note&quot; to get started.
                </p>
            </div>
        </div>
    );
};

export default MyNotesView;
