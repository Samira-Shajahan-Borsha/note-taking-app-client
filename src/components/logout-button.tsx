"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/services/auth/auth.action";

export default function LogoutButton({ className }: { className?: string }) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);

    const handleLogout = async () => {
        setIsPending(true);
        await logoutAction();
        router.push("/login");
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            className={className}
            onClick={handleLogout}
            disabled={isPending}
        >
            <LogOut />
            {isPending ? "Logging out..." : "Logout"}
        </Button>
    );
}
